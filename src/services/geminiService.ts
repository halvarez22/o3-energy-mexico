import { GoogleGenerativeAI } from '@google/generative-ai';
import { getBaseContext, ConversationContext, SPECIALIZED_PROMPTS } from './appContextService';

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

if (!API_KEY) {
  throw new Error('VITE_GOOGLE_API_KEY no está configurada');
}

const genAI = new GoogleGenerativeAI(API_KEY);

// Configuración del modelo
const model = genAI.getGenerativeModel({ 
  model: 'gemini-1.5-flash',
  generationConfig: {
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 1024,
  }
});

// Contexto base sobre O3 ENERGY MEXICO (versión simplificada para evitar errores)
const O3_ENERGY_CONTEXT = getBaseContext();

export interface ChatResponse {
  text: string;
  shouldCaptureInfo?: boolean;
  suggestedQuestions?: string[];
  intent?: 'greeting' | 'info_request' | 'pricing' | 'contact' | 'qualification' | 'closing';
}

export class GeminiChatService {
  private conversationHistory: Array<{role: 'user' | 'model', parts: string}> = [];
  private conversationContext: ConversationContext = {
    propertyType: '',
    monthlyBill: 0,
    hasRoofSpace: false,
    currentStep: 'initial',
    userInterest: []
  };

  async generateResponse(userMessage: string, userInfo?: any, context?: ConversationContext): Promise<ChatResponse> {
    try {
      // Actualizar contexto de conversación si se proporciona
      if (context) {
        this.conversationContext = { ...this.conversationContext, ...context };
      }

      // Actualizar contexto basado en el mensaje del usuario
      this.updateConversationContext(userMessage);

      // Construir el prompt con contexto dinámico
      const prompt = this.buildPrompt(userMessage, userInfo);
      
      // Generar respuesta
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Actualizar historial de conversación
      this.conversationHistory.push(
        { role: 'user', parts: userMessage },
        { role: 'model', parts: text }
      );

      // Analizar la respuesta para determinar intenciones
      const intent = this.analyzeIntent(userMessage);
      const shouldCaptureInfo = this.shouldRequestInfo(userMessage, userInfo);

      return {
        text: text.trim(),
        shouldCaptureInfo,
        intent
      };

    } catch (error) {
      console.error('Error generating Gemini response:', error);
      return {
        text: 'Disculpa, tuve un problema técnico. ¿Podrías repetir tu pregunta? Mientras tanto, puedes contactarnos directamente al +52 614 775 6600.',
        intent: 'greeting'
      };
    }
  }

  private buildPrompt(userMessage: string, userInfo?: any): string {
    // Determinar la intención del usuario
    const intent = this.analyzeIntent(userMessage);
    
    // Obtener el prompt especializado para esta intención
    const specializedPrompt = SPECIALIZED_PROMPTS[intent] || SPECIALIZED_PROMPTS.info_request;
    
    let prompt = O3_ENERGY_CONTEXT + '\n\n';
    
    // Agregar contexto de conversación dinámico
    prompt += `CONTEXTO DE CONVERSACIÓN ACTUAL:\n`;
    prompt += `- Tipo de propiedad: ${this.conversationContext.propertyType || 'No especificado'}\n`;
    prompt += `- Consumo eléctrico mensual: ${this.conversationContext.monthlyBill || 'No especificado'}\n`;
    prompt += `- Ubicación: ${this.conversationContext.location || 'No especificada'}\n`;
    prompt += `- Presupuesto: ${this.conversationContext.budget || 'No especificado'}\n`;
    prompt += `- Timeline: ${this.conversationContext.timeline || 'No especificado'}\n`;
    prompt += `- Intereses del usuario: ${this.conversationContext.userInterest.join(', ') || 'No especificados'}\n`;
    prompt += `- Etapa actual: ${this.conversationContext.currentStep}\n\n`;
    
    // Agregar información del usuario si está disponible
    if (userInfo) {
      prompt += `INFORMACIÓN DEL USUARIO:\n`;
      if (userInfo.name) prompt += `- Nombre: ${userInfo.name}\n`;
      if (userInfo.email) prompt += `- Email: ${userInfo.email}\n`;
      if (userInfo.phone) prompt += `- Teléfono: ${userInfo.phone}\n`;
      prompt += '\n';
    }

    // Agregar historial de conversación reciente (últimos 8 mensajes para mejor contexto)
    if (this.conversationHistory.length > 0) {
      prompt += 'CONVERSACIÓN PREVIA:\n';
      const recentHistory = this.conversationHistory.slice(-8);
      recentHistory.forEach(msg => {
        prompt += `${msg.role === 'user' ? 'Usuario' : 'Asistente'}: ${msg.parts}\n`;
      });
      prompt += '\n';
    }

    prompt += `MENSAJE ACTUAL DEL USUARIO: ${userMessage}\n\n`;
    prompt += specializedPrompt + '\n\n';
    prompt += `RESPUESTA:`;

    return prompt;
  }

