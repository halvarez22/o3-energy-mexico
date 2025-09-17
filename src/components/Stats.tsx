
import React, { useState, useEffect, useRef } from 'react';

interface AnimatedNumberProps {
  target: number;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ target }) => {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const end = target;
          if (start === end) return;

          let duration = 2000;
          let startTime = Date.now();

          const step = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const val = Math.floor(progress * (end - start) + start);
            setCurrent(val);
            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{current}</span>;
};


const Stats: React.FC = () => {
  const stats = [
    { value: 250, label: 'Proyectos Totales', suffix: '+ MW' },
    { value: 2.5, label: 'Pipeline de Desarrollo', suffix: ' GW' },
    { value: 8, label: 'Años de Experiencia', suffix: '+' },
    { value: 100, label: 'Satisfacción del Cliente', suffix: '%' },
  ];

  return (
    <div className="py-20 lg:py-24 bg-o3-dark-gray text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="p-4">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                {stat.label.includes("Pipeline") ? (
                  <>{stat.value}</>
                ) : (
                  <AnimatedNumber target={stat.value} />
                )}
                <span className="text-3xl lg:text-4xl text-o3-green">{stat.suffix}</span>
              </h3>
              <p className="mt-2 text-sm md:text-base font-semibold text-gray-400 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
