"use client";

import React, { useEffect, useRef, useState } from "react";

type LazyLoadingProps = {
  children: React.ReactNode;
  rootMargin?: string; 
};

const LazyLoading = ({ children, rootMargin = "0px" }: LazyLoadingProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin,
        threshold: 0.1,
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return <div ref={ref}>{isVisible ? children : null}</div>;
};

export default LazyLoading;
