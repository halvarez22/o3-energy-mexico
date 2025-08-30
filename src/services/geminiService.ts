import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

if (!API_KEY) {
  throw new Error('VITE_GOOGLE_API_KEY no está configurada');
}

const genAI = new GoogleGenerativeAI(API_KEY);

// Configuración del modelo
const model = genAI.getGenerativeModel({ 
  model: 'gemini-pro',
  generationConfig: {
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 1024,
  }
});

// Contexto base sobre O3 ENERGY MEXICO
const O3_ENERGY_CONTEXT = `
Eres el asistente virtual de O3 ENERGY MEXICO, una empresa mexicana especializada en energía solar con más de 10 años de experiencia.

INFORMACIÓN DE LA EMPRESA:
- Nombre: O3 ENERGY MEXICO
- Ubicación: Chihuahua, Chihuahua, México
- Dirección: Calle Misión de San Cristóbal 5918, Fraccionamiento El Campanario
- Código Postal: 31213
- Teléfono: +52 614 775 6600 / +52 614 775 6606
- Email: contacto@o3mexico.com
- Horarios: Lunes a Viernes 9:00 AM - 6:00 PM

SERVICIOS PRINCIPALES:
1. Desarrollo de proyectos de energía renovable
2. Construcción e instalación de sistemas solares
3. Operación y mantenimiento (O&M)
4. EPC Solar (Engineering, Procurement, Construction)
5. Financiamiento de proyectos solares
6. Eficiencia energética

PROYECTOS DESTACADOS:
- Volkswagen (Richmond, CA) - 116KW
- Holiday Inn (Dripping Springs, TX) - 80.7KW
- Chase Bank (Denton, TX) - 50KW
- City of Murrieta (Murrieta, CA) - 503KW
- New Hope Church (Hilo, HI) - 113KW
- Hillside Memorial (Culver City, CA) - 338KW
- Hyundai (Richmond, CA) - 45KW
- Guam Resorts (Tamuning, Guam) - 445KW

OBJETIVO DEL CHATBOT:
1. Capturar leads de manera natural y conversacional
2. Responder preguntas sobre energía solar y O3 ENERGY MEXICO
3. Extraer datos de contacto (nombre, email, teléfono) sutilmente
4. Calificar el interés del prospecto
5. Dirigir hacia una consulta gratuita

INSTRUCCIONES DE COMPORTAMIENTO:
- Sé amigable, profesional y conocedor
- Usa un tono conversacional y humano
- Haz preguntas abiertas para mantener la conversación
- Captura información gradualmente, no todo de una vez
- Enfócate en beneficios, no solo en características técnicas
- Siempre ofrece una consulta gratuita al final
- Usa emojis ocasionalmente para ser más amigable
- Responde en español mexicano
- Si no sabes algo específico, ofrece conectar con un especialista

DATOS IMPORTANTES SOBRE ENERGÍA SOLAR:
- Un sistema residencial típico cuesta entre $80,000 y $200,000 MXN
- Se paga solo en 5-7 años con ahorros en electricidad
- Reduce el recibo de luz hasta 95%
- Tecnología confiable con garantía de 25+ años
- Aumenta el valor de la propiedad
- Contribuye al medio ambiente
`;

export interface ChatResponse {
  text: string;
  shouldCaptureInfo?: boolean;
  suggestedQuestions?: string[];
  intent?: 'greeting' | 'info_request' | 'pricing' | 'contact' | 'qualification';
}

export class GeminiChatService {
  private conversationHistory: Array<{role: 'user' | 'model', parts: string}> = [];

  async generateResponse(userMessage: string, userInfo?: any): Promise<ChatResponse> {
    try {
      // Construir el prompt con contexto
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
        text: 'Disculpa, tuve un problema técnico. ¿Podrías repetir tu pregunta? Mientras tanto, puedes contactarnos directamente al +52 474 123 4567.',
        intent: 'greeting'
      };
    }
  }

  private buildPrompt(userMessage: string, userInfo?: any): string {
    let prompt = O3_ENERGY_CONTEXT + '\n\n';
    
    // Agregar información del usuario si está disponible
    if (userInfo) {
      prompt += `INFORMACIÓN DEL USUARIO:\n`;
      if (userInfo.name) prompt += `- Nombre: ${userInfo.name}\n`;
      if (userInfo.email) prompt += `- Email: ${userInfo.email}\n`;
      if (userInfo.phone) prompt += `- Teléfono: ${userInfo.phone}\n`;
      prompt += '\n';
    }

    // Agregar historial de conversación reciente (últimos 6 mensajes)
    if (this.conversationHistory.length > 0) {
      prompt += 'CONVERSACIÓN PREVIA:\n';
      const recentHistory = this.conversationHistory.slice(-6);
      recentHistory.forEach(msg => {
        prompt += `${msg.role === 'user' ? 'Usuario' : 'Asistente'}: ${msg.parts}\n`;
      });
      prompt += '\n';
    }

    prompt += `MENSAJE ACTUAL DEL USUARIO: ${userMessage}\n\n`;
    prompt += `INSTRUCCIONES PARA ESTA RESPUESTA:
- Responde de manera natural y conversacional
- Si el usuario no ha dado su información de contacto, busca una oportunidad natural para pedirla
- Si pregunta sobre costos, menciona rangos y ofrece una cotización personalizada gratuita
- Si muestra interés, califica su necesidad (residencial/comercial, consumo eléctrico, ubicación)
- Mantén las respuestas concisas pero informativas (máximo 150 palabras)
- Termina con una pregunta para mantener la conversación activa

RESPUESTA:`;

    return prompt;
  }

  private analyzeIntent(message: string): ChatResponse['intent'] {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hola') || lowerMessage.includes('buenos') || lowerMessage.includes('buenas')) {
      return 'greeting';
    }
    if (lowerMessage.includes('costo') || lowerMessage.includes('precio') || lowerMessage.includes('cuanto')) {
      return 'pricing';
    }
    if (lowerMessage.includes('contacto') || lowerMessage.includes('llamar') || lowerMessage.includes('teléfono')) {
      return 'contact';
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
  }

  getConversationHistory(): Array<{role: 'user' | 'model', parts: string}> {
    return [...this.conversationHistory];
  }
}

// Instancia singleton del servicio
export const geminiChatService = new GeminiChatService();