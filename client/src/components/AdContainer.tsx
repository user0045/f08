
import React, { useEffect, useRef } from 'react';

interface AdContainerProps {
  adConfig: {
    key: string;
    format: string;
    height: number;
    width: number;
    params?: Record<string, any>;
  };
  containerId: string;
  className?: string;
  style?: React.CSSProperties;
}

const AdContainer: React.FC<AdContainerProps> = ({ adConfig, containerId, className, style }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || scriptLoadedRef.current) return;

    const loadAd = () => {
      // Create a unique property name for this ad's options
      const optionsKey = `atOptions_${adConfig.key}`;
      
      // Set up the unique atOptions for this specific ad
      (window as any)[optionsKey] = adConfig;
      
      // Also set the global atOptions for compatibility
      (window as any).atOptions = adConfig;

      // Create and load the script
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `//www.highperformanceformat.com/${adConfig.key}/invoke.js`;
      script.async = true;
      script.setAttribute('data-ad-key', adConfig.key);

      script.onload = () => {
        console.log(`Ad script loaded for ${containerId} with key ${adConfig.key}`);
      };

      script.onerror = () => {
        console.error(`Failed to load ad script for ${containerId} with key ${adConfig.key}`);
      };

      // Append script to the container
      if (containerRef.current) {
        containerRef.current.appendChild(script);
        scriptLoadedRef.current = true;
      }
    };

    // Stagger the loading of ads to prevent conflicts
    const delay = Math.random() * 500 + 200; // 200-700ms delay
    const timer = setTimeout(loadAd, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [adConfig, containerId]);

  return (
    <div 
      id={containerId}
      ref={containerRef}
      className={className}
      style={{
        ...style,
        width: 'auto',
        height: 'auto',
        display: 'block',
        overflow: 'visible'
      }}
    />
  );
};

export default AdContainer;
