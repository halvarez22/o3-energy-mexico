import fs from 'fs';
import path from 'path';

interface ExtractedContent {
  component: string;
  section: string;
  content: string[];
}

class ContentExtractor {
  private extractedContent: ExtractedContent[] = [];

  // Patrones para extraer texto de JSX/TSX
  private textPatterns = [
    /className="[^"]*text[^"]*"[^>]*>([^<]+)</g, // Texto con clases de texto
    /<p[^>]*>([^<]+)<\/p>/g, // Párrafos
    /<h[1-6][^>]*>([^<]+)<\/h[1-6]>/g, // Títulos
    /<span[^>]*>([^<]+)<\/span>/g, // Spans
    /<div[^>]*>([^<]+)<\/div>/g, // Divs con texto directo
    /"[^"]*text[^"]*"[^>]*>([^<]+)</g, // Texto en atributos
    /text-[^"]*"[^>]*>([^<]+)</g, // Clases de texto de Tailwind
  ];

  // Palabras clave para identificar secciones
  private sectionKeywords = {
    'hero': ['hero', 'principal', 'liderando', 'transición'],
    'about': ['sobre', 'quienes somos', 'empresa', 'misión'],
    'services': ['servicios', 'soluciones', 'desarrollo', 'construcción'],
    'projects': ['proyectos', 'galería', 'casos de éxito'],
    'team': ['equipo', 'directivo', 'ceo', 'presidente'],
    'contact': ['contacto', 'ubicación', 'teléfono', 'email'],
    'financing': ['financiamiento', 'financiación', 'opciones de pago'],
    'installation': ['instalación', 'proceso', 'evaluación'],
    'maintenance': ['mantenimiento', 'operación', 'monitoreo'],
    'efficiency': ['eficiencia', 'energética', 'ahorro']
  };

  extractFromFile(filePath: string): ExtractedContent | null {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const fileName = path.basename(filePath, '.tsx');
      
      // Determinar la sección basada en el nombre del archivo
      const section = this.determineSection(fileName, content);
      
      // Extraer texto usando múltiples patrones
      const extractedText = this.extractTextFromContent(content);
      
      if (extractedText.length === 0) return null;

      return {
        component: fileName,
        section,
        content: extractedText
      };
    } catch (error) {
      console.error(`Error procesando ${filePath}:`, error);
      return null;
    }
  }

  private determineSection(fileName: string, content: string): string {
    const lowerFileName = fileName.toLowerCase();
    const lowerContent = content.toLowerCase();

    // Buscar por nombre de archivo
    for (const [section, keywords] of Object.entries(this.sectionKeywords)) {
      if (keywords.some(keyword => lowerFileName.includes(keyword))) {
        return section;
      }
    }

    // Buscar por contenido
    for (const [section, keywords] of Object.entries(this.sectionKeywords)) {
      if (keywords.some(keyword => lowerContent.includes(keyword))) {
        return section;
      }
    }

    return 'general';
  }

  private extractTextFromContent(content: string): string[] {
    const extractedText: string[] = [];
    
    // Extraer texto usando todos los patrones
    this.textPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const text = match[1].trim();
        if (text && text.length > 3 && !this.isCodeOrClassName(text)) {
          extractedText.push(text);
        }
      }
    });

    // Extraer texto de strings literales en JSX
    const stringLiteralPattern = /["']([^"']{10,})["']/g;
    let match;
    while ((match = stringLiteralPattern.exec(content)) !== null) {
      const text = match[1].trim();
      if (text && !this.isCodeOrClassName(text) && !this.isUrl(text)) {
        extractedText.push(text);
      }
    }

    // Remover duplicados y filtrar
    return [...new Set(extractedText)]
      .filter(text => this.isValidText(text))
      .map(text => this.cleanText(text));
  }

  private isCodeOrClassName(text: string): boolean {
    return text.includes('className') || 
           text.includes('import') || 
           text.includes('export') ||
           text.includes('const') ||
           text.includes('function') ||
           text.includes('return') ||
           text.includes('{') ||
           text.includes('}');
  }

  private isUrl(text: string): boolean {
    return text.includes('http') || 
           text.includes('www.') || 
           text.includes('.com') ||
           text.includes('.jpg') ||
           text.includes('.png') ||
           text.includes('.avif');
  }

  private isValidText(text: string): boolean {
    return text.length > 5 && 
           text.length < 500 && 
           !text.match(/^[0-9\s\-_]+$/) && // No solo números
           !text.includes('className') &&
           !text.includes('import') &&
           !text.includes('export');
  }

  private cleanText(text: string): string {
    return text
      .replace(/\s+/g, ' ') // Normalizar espacios
      .replace(/[{}]/g, '') // Remover llaves
      .trim();
  }

  async extractAllComponents(): Promise<void> {
    const componentsDir = path.join(process.cwd(), 'src/components');
    const files = this.getAllTsxFiles(componentsDir);

    console.log(`Procesando ${files.length} archivos...`);

    for (const file of files) {
      const extracted = this.extractFromFile(file);
      if (extracted) {
        this.extractedContent.push(extracted);
        console.log(`✓ ${extracted.component} -> ${extracted.section} (${extracted.content.length} textos)`);
      }
    }

    // Generar el contexto estructurado
    this.generateStructuredContext();
  }

  private getAllTsxFiles(dir: string): string[] {
    const files: string[] = [];
    
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files.push(...this.getAllTsxFiles(fullPath));
      } else if (item.endsWith('.tsx') && !item.includes('.test.') && !item.includes('.spec.')) {
        files.push(fullPath);
      }
    }
    
    return files;
  }

  private generateStructuredContext(): void {
    // Agrupar por secciones
    const sections: { [key: string]: ExtractedContent[] } = {};
    this.extractedContent.forEach(item => {
      if (!sections[item.section]) {
        sections[item.section] = [];
      }
      sections[item.section].push(item);
    });

    // Generar contexto estructurado
    let structuredContext = `CONTENIDO COMPLETO DE LA PÁGINA WEB:\n\n`;

    Object.entries(sections).forEach(([sectionName, items]) => {
      structuredContext += `${sectionName.toUpperCase()}:\n`;
      
      items.forEach(item => {
        structuredContext += `\n${item.component}:\n`;
        item.content.forEach(text => {
          structuredContext += `- "${text}"\n`;
        });
      });
      
      structuredContext += '\n';
    });

    // Guardar en archivo
    const outputPath = path.join(process.cwd(), 'src/services/webContent.ts');
    const content = `// Contenido extraído automáticamente de la página web
export const WEB_CONTENT = \`${structuredContext}\`;

export const getWebContent = () => WEB_CONTENT;
`;

    fs.writeFileSync(outputPath, content, 'utf-8');
    console.log(`\n✅ Contexto generado en: ${outputPath}`);
    console.log(`📊 Total de secciones: ${Object.keys(sections).length}`);
    console.log(`📊 Total de componentes: ${this.extractedContent.length}`);
    console.log(`📊 Total de textos extraídos: ${this.extractedContent.reduce((sum, item) => sum + item.content.length, 0)}`);
  }
}

// Ejecutar si se llama directamente
const extractor = new ContentExtractor();
extractor.extractAllComponents().catch(console.error);

export default ContentExtractor;
