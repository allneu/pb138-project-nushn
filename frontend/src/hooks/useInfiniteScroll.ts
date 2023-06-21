// hooks/useInfiniteScroll.js
import { useEffect, useRef, useState } from 'react';

const useInfiniteScroll = (initialCount: number) => {
  const [count, setCount] = useState(initialCount);
  const loader = useRef(null); // Reference to the 'Load more' button.

  // Handle the intersection.
  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setCount((prevCount: number) => prevCount + 5);
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };

    // Create an observer instance.
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }

    // Cleanup on unmount.
    return () => {
      observer.disconnect();
    };
  }, []);

  return [count, loader];
};

export default useInfiniteScroll;
