# Especificación del Chatbot O3 Energy

## Objetivo
Crear un chatbot inteligente integrado en la página web de O3 Energy que:
- Capture leads de manera natural y conversacional
- Responda preguntas sobre energía solar y O3 Energy
- Extraiga datos de contacto (nombre, teléfono, email) de forma sutil
- Proporcione información relevante sobre servicios y proyectos

## Funcionalidades Principales

### 1. Captura de Leads Inteligente
- **Conversación natural** que fluye hacia la captura de datos
- **Validación en tiempo real** de email y teléfono
- **Integración** con el sistema de EmailJS existente
- **Almacenamiento local** de conversaciones

### 2. Base de Conocimiento
- **Información de O3 Energy**: servicios, proyectos, ubicación
- **Energía solar general**: beneficios, costos, instalación
- **Preguntas frecuentes** sobre energía renovable
- **Casos de éxito** y testimonios

### 3. Interfaz de Usuario
- **Diseño consistente** con el sitio web actual
- **Animaciones suaves** y transiciones
- **Responsive** para móviles y desktop
- **Accesibilidad** completa

### 4. Inteligencia Artificial
- **Procesamiento de lenguaje natural** con GPT-4
- **Contexto conversacional** mantenido
- **Respuestas personalizadas** según el interés del usuario
- **Escalación** a contacto humano cuando sea necesario

## Arquitectura Técnica

### Frontend (React)
```
src/components/Chatbot/
├── ChatbotWidget.tsx      # Componente principal
├── ChatWindow.tsx         # Ventana de chat
├── MessageBubble.tsx      # Burbujas de mensajes
├── InputField.tsx         # Campo de entrada
├── LeadCapture.tsx        # Formulario de captura
└── chatbot.css           # Estilos específicos
```

### Backend (API)
```
api/
├── chatbot/
│   ├── chat.js           # Endpoint principal
│   ├── openai.js         # Integración con OpenAI
│   ├── leads.js          # Manejo de leads
│   └── knowledge.js      # Base de conocimiento
```

### Base de Datos
```sql
-- Tabla de conversaciones
CREATE TABLE conversations (
  id UUID PRIMARY KEY,
  session_id VARCHAR(255),
  user_message TEXT,
  bot_response TEXT,
  timestamp TIMESTAMP,
  user_data JSONB
);

-- Tabla de leads
CREATE TABLE leads (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20),
  interest VARCHAR(255),
  source VARCHAR(50),
  created_at TIMESTAMP
);
```

## Flujo de Conversación

### 1. Saludo Inicial
```
Bot: "¡Hola! Soy el asistente virtual de O3 Energy 🌞 
¿En qué puedo ayudarte hoy? Puedo contarte sobre:
• Nuestros servicios de energía solar
• Proyectos realizados
• Beneficios de la energía limpia
• Costos y financiamiento"
```

### 2. Captura Sutil de Datos
```
Bot: "Me da mucho gusto ayudarte con información sobre energía solar. 
Para poder enviarte información más detallada, ¿podrías decirme tu nombre?"

Usuario: "Soy Juan"

Bot: "¡Perfecto Juan! ¿Y cuál sería la mejor forma de contactarte? 
¿Prefieres que te llamemos o te enviemos información por email?"
```

### 3. Calificación de Lead
```
Bot: "Entiendo que estás interesado en paneles solares para tu hogar/empresa.
¿Podrías contarme un poco más sobre tu proyecto? Por ejemplo:
• ¿Qué tipo de propiedad es?
• ¿Cuál es tu consumo eléctrico aproximado?
• ¿Tienes algún presupuesto en mente?"
```

## Integración con la Página Actual

### 1. Widget Flotante
- **Posición:** Esquina inferior derecha
- **Icono:** Logo de O3 Energy o ícono de chat
- **Animación:** Pulso sutil para llamar la atención
- **Estado:** Minimizado por defecto

### 2. Triggers de Activación
- **Tiempo en página:** Después de 30 segundos
- **Scroll:** Al llegar al 50% de la página
- **Intención de salida:** Cuando el cursor se mueve hacia la barra de direcciones
- **Páginas específicas:** Más agresivo en páginas de servicios

### 3. Integración con Formulario Existente
- **Datos compartidos:** Los datos capturados se pueden pre-llenar en el formulario
- **Continuidad:** Si el usuario prefiere el formulario, se mantiene el contexto
- **Seguimiento:** Ambos canales se registran como fuentes de leads

## Métricas y Analytics

### KPIs a Medir
- **Tasa de engagement:** % de usuarios que interactúan
- **Conversión a lead:** % que proporciona datos de contacto
- **Satisfacción:** Rating de la conversación
- **Temas más consultados:** Para mejorar la base de conocimiento

### Dashboard de Administración
- **Conversaciones en tiempo real**
- **Leads generados por día/semana/mes**
- **Análisis de sentimientos**
- **Preguntas sin respuesta** (para mejorar el bot)

## Fases de Desarrollo

### Fase 1: MVP (2-3 semanas)
- ✅ Componente básico de chat
- ✅ Integración con OpenAI
- ✅ Captura básica de leads
- ✅ Base de conocimiento inicial

### Fase 2: Mejoras (1-2 semanas)
- ✅ Interfaz mejorada
- ✅ Más triggers de activación
- ✅ Analytics básicos
- ✅ Integración con EmailJS

### Fase 3: Optimización (1 semana)
- ✅ A/B testing de mensajes
- ✅ Dashboard de administración
- ✅ Optimización de conversiones
- ✅ Integración con CRM

## Costos Estimados

### Desarrollo
- **Desarrollo inicial:** $2,000 - $3,000 USD
- **Integración y testing:** $500 - $800 USD
- **Total desarrollo:** $2,500 - $3,800 USD

### Operación Mensual
- **OpenAI API:** $50 - $200 USD/mes (según uso)
- **Hosting backend:** $20 - $50 USD/mes
- **Base de datos:** $10 - $30 USD/mes
- **Total operación:** $80 - $280 USD/mes

## Próximos Pasos

1. **Aprobar especificación** y ajustes necesarios
2. **Definir presupuesto** y timeline
3. **Crear base de conocimiento** específica de O3 Energy
4. **Desarrollar MVP** del chatbot
5. **Testing y optimización**
6. **Lanzamiento gradual**

¿Te parece bien esta propuesta? ¿Hay algo que te gustaría ajustar o agregar?