  private updateConversationContext(userMessage: string): void {
    const lowerMessage = userMessage.toLowerCase();
    
    // Detectar tipo de propiedad
    if (lowerMessage.includes('casa') || lowerMessage.includes('hogar') || lowerMessage.includes('residencial')) {
      this.conversationContext.propertyType = 'residencial';
    } else if (lowerMessage.includes('negocio') || lowerMessage.includes('empresa') || lowerMessage.includes('comercial')) {
      this.conversationContext.propertyType = 'comercial';
    } else if (lowerMessage.includes('industrial') || lowerMessage.includes('fábrica') || lowerMessage.includes('planta')) {
      this.conversationContext.propertyType = 'industrial';
    }

    // Detectar consumo eléctrico
    const billMatch = lowerMessage.match(/(\d+)\s*(?:pesos?|mxn|\$)/i);
    if (billMatch) {
      this.conversationContext.monthlyBill = parseInt(billMatch[1]);
    }

    // Detectar ubicación
    const locationKeywords = ['chihuahua', 'méxico', 'ciudad', 'estado', 'municipio'];
    const locationMatch = locationKeywords.find(keyword => lowerMessage.includes(keyword));
    if (locationMatch) {
      this.conversationContext.location = locationMatch;
    }

    // Detectar presupuesto
    const budgetMatch = lowerMessage.match(/(\d+)\s*(?:mil|k|000)/i);
    if (budgetMatch) {
      this.conversationContext.budget = parseInt(budgetMatch[1]) * 1000;
    }

    // Detectar timeline
    if (lowerMessage.includes('urgente') || lowerMessage.includes('rápido') || lowerMessage.includes('pronto')) {
      this.conversationContext.timeline = 'urgente';
    } else if (lowerMessage.includes('mes') || lowerMessage.includes('año')) {
      this.conversationContext.timeline = 'mediano plazo';
    }

    // Detectar intereses
    const interests = ['paneles solares', 'energía solar', 'ahorro', 'financiamiento', 'instalación', 'mantenimiento'];
    interests.forEach(interest => {
      if (lowerMessage.includes(interest) && !this.conversationContext.userInterest.includes(interest)) {
        this.conversationContext.userInterest.push(interest);
      }
    });

    // Actualizar etapa de la conversación
    if (this.conversationContext.propertyType && this.conversationContext.monthlyBill > 0) {
      this.conversationContext.currentStep = 'qualifying';
    } else if (this.conversationContext.propertyType) {
      this.conversationContext.currentStep = 'gathering_info';
    }
  }

  private analyzeIntent(message: string): ChatResponse['intent'] {
    const lowerMessage = message.toLowerCase();
    
    // Detectar intención de cierre
    const closingKeywords = [
      'gracias', 'muchas gracias', 'es todo', 'eso es todo', 'nada más', 
      'hasta luego', 'adiós', 'chao', 'bye', 'nos vemos', 'hasta pronto',
      'perfecto', 'excelente', 'mil gracias', 'perfecto gracias',
      'ya está', 'ya es todo', 'eso es', 'listo', 'ok perfecto'
    ];
    
    if (closingKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'closing';
    }
    
    if (lowerMessage.includes('hola') || lowerMessage.includes('buenos') || lowerMessage.includes('buenas')) {
      return 'greeting';
    }
    if (lowerMessage.includes('costo') || lowerMessage.includes('precio') || lowerMessage.includes('cuanto')) {
      return 'pricing';
    }
    if (lowerMessage.includes('contacto') || lowerMessage.includes('llamar') || lowerMessage.includes('teléfono')) {
      return 'contact';
    }
    if (lowerMessage.includes('interesa') || lowerMessage.includes('cotización') || lowerMessage.includes('proyecto')) {
      return 'qualification';
    }
    
    return 'info_request';
  }

  private shouldRequestInfo(message: string, userInfo?: any): boolean {
    // Si ya tenemos nombre, email y teléfono, no necesitamos más info básica
    if (userInfo?.name && userInfo?.email && userInfo?.phone) {
      return false;
    }

    // Si el usuario muestra interés serio, es buen momento para pedir info
    const interestKeywords = ['interesa', 'cotización', 'precio', 'instalar', 'proyecto', 'información'];
    const showsInterest = interestKeywords.some(keyword => 
      message.toLowerCase().includes(keyword)
    );

    return showsInterest && (!userInfo?.name || !userInfo?.email);
  }

  clearHistory(): void {
    this.conversationHistory = [];
    this.conversationContext = {
      propertyType: '',
      monthlyBill: 0,
      hasRoofSpace: false,
      currentStep: 'initial',
      userInterest: []
    };
  }

  getConversationHistory(): Array<{role: 'user' | 'model', parts: string}> {
    return [...this.conversationHistory];
  }

  getConversationContext(): ConversationContext {
    return { ...this.conversationContext };
  }

  updateContext(newContext: Partial<ConversationContext>): void {
    this.conversationContext = { ...this.conversationContext, ...newContext };
  }
}

// Instancia singleton del servicio
export const geminiChatService = new GeminiChatService();