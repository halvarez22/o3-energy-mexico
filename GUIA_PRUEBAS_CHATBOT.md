# 🤖 Guía de Pruebas - Chatbot O3 Energy con Contexto Completo

## 🎯 Objetivo
Probar que el chatbot ahora tiene acceso completo a toda la información de la página web y puede responder preguntas específicas sobre cualquier sección.

## 🚀 Cómo Acceder
1. Abre tu navegador
2. Ve a `http://localhost:5173`
3. El chatbot aparecerá automáticamente después de 30 segundos
4. O haz clic en el botón flotante naranja en la esquina inferior derecha

## 🧪 Pruebas Recomendadas

### **Prueba 1: Información de Hero Section**
**Pregunta:** "¿Qué dice la sección principal sobre la transición energética?"

**Respuesta esperada:** Debe mencionar "Liderando la transición energética en México" y "Desarrollamos, construimos y operamos proyectos de energía renovable a gran escala"

---

### **Prueba 2: Proyectos Específicos**
**Pregunta:** "¿Cuáles son los proyectos específicos de Volkswagen y Chase Bank?"

**Respuesta esperada:** Debe mencionar:
- Volkswagen (Richmond, CA) - 116KW
- Chase Bank (Denton, TX) - 50KW

---

### **Prueba 3: Proceso de Instalación**
**Pregunta:** "¿Cuánto tiempo toma el proceso de evaluación gratuita?"

**Respuesta esperada:** Debe mencionar "1-2 días" y el proceso completo de evaluación

---

### **Prueba 4: Beneficios y ROI**
**Pregunta:** "¿Cuál es el ROI típico para proyectos residenciales?"

**Respuesta esperada:** Debe mencionar "5-7 años" para residencial y "3-5 años" para comercial

---

### **Prueba 5: Opciones de Financiamiento**
**Pregunta:** "¿Qué opciones de financiamiento ofrecen?"

**Respuesta esperada:** Debe mencionar "diversas opciones de financiamiento" y "comenzar a ahorrar desde el primer día"

---

### **Prueba 6: Contenido del Cotizador**
**Pregunta:** "¿Cómo funciona el cotizador solar?"

**Respuesta esperada:** Debe mencionar "4 pasos", "cotización personalizada" y "calcule su ahorro"

---

### **Prueba 7: Información de Contacto**
**Pregunta:** "¿Cuál es el teléfono de contacto?"

**Respuesta esperada:** Debe mencionar "+52 614 775 6600" y "+52 614 775 6606"

---

### **Prueba 8: Servicios Específicos**
**Pregunta:** "¿Cuáles son los servicios principales de O3 Energy?"

**Respuesta esperada:** Debe mencionar:
- Desarrollo de proyectos de energía renovable
- Construcción e instalación de sistemas solares
- Operación y mantenimiento

---

## 🔍 Qué Verificar

### ✅ **Respuestas Mejoradas**
- Las respuestas deben ser **más específicas** y detalladas
- Debe mencionar **información exacta** de la página web
- Debe **recordar contexto** durante la conversación

### ✅ **Contexto Persistente**
- El chatbot debe **recordar información** que le proporciones
- Debe **adaptar respuestas** según el tipo de cliente
- Debe **mantener coherencia** en conversaciones largas

### ✅ **Prompts Especializados**
- Respuestas **adaptadas** según el tipo de consulta
- **Límites de palabras** apropiados
- **Objetivos claros** para cada respuesta

## 🐛 Problemas Comunes y Soluciones

### **Problema:** El chatbot no responde
**Solución:** Verifica que las API keys estén configuradas en `.env.local`

### **Problema:** Respuestas genéricas
**Solución:** El contexto completo debería resolver esto. Si persiste, verifica que el archivo `webContent.ts` se haya generado correctamente.

### **Problema:** El chatbot no recuerda información
**Solución:** Verifica que el contexto dinámico esté funcionando. Debe detectar automáticamente tipo de propiedad, consumo eléctrico, etc.

## 📊 Estadísticas del Contexto

- **📏 Tamaño:** 29,890 caracteres
- **📝 Palabras:** 3,816 palabras
- **🎯 Tokens:** ~4,961 tokens (muy manejable)
- **📋 Secciones:** 7 secciones principales
- **🧩 Componentes:** 31 componentes procesados

## 🎉 Resultado Esperado

Después de estas pruebas, el chatbot debería:

1. **Responder con información específica** de la página web
2. **Mantener contexto** durante conversaciones largas
3. **Adaptar respuestas** según el tipo de consulta
4. **Recordar información** del usuario
5. **Proporcionar respuestas más relevantes** y detalladas

## 🔄 Actualizar Contenido

Si modificas contenido en los componentes, ejecuta:
```bash
npx tsx scripts/extractContent.ts
```

Esto actualizará automáticamente el contexto del chatbot.

---

**¡Disfruta probando el chatbot mejorado! 🚀**
