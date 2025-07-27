
import { useEffect } from 'react';

interface AutoClickAdProps {
  pageType: 'details' | 'player';
}

const AutoClickAd: React.FC<AutoClickAdProps> = ({ pageType }) => {
  useEffect(() => {
    let clickTimer: NodeJS.Timeout | null = null;

    // Suppress console errors related to auto-click
    const originalError = console.error;
    const originalWarn = console.warn;
    
    console.error = (...args) => {
      const message = args.join(' ');
      if (message.includes('Failed to execute') || 
          message.includes('Unable to open') ||
          message.includes('runtime error') ||
          message.includes('plugin:runtime-error')) {
        return; // Suppress these errors
      }
      originalError.apply(console, args);
    };

    console.warn = (...args) => {
      const message = args.join(' ');
      if (message.includes('Failed to execute') || 
          message.includes('Unable to open')) {
        return; // Suppress these warnings
      }
      originalWarn.apply(console, args);
    };

    const isValidUrl = (url: string): boolean => {
      if (!url || typeof url !== 'string') return false;
      try {
        const urlObj = new URL(url);
        return url.length > 10 && 
               !url.includes('javascript:') && 
               url !== '#' && 
               url !== 'https:' &&
               url !== 'http:' &&
               urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
      } catch {
        return false;
      }
    };

    const waitForAdsToLoad = (container: Element): Promise<boolean> => {
      return new Promise((resolve) => {
        let attempts = 0;
        const maxAttempts = 15; // 15 seconds max wait
        
        const checkForAds = () => {
          attempts++;
          
          // Check for various ad indicators
          const hasIframe = container.querySelector('iframe[src*="highperformanceformat.com"], iframe[src*="profitableratecpm.com"]');
          const hasAdDiv = container.querySelector('div[id*="container-"]');
          const hasAdContent = container.children.length > 1;
          const hasAdScript = container.querySelector('script[src*="highperformanceformat.com"], script[src*="profitableratecpm.com"]');
          
          if (hasIframe || hasAdDiv || hasAdContent || hasAdScript) {
            console.log(`Ads detected in ${container.id} after ${attempts} seconds`);
            resolve(true);
            return;
          }
          
          if (attempts >= maxAttempts) {
            console.log(`No ads found in ${container.id} after ${maxAttempts} seconds`);
            resolve(false);
            return;
          }
          
          setTimeout(checkForAds, 1000);
        };
        
        checkForAds();
      });
    };

    const findClickableAdElement = async (container: Element): Promise<Element | null> => {
      console.log(`Scanning container: ${container.id}`);
      
      // Wait for ads to potentially load
      await waitForAdsToLoad(container);
      
      // Priority selectors for real ad content
      const adSelectors = [
        // Iframe ads
        'iframe[src*="highperformanceformat.com"]',
        'iframe[src*="profitableratecpm.com"]',
        'iframe[src*="pl27267578.profitableratecpm.com"]',
        // Ad containers
        'div[id*="container-51b35925a8ed6839e3d27a6668f25975"]',
        'div[id*="container-"]',
        // Google ads
        'ins[class*="adsbygoogle"]',
        'iframe[src*="googlesyndication"]',
        'iframe[src*="doubleclick"]',
        // Generic ad elements
        'div[data-ad]',
        'div[class*="ad-"]',
        'div[id*="ad-"]',
        // Clickable elements
        'a[href]:not([href="#"]):not([href*="javascript:"])',
        'button[onclick]',
        'div[onclick]',
        'span[onclick]'
      ];

      for (const selector of adSelectors) {
        const elements = container.querySelectorAll(selector);
        console.log(`Found ${elements.length} elements for selector: ${selector}`);
        
        for (const element of elements) {
          const rect = element.getBoundingClientRect();
          const isVisible = rect.width > 10 && rect.height > 10 && 
                          rect.top >= -200 && rect.left >= -200 && 
                          rect.bottom <= window.innerHeight + 400 && 
                          rect.right <= window.innerWidth + 400;
          
          // For links, validate the URL
          if (element.tagName === 'A' && element instanceof HTMLAnchorElement) {
            if (!isValidUrl(element.href)) {
              console.log('Skipping invalid URL:', element.href);
              continue;
            }
          }
          
          if (isVisible) {
            console.log(`Found clickable ad element:`, {
              selector,
              tagName: element.tagName,
              rect: { width: rect.width, height: rect.height, top: rect.top, left: rect.left },
              href: element instanceof HTMLAnchorElement ? element.href : 'N/A'
            });
            return element;
          }
        }
      }

      // Enhanced fallback: look for any reasonably sized clickable elements
      const allElements = Array.from(container.querySelectorAll('*'));
      for (const element of allElements) {
        try {
          const rect = element.getBoundingClientRect();
          const hasReasonableSize = rect.width > 50 && rect.height > 30;
          const computedStyle = window.getComputedStyle(element);
          
          const isClickable = element.tagName === 'A' || 
                             element.tagName === 'BUTTON' || 
                             element.hasAttribute('onclick') || 
                             element.style.cursor === 'pointer' ||
                             computedStyle.cursor === 'pointer' ||
                             computedStyle.pointerEvents !== 'none';

          if (hasReasonableSize && isClickable) {
            // For links, validate the URL
            if (element.tagName === 'A' && element instanceof HTMLAnchorElement) {
              if (!isValidUrl(element.href)) {
                continue;
              }
            }
            
            console.log('Found fallback clickable element:', {
              tagName: element.tagName,
              size: { width: rect.width, height: rect.height },
              cursor: computedStyle.cursor
            });
            return element;
          }
        } catch (e) {
          // Skip elements that can't be processed
          continue;
        }
      }

      return null;
    };

    const performClick = (element: Element): boolean => {
      try {
        const rect = element.getBoundingClientRect();
        
        // Calculate random click position within element bounds
        const clickX = rect.left + (rect.width * (0.3 + Math.random() * 0.4)); // 30-70% across
        const clickY = rect.top + (rect.height * (0.3 + Math.random() * 0.4)); // 30-70% down
        
        console.log(`Attempting click at (${Math.round(clickX)}, ${Math.round(clickY)}) on:`, element.tagName);

        // Create realistic mouse event sequence
        const eventOptions = {
          view: window,
          bubbles: true,
          cancelable: true,
          clientX: clickX,
          clientY: clickY,
          button: 0
        };

        // Dispatch mouse events in sequence
        const mousedown = new MouseEvent('mousedown', { ...eventOptions, buttons: 1 });
        const mouseup = new MouseEvent('mouseup', { ...eventOptions, buttons: 0 });
        const click = new MouseEvent('click', eventOptions);

        element.dispatchEvent(mousedown);
        
        setTimeout(() => {
          element.dispatchEvent(mouseup);
          
          setTimeout(() => {
            element.dispatchEvent(click);
            
            // Handle specific element types
            if (element instanceof HTMLElement && typeof element.click === 'function') {
              try {
                element.click();
                console.log('Direct click executed');
              } catch (e) {
                // Silently handle click errors
              }
            }

            // Handle links with proper error handling
            if (element.tagName === 'A' && element instanceof HTMLAnchorElement) {
              if (isValidUrl(element.href)) {
                try {
                  // Suppress any window.open errors
                  const originalOpen = window.open;
                  window.open = function(url?: string | URL, target?: string, features?: string) {
                    try {
                      if (!url || !isValidUrl(url.toString())) {
                        return null;
                      }
                      return originalOpen.call(this, url, target, features);
                    } catch (e) {
                      return null;
                    }
                  };

                  if (element.target === '_blank' || element.target === '_new') {
                    window.open(element.href, '_blank');
                    console.log('Link opened in new tab');
                  } else {
                    window.location.href = element.href;
                    console.log('Link navigation triggered');
                  }

                  // Restore original window.open
                  window.open = originalOpen;
                } catch (e) {
                  // Silently handle navigation errors
                }
              }
            }

            // Handle iframes
            if (element.tagName === 'IFRAME') {
              try {
                const focusEvent = new FocusEvent('focus', { bubbles: true });
                element.dispatchEvent(focusEvent);
                console.log('Iframe interaction triggered');
              } catch (e) {
                // Silently handle iframe errors
              }
            }

          }, 50);
        }, 50);

        console.log('Click sequence completed');
        return true;
      } catch (error) {
        // Silently handle click errors to avoid console spam
        return false;
      }
    };

    const executeAutoClick = async (): Promise<boolean> => {
      console.log(`Starting auto-click for ${pageType} page`);

      const adContainerIds = pageType === 'details' 
        ? ['details-ads-section-1', 'details-ads-section-2', 'details-ads-section-3']
        : ['player-ads-section-2', 'player-ads-section-3', 'player-ads-section-4', 'player-special-ad-section'];

      // Randomly select an ad container
      const shuffled = [...adContainerIds].sort(() => Math.random() - 0.5);
      
      for (const containerId of shuffled) {
        console.log(`Checking container: ${containerId}`);
        
        const container = document.getElementById(containerId);
        if (!container) {
          console.log(`Container ${containerId} not found`);
          continue;
        }

        console.log(`Container found:`, {
          id: containerId,
          children: container.children.length,
          innerHTML: container.innerHTML.length > 0
        });

        try {
          const clickableElement = await findClickableAdElement(container);
          
          if (!clickableElement) {
            console.log(`No clickable element found in ${containerId}`);
            continue;
          }

          // Scroll element into view if needed
          const rect = clickableElement.getBoundingClientRect();
          if (rect.top < -100 || rect.bottom > window.innerHeight + 100) {
            console.log('Scrolling element into view...');
            try {
              clickableElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center',
                inline: 'center'
              });
              
              // Wait for scroll to complete
              await new Promise(resolve => setTimeout(resolve, 1000));
            } catch (e) {
              // Continue even if scroll fails
            }
          }

          // Perform the click
          const success = performClick(clickableElement);
          if (success) {
            console.log(`Successfully clicked ad in ${containerId}`);
            return true;
          }
        } catch (e) {
          console.log(`Error processing ${containerId}:`, e.message);
          continue;
        }
      }

      console.log('No clickable ads found in any container');
      return false;
    };

    const startAutoClickCycle = () => {
      console.log(`Initializing auto-click system for ${pageType} page`);
      
      // Initial delay to let page and ads load completely
      const initialDelay = 8000 + Math.random() * 4000; // 8-12 seconds
      
      clickTimer = setTimeout(async () => {
        console.log('Starting first auto-click attempt...');
        
        try {
          const success = await executeAutoClick();
          
          if (!success) {
            // Retry after 3 seconds if first attempt failed
            setTimeout(async () => {
              console.log('Retrying auto-click...');
              await executeAutoClick();
            }, 3000);
          }
        } catch (e) {
          console.log('Auto-click error:', e.message);
        }
        
        // Set up periodic clicking every 45-75 seconds
        const interval = setInterval(async () => {
          console.log('Periodic auto-click triggered');
          try {
            await executeAutoClick();
          } catch (e) {
            console.log('Periodic auto-click error:', e.message);
          }
        }, 45000 + Math.random() * 30000);
        
        // Store interval for cleanup
        clickTimer = interval;
        
      }, initialDelay);
    };

    // Start the auto-click system after component mounts
    const mountDelay = setTimeout(startAutoClickCycle, 2000);

    return () => {
      // Restore original console methods
      console.error = originalError;
      console.warn = originalWarn;
      
      clearTimeout(mountDelay);
      if (clickTimer) {
        clearTimeout(clickTimer);
        clearInterval(clickTimer);
      }
    };
  }, [pageType]);

  return null;
};

export default AutoClickAd;
