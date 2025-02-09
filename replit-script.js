// ... never again
function setContainerHeights() {
    document.querySelectorAll('.background-container').forEach(container => {
      const svg = container.querySelector('.scalable-svg');
      
      // Safari-specific workaround
      const forceReflow = container.offsetHeight;
      console.log("Svg: ", svg.src);
      
      if (svg.tagName === 'IMG') {
        const img = new Image();
        img.src = svg.src;
        
        img.onload = () => {
          const aspectRatio = img.naturalHeight / img.naturalWidth;
          console.log(img.naturalHeight, "/", img.naturalWidth, " = ", aspectRatio);
          const containerWidth = container.getBoundingClientRect().width;
          console.log("containerWidth: ", containerWidth);
          container.style.height = `${containerWidth * aspectRatio}px`;
          
        };
      } 
      else if (svg.tagName === 'svg') {
        // Handle inline SVGs
        const viewBox = svg.viewBox.animVal; // More reliable than getAttribute
        console.log(viewBox.height, "/ ", viewBox.width);
        const aspectRatio = viewBox.height / viewBox.width;
        console.log("= ", aspectRatio);
        
        // Use ResizeObserver for Safari layout stability
        const resizeObserver = new ResizeObserver(entries => {
          const containerWidth = entries[0].contentRect.width;
          container.style.height = `${containerWidth * aspectRatio}px`;
          console.log(container.style.height);
        });
        
        resizeObserver.observe(container);
      }
      else if (window.getComputedStyle(svg).backgroundImage) {
        // Handle background-image SVGs
        const img = new Image();
        img.src = window.getComputedStyle(svg).backgroundImage
          .replace(/url\((['"])?(.*?)\1\)/gi, '$2');
        
        img.onload = () => {
          const aspectRatio = img.naturalHeight / img.naturalWidth;
          console.log("AspectRatio: ", aspectRatio);
          const containerWidth = container.offsetWidth;
          
          // Safari requires explicit invalidation
          container.style.height = 'auto';
          requestAnimationFrame(() => {
            container.style.height = `${containerWidth * aspectRatio}px`;
          });
        };
      }
    });
  }
  
  // Improved event listeners
  window.addEventListener('load', () => {
    setTimeout(setContainerHeights, 300); // Allow layout stabilization
  });
  
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(setContainerHeights, 150);
  });
  
  // Initialize for iOS Safari
  document.addEventListener('DOMContentLoaded', () => {
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      requestAnimationFrame(() => {
        setContainerHeights();
        window.scrollTo(0, 0); // Reset scroll position
      });
    }
  });
  