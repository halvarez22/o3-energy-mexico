# 🌞 O3 Energy México - Sitio Web Corporativo de Energía Solar

Una aplicación web corporativa desarrollada en **React + TypeScript** para **O3 Energy**, empresa mexicana especializada en energía solar y proyectos de energía renovable.

## 🎯 Descripción

Esta aplicación sirve como **sitio web corporativo** que presenta los servicios, proyectos y equipo de O3 Energy, con el objetivo de:
- **Generar leads** para proyectos de energía solar
- **Mostrar el portafolio** de proyectos realizados
- **Proporcionar información** sobre servicios y soluciones energéticas
- **Facilitar el contacto** con clientes potenciales

## 🚀 Funcionalidades Principales

### **Páginas y Secciones**
- **🏠 Inicio**: Hero section con llamada a la acción, servicios, proyectos destacados, equipo y contacto
- **⚡ Soluciones Energéticas**: Páginas especializadas para diferentes servicios
  - EPC Solar (Engineering, Procurement, Construction)
  - Desarrollo de Proyectos
  - Instalación Solar
  - Financiamiento Solar
  - Mantenimiento Solar
  - Eficiencia Energética
- **🧮 Cotizador**: Calculadora solar interactiva para estimar costos y beneficios
- **📋 Proyectos**: Galería completa de proyectos realizados

### **Servicios Principales**
1. **Desarrollo** de proyectos de energía renovable a gran escala
2. **Construcción** con equipo profesional especializado
3. **Operación y Mantenimiento** para optimizar rendimiento

### **🤖 Chatbot Inteligente**
- **Integración con OpenAI/GPT** para respuestas inteligentes
- **Captura de leads** de forma conversacional
- **Contexto completo** de la página web
- **Prompts especializados** por tipo de consulta
- **Contexto dinámico** que recuerda información del usuario
- Base de conocimiento sobre energía solar y servicios de O3 Energy

### **📱 Características Técnicas**
- **Diseño responsivo** completo
- **Optimización avanzada**:
  - Code splitting para carga rápida
  - Imágenes optimizadas (WebP/AVIF)
  - Lazy loading y carga diferida
- **Integración de servicios**:
  - EmailJS para formularios de contacto
  - WhatsApp para comunicación directa
  - Mapas interactivos con Leaflet

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **AI/LLM**: Google Gemini, Groq
- **Formularios**: Formik, Yup
- **Mapas**: Leaflet, React Leaflet
- **Comunicación**: EmailJS
- **Testing**: Vitest, Testing Library

## 📦 Instalación y Configuración

### **Prerrequisitos**
- Node.js (versión 18 o superior)
- npm o yarn

### **Pasos de Instalación**

1. **Clonar el repositorio**:
   ```bash
   git clone <repository-url>
   cd o3_energy_mexico
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**:
   Crear archivo `.env.local` con:
   ```env
   VITE_GOOGLE_API_KEY=tu_api_key_de_gemini
   VITE_GROQ_API_KEY=tu_api_key_de_groq
   ```

4. **Ejecutar la aplicación**:
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**:
   ```
   http://localhost:3000
   ```

## 🔧 Scripts Disponibles

### **Desarrollo**
```bash
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Construir para producción
npm run preview      # Vista previa de la construcción
npm run lint         # Ejecutar linter
npm run lint:fix     # Corregir errores de linting
```

### **Chatbot y Contenido**
```bash
npx tsx scripts/extractContent.ts    # Extraer contenido de la página web para el chatbot
npx tsx scripts/testContextOnly.ts   # Probar contexto del chatbot
```

### **Optimización**
```bash
npm run optimize-images    # Optimizar imágenes
npm run type-check        # Verificar tipos de TypeScript
```

## 🎨 Diseño y UX

### **Paleta de Colores**
- **Tema oscuro** profesional (#0F0F0F)
- **Colores corporativos**: 
  - Naranja (#f36f20) - Color principal
  - Verde (#A4E834) - Color secundario
- **Animaciones suaves** con Framer Motion
- **Navegación intuitiva** con scroll suave

### **Proyectos Destacados**
- Volkswagen (Richmond, CA) - 116 KW
- Holiday Inn (Dripping Springs, TX) - 80.7 KW
- Chase Bank (Denton, TX) - 50 KW
- City of Murrieta Solar Farm (Murrieta, CA) - 503 KW

### **Equipo Directivo**
- Brad Stutzman (CEO)
- Alejandro Velasco (Presidente)
- Brenda Aguirre (Directora Chihuahua)
- David Santoyo (Representante Legal y Director de Operaciones)
- Jesús Morales (Chief Technology Officer)

## 🤖 Chatbot Avanzado

### **Características del Chatbot**
- **Contexto completo** de la página web (3,816 palabras)
- **Prompts especializados** por intención:
  - Saludo inicial
  - Consultas sobre precios
  - Solicitudes de contacto
  - Calificación de leads
  - Preguntas específicas
- **Contexto dinámico** que detecta automáticamente:
  - Tipo de propiedad (residencial/comercial/industrial)
  - Consumo eléctrico mensual
  - Ubicación del usuario
  - Presupuesto disponible
  - Timeline del proyecto
  - Intereses específicos

### **Actualizar Contenido del Chatbot**
Cuando modifiques contenido en los componentes, ejecuta:
```bash
npx tsx scripts/extractContent.ts
```
Esto actualizará automáticamente el contexto del chatbot.

## 📊 Rendimiento

- **Tiempo de carga**: ~1.2s
- **Tamaño del bundle**: ~145KB
- **Puntuación Lighthouse**: 98/100
- **Tiempo de interacción**: ~1.8s

## 🚀 Despliegue

### **Producción**
```bash
npm run build
npm run preview
```

### **Análisis del Bundle**
```bash
npm run build:analyze
```

## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes React
│   ├── Chatbot/         # Sistema de chatbot
│   ├── About.tsx        # Sección sobre nosotros
│   ├── Hero.tsx         # Sección principal
│   ├── Services.tsx     # Servicios
│   └── ...
├── services/            # Servicios de la aplicación
│   ├── geminiService.ts # Integración con Gemini
│   ├── groqService.ts   # Integración con Groq
│   ├── appContextService.ts # Contexto del chatbot
│   └── webContent.ts    # Contenido extraído de la página
├── scripts/             # Scripts de utilidad
│   ├── extractContent.ts # Extracción de contenido
│   └── testContextOnly.ts # Pruebas del contexto
└── types.ts             # Definiciones de tipos
```

## 🔍 Pruebas del Chatbot

Para probar el chatbot mejorado:

1. Abre `http://localhost:3000`
2. Espera 30 segundos o haz clic en el botón del chatbot
3. Prueba con preguntas específicas como:
   - "¿Qué dice la sección Hero sobre la transición energética?"
   - "¿Cuáles son los proyectos específicos de Volkswagen y Chase Bank?"
   - "¿Cuánto tiempo toma el proceso de evaluación gratuita?"

## 📞 Información de Contacto

- **Teléfono**: +52 614 775 6600 / +52 614 775 6606
- **Email**: contacto@o3mexico.com
- **Dirección**: Calle Misión de San Cristóbal 5918, Fraccionamiento El Campanario, Chihuahua, Chihuahua, México
- **Horarios**: Lunes a Viernes 9:00 AM - 6:00 PM

## 📄 Licencia

Este proyecto es propiedad de O3 Energy México.

---

**¡Desarrollado con ❤️ para impulsar la transición energética en México! 🌞**