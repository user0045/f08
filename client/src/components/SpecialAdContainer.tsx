
import React, { useEffect, useRef } from 'react';

interface SpecialAdContainerProps {
  containerId: string;
  className?: string;
  style?: React.CSSProperties;
}

const SpecialAdContainer: React.FC<SpecialAdContainerProps> = ({ containerId, className, style }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || scriptLoadedRef.current) return;

    const loadAd = () => {
      // Create the special container div first
      const adDiv = document.createElement('div');
      adDiv.id = 'container-51b35925a8ed6839e3d27a6668f25975';

      // Create and load the script
      const script = document.createElement('script');
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = '//pl27267578.profitableratecpm.com/51b35925a8ed6839e3d27a6668f25975/invoke.js';
      script.setAttribute('data-ad-key', '51b35925a8ed6839e3d27a6668f25975');

      script.onload = () => {
        console.log(`Special ad script loaded for ${containerId}`);
      };

      script.onerror = () => {
        console.error(`Failed to load special ad script for ${containerId}`);
      };

      // Append elements to the container
      if (containerRef.current) {
        containerRef.current.appendChild(adDiv);
        containerRef.current.appendChild(script);
        scriptLoadedRef.current = true;
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(loadAd, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [containerId]);

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

export default SpecialAdContainer;
