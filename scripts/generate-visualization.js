import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join, basename, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuración
const COMPONENTS_DIR = join(__dirname, '../components');
const OUTPUT_FILE = join(__dirname, '../COMPONENT_TREE.md');

// Función para analizar los componentes
function analyzeComponents() {
  try {
    const components = [];
    
    // Leer el directorio de componentes
    const files = readdirSync(COMPONENTS_DIR);
    
    // Analizar cada archivo de componente
    files.forEach(file => {
      if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
        const componentName = basename(file, extname(file));
        const content = readFileSync(join(COMPONENTS_DIR, file), 'utf8');
        
        // Extraer imports
        const imports = [];
        const importMatches = content.matchAll(/import\s+.*?\s+from\s+['"](.*?)['"]/g);
        for (const match of importMatches) {
          imports.push(match[1].replace('../', ''));
        }
        
        // Extraer componentes utilizados
        const usedComponents = [];
        const componentMatches = content.matchAll(/<([A-Z]\w+)/g);
        for (const match of componentMatches) {
          const compName = match[1];
          if (compName !== componentName && !compName.startsWith('Svg') && !['div', 'span', 'button'].includes(compName)) {
            usedComponents.push(compName);
          }
        }
        
        components.push({
          name: componentName,
          path: `./src/components/${file}`,
          imports: [...new Set(imports)],
          usedComponents: [...new Set(usedComponents)]
        });
      }
    });
    
    return components;
  } catch (error) {
    console.error('Error al analizar componentes:', error);
    return [];
  }
}

// Generar documentación en formato Mermaid
function generateMermaid(components) {
  let mermaid = '```mermaid\ngraph TD\n';
  
  // Agregar nodos
  components.forEach(comp => {
    mermaid += `  ${comp.name}[${comp.name}]\n`;
  });
  
  // Agregar conexiones
  components.forEach(comp => {
    comp.usedComponents.forEach(used => {
      if (components.some(c => c.name === used)) {
        mermaid += `  ${comp.name} --> ${used}\n`;
      }
    });
  });
  
  mermaid += '```';
  return mermaid;
}

// Generar documentación en formato Markdown
function generateMarkdown(components) {
  let md = '# Visualización de Componentes\n\n';
  
  // Diagrama Mermaid
  md += '## Diagrama de Componentes\n\n';
  md += generateMermaid(components);
  md += '\n\n';
  
  // Lista de componentes
  md += '## Lista de Componentes\n\n';
  md += '| Componente | Archivo | Dependencias |\n';
  md += '|------------|---------|--------------|\n';
  
  components.forEach(comp => {
    md += `| ${comp.name} | \`${comp.path}\` | ${comp.imports.join(', ')} |\n`;
  });
  
  return md;
}

// Función principal
function main() {
  console.log('🔍 Analizando componentes...');
  const components = analyzeComponents();
  
  console.log('📝 Generando documentación...');
  const markdown = generateMarkdown(components);
  
  writeFileSync(OUTPUT_FILE, markdown);
  console.log(`✅ Documentación generada en: ${OUTPUT_FILE}`);
  
  console.log('\n📊 Resumen:');
  console.log(`- Total de componentes: ${components.length}`);
  console.log(`- Componentes principales: ${components.map(c => c.name).join(', ')}`);
}

main();
