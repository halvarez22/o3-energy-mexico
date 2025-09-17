import Groq from 'groq-sdk';
import { getBaseContext, ConversationContext, SPECIALIZED_PROMPTS } from './appContextService';

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

if (!API_KEY) {
  console.warn('VITE_GROQ_API_KEY no está configurada');
}

const groq = new Groq({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true, // Permitir ejecución en el navegador
});

export interface GroqResponse {
  text: string;
  shouldCaptureInfo?: boolean;
  intent?: 'greeting' | 'info_request' | 'pricing' | 'contact' | 'qualification' | 'closing';
}

export class GroqChatService {
  private conversationHistory: Array<{role: 'user' | 'assistant', content: string}> = [];
  private conversationContext: ConversationContext = {
    propertyType: '',
    monthlyBill: 0,
    hasRoofSpace: false,
    currentStep: 'initial',
    userInterest: []
  };

  async generateResponse(userMessage: string, userInfo?: any, context?: ConversationContext): Promise<GroqResponse> {
    try {
      if (!API_KEY) {
        throw new Error('Groq API key not configured');
      }

      // Actualizar contexto de conversación si se proporciona
      if (context) {
        this.conversationContext = { ...this.conversationContext, ...context };
      }

      // Actualizar contexto basado en el mensaje del usuario
      this.updateConversationContext(userMessage);

      // Construir el prompt con contexto dinámico
      const systemPrompt = this.buildSystemPrompt(userInfo);
      
      // Preparar mensajes para Groq
      const messages = [
        { role: 'system', content: systemPrompt },
        ...this.conversationHistory.slice(-8), // Últimos 8 mensajes para mejor contexto
        { role: 'user', content: userMessage }
      ];

      // Generar respuesta
      const completion = await groq.chat.completions.create({
        messages: messages as any,
        model: 'llama-3.1-8b-instant',
        temperature: 0.7,
        max_tokens: 1024,
      });

      const response = completion.choices[0]?.message?.content || 'Disculpa, no pude generar una respuesta.';

      // Actualizar historial
      this.conversationHistory.push(
        { role: 'user', content: userMessage },
        { role: 'assistant', content: response }
      );

      return {
        text: response.trim(),
        shouldCaptureInfo: this.shouldRequestInfo(userMessage, userInfo),
        intent: this.analyzeIntent(userMessage)
      };

    } catch (error) {
      console.error('Error generating Groq response:', error);
      throw error;
    }
  }

  private buildSystemPrompt(userInfo?: any): string {
    let prompt = getBaseContext();
    
    // Agregar contexto de conversación dinámico
    prompt += `\n\nCONTEXTO DE CONVERSACIÓN ACTUAL:`;
    prompt += `\n- Tipo de propiedad: ${this.conversationContext.propertyType || 'No especificado'}`;
    prompt += `\n- Consumo eléctrico mensual: ${this.conversationContext.monthlyBill || 'No especificado'}`;
    prompt += `\n- Ubicación: ${this.conversationContext.location || 'No especificada'}`;
    prompt += `\n- Presupuesto: ${this.conversationContext.budget || 'No especificado'}`;
    prompt += `\n- Timeline: ${this.conversationContext.timeline || 'No especificado'}`;
    prompt += `\n- Intereses del usuario: ${this.conversationContext.userInterest.join(', ') || 'No especificados'}`;
    prompt += `\n- Etapa actual: ${this.conversationContext.currentStep}`;

    if (userInfo) {
      prompt += `\n\nINFORMACIÓN DEL USUARIO:`;
      if (userInfo.name) prompt += `\n- Nombre: ${userInfo.name}`;
      if (userInfo.email) prompt += `\n- Email: ${userInfo.email}`;
      if (userInfo.phone) prompt += `\n- Teléfono: ${userInfo.phone}`;
    }

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

  private analyzeIntent(message: string): GroqResponse['intent'] {
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
    if (userInfo?.name && userInfo?.email && userInfo?.phone) {
      return false;
    }

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

  getConversationHistory(): Array<{role: 'user' | 'assistant', content: string}> {
    return [...this.conversationHistory];
  }

  getConversationContext(): ConversationContext {
    return { ...this.conversationContext };
  }

  updateContext(newContext: Partial<ConversationContext>): void {
    this.conversationContext = { ...this.conversationContext, ...newContext };
  }
}

export const groqChatService = new GroqChatService();
