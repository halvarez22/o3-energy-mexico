import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  containerClassName?: string;
  loading?: 'eager' | 'lazy';
  quality?: number;
  sizes?: string;
  srcSet?: string;
  placeholder?: 'blur' | 'color' | 'empty';
  blurDataURL?: string;
  placeholderColor?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  containerClassName = '',
  loading: loadingProp = 'lazy',
  quality = 80,
  sizes = '100vw',
  srcSet,
  placeholder = 'color',
  blurDataURL,
  placeholderColor = '#f0f0f0',
  objectFit = 'cover',
  priority = false,
  style = {},
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(priority);
  const [isInView, setIsInView] = useState(priority);
  const [currentSrc] = useState(placeholder === 'blur' && blurDataURL ? blurDataURL : src);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loading = priority ? 'eager' : loadingProp;

  // Verificar si el navegador soporta formatos modernos
  // const supportsWebP = () => {
  //   if (typeof window === 'undefined') return false;
  //   const elem = document.createElement('canvas');
  //   if (elem.getContext && elem.getContext('2d')) {
  //     return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  //   }
  //   return false;
  // };

  // const supportsAvif = () => {
  //   if (typeof window === 'undefined') return false;
  //   // Verificación básica, en producción deberías usar feature detection real
  //   return false;
  // };

  // Obtener la extensión del archivo
  const getFileExtension = (filename: string) => {
    return filename.split('.').pop()?.toLowerCase() || '';
  };

  // Generar la URL de la imagen optimizada
  const getOptimizedSrc = () => {
    if (!src) return '';
    
    const extension = getFileExtension(src);
    const isSvg = extension === 'svg';
    
    // Para SVG, no hacemos optimización
    if (isSvg) return src;
    
    // Para imágenes que ya están en un CDN o tienen parámetros de consulta, no las modificamos
    if (src.includes('?') || src.startsWith('http')) {
      return src;
    }
    
    // Para imágenes locales, Vite las procesará automáticamente
    // Podemos añadir parámetros de consulta aquí si es necesario
    return src;
  };

  // Generar srcSet automáticamente si no se proporciona
  const generateSrcSet = () => {
    if (srcSet) return srcSet;
    
    const optimizedSrc = getOptimizedSrc();
    if (!optimizedSrc) return undefined;
    
    // Solo generamos srcSet para imágenes locales que no sean SVG
    const extension = getFileExtension(optimizedSrc);
    if (extension === 'svg' || optimizedSrc.startsWith('http')) return undefined;
    
    // Tamaños estándar para imágenes responsivas
    const widths = [640, 768, 1024, 1280, 1536];
    return widths
      .map(width => `${optimizedSrc}?w=${width}&q=${quality} ${width}w`)
      .join(', ');
  };

  // Configurar el Intersection Observer para lazy loading
  useEffect(() => {
    if (loading !== 'lazy' || !imgRef.current) {
      setIsInView(true);
      return;
    }

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '200px',
      threshold: 0.01
    });

    observerRef.current.observe(imgRef.current!);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loading]);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    if (onError) onError();
  };

  const optimizedSrc = getOptimizedSrc();
  const imageSrcSet = generateSrcSet();
  const showPlaceholder = !isLoaded && placeholder !== 'empty';
  const placeholderStyle = {
    backgroundColor: placeholder === 'color' ? placeholderColor : 'transparent',
    backgroundImage: placeholder === 'blur' && blurDataURL ? `url(${blurDataURL})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  return (
    <div 
      className={clsx(
        'relative overflow-hidden',
        containerClassName,
        {
          'animate-pulse': showPlaceholder && placeholder === 'color'
        }
      )}
      style={{
        width: width || '100%',
        height: height || 'auto',
        ...(showPlaceholder ? placeholderStyle : {}),
        ...style
      }}
      ref={imgRef}
    >
      {isInView && (
        <img
          {...props}
          src={currentSrc === blurDataURL ? optimizedSrc : currentSrc}
          srcSet={imageSrcSet}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          className={clsx(
            'transition-opacity duration-300',
            className,
            {
              'opacity-0': !isLoaded,
              'opacity-100': isLoaded
            }
          )}
          style={{
            width: '100%',
            height: '100%',
            objectFit,
            objectPosition: 'center',
            ...style
          }}
          decoding="async"
          aria-hidden={!alt}
          role={!alt ? 'presentation' : undefined}
        />
      )}
    </div>
  );
};

// Función para generar un placeholder de baja calidad (LQIP)
// function getBlurDataURL(color: string = '#f0f0f0'): string {
//   // Genera un pequeño SVG de 1x1 píxel del color especificado
//   const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'><rect width='1' height='1' fill='${color}'/></svg>`;
//   return `data:image/svg+xml;base64,${btoa(svg)}`;
// }

export default OptimizedImage;
