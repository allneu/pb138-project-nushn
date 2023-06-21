import { useEffect, useRef } from 'react';

type UseInfiniteScrollProps = {
  setCount: React.Dispatch<React.SetStateAction<number>>,
  hasMore: boolean,
};

const useInfiniteScroll = ({ setCount, hasMore }: UseInfiniteScrollProps) => {
  const loader = useRef(null);

  useEffect(() => {
    const currentLoader = loader.current;

    if (!hasMore) {
      return () => {};
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0] !== undefined && entries[0].isIntersecting) {
          setCount((prevCount) => prevCount + 5);
        }
      },
      { threshold: 1 },
    );

    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [setCount, hasMore]);

  return loader;
};

export default useInfiniteScroll;
