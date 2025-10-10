import { useEffect, useState } from 'react';

export const useImagePreloader = (imageList: string[]) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const preloadImages = imageList.map((src) => {
      const img = new Image();
      img.src = src;
      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    });

    Promise.all(preloadImages).then(() => setLoaded(true));
  }, [imageList]);

  return { loaded };
};