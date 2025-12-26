import * as path from 'path';
const { join } = path;
import { promises as fs } from 'fs';
import sharp from 'sharp';
import { optimize } from 'svgo';

// Configuración
const IMAGES_DIR = join(process.cwd(), 'images');
const OUTPUT_DIR = join(process.cwd(), 'public', 'images');

// Configuración de optimización
const QUALITY = 80;
const WIDTHS = [320, 640, 1024, 1600];  // Tamaños optimizados para responsive
const FORMATS = ['webp', 'avif'] as const;  // Formatos modernos

// Crear directorio de salida si no existe
async function ensureOutputDir() {
  try {
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
  } catch (error) {
    console.error('Error al crear directorio de salida:', error);
    throw error;
  }
}

type ImageFormat = typeof FORMATS[number];

async function* walk(dir: string): AsyncGenerator<string> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    
    if (entry.isDirectory()) {
      yield* walk(fullPath);
    } else {
      yield fullPath;
    }
  }
}

// Limpiar y normalizar nombres de archivo
function sanitizeFilename(name: string): string {
  return name
    .normalize('NFD') // Separa caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // Elimina acentos
    .replace(/[^a-z0-9]/gi, '-') // Reemplaza caracteres especiales con guiones
    .toLowerCase();
}

async function optimizeImage(filePath: string): Promise<void> {
  const ext = path.extname(filePath).toLowerCase();
  const baseName = path.basename(filePath, ext);
  const sanitizedBaseName = sanitizeFilename(baseName);
  
  // Saltar archivos que ya están optimizados
  if (baseName.includes('-optimized') || baseName.includes('-placeholder')) {
    console.log(`Skipping already processed file: ${filePath}`);
    return;
  }
  
  try {
    // Optimizar SVG
    if (ext === '.svg') {
      const content = await fs.readFile(filePath, 'utf-8');
      const result = optimize(content, {
        path: filePath,
        multipass: true,
      });
      
      if (typeof result.data === 'string') {
        const outputPath = join(dirName, `${baseName}-optimized.svg`);
        await fs.writeFile(outputPath, result.data);
        console.log(`Optimized SVG: ${filePath} -> ${outputPath}`);
      }
      return;
    }
    
    // Para imágenes raster, crear versiones optimizadas
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    if (!metadata.width || !metadata.height) {
      console.error(`No se pudo leer metadatos de: ${filePath}`);
      return;
    }
    
    // Procesar la imagen en diferentes tamaños y formatos
    for (const width of WIDTHS) {
      // No redimensionar más allá del tamaño original
      if (metadata.width < width) {
        console.log(`Skipping width ${width} (larger than original)`);
        continue;
      }
      
      // Calcular altura manteniendo la relación de aspecto
      const height = Math.round((metadata.height / metadata.width) * width);
      
      for (const format of FORMATS) {
        const outputPath = join(OUTPUT_DIR, `${sanitizedBaseName}-${width}w.${format}`);
        
        try {
          const pipeline = sharp(filePath).resize(width, height, {
            fit: 'cover',
            withoutEnlargement: true
          });
          
          const formatOptions = {
            quality: QUALITY,
            effort: 6  // Máxima compresión (más lento pero mejor relación calidad/tamaño)
          };
          
          if (format === 'webp') {
            await pipeline.webp(formatOptions).toFile(outputPath);
          } else {
            await pipeline.avif(formatOptions).toFile(outputPath);
          }
          
          console.log(`✓ Created ${format.toUpperCase()} (${width}w): ${path.basename(outputPath)}`);
        } catch (error) {
          console.error(`Error procesando ${path.basename(filePath)} (${width}w, ${format}):`, error);
        }
      }
    }
    
    // Crear una versión optimizada del formato original
    try {
      const optimizedPath = join(OUTPUT_DIR, `${sanitizedBaseName}-optimized${ext}`);
      await sharp(filePath)
        .webp({ quality: QUALITY, effort: 6 })
        .toFile(optimizedPath);
      
      console.log(`✓ Created optimized version: ${path.basename(optimizedPath)}`);
    } catch (error) {
      console.error(`Error creando versión optimizada de ${path.basename(filePath)}:`, error);
    }
    
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

async function main() {
  try {
    console.log('🚀 Iniciando optimización de imágenes...');
    
    // Asegurar que existan los directorios necesarios
    await ensureOutputDir();
    
    // Verificar si el directorio de imágenes existe
    try {
      await fs.access(IMAGES_DIR);
    } catch {
      console.error(`❌ El directorio de imágenes no existe: ${IMAGES_DIR}`);
      return;
    }
    
    // Procesar todas las imágenes
    let processedCount = 0;
    const supportedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
    
    for await (const filePath of walk(IMAGES_DIR)) {
      const ext = path.extname(filePath).toLowerCase();
      
      if (supportedExtensions.has(ext)) {
        console.log(`\n🔄 Procesando: ${path.basename(filePath)}`);
        await optimizeImage(filePath);
        processedCount++;
      }
    }
    
    if (processedCount === 0) {
      console.log('\nℹ️ No se encontraron imágenes para optimizar.');
      console.log(`  Coloca tus imágenes en: ${IMAGES_DIR}`);
      console.log('  Formatos soportados: .jpg, .jpeg, .png, .webp, .avif');
    } else {
      console.log(`\n✨ ¡Optimización completada! Procesadas ${processedCount} imágenes.`);
      console.log(`   Las imágenes optimizadas se encuentran en: ${OUTPUT_DIR}`);
    }
  } catch (error) {
    console.error('\n❌ Error durante la optimización de imágenes:', error);
    process.exit(1);
  }
}

// Ejecutar el script
main();
