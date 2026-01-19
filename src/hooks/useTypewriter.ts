import { useState, useEffect, useCallback } from 'react';

interface UseTypewriterOptions {
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

export function useTypewriter(text: string, options: UseTypewriterOptions = {}) {
  const { speed = 30, delay = 0, onComplete } = options;
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setIsComplete(false);
    setIsTyping(false);

    const startTimeout = setTimeout(() => {
      setIsTyping(true);
      let i = 0;

      const typeInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, delay, onComplete]);

  const reset = useCallback(() => {
    setDisplayedText('');
    setIsComplete(false);
    setIsTyping(false);
  }, []);

  return { displayedText, isTyping, isComplete, reset };
}

export function useStagedReveal<T>(items: T[], delayMs = 300) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    setVisibleCount(0);
  }, [items]);

  useEffect(() => {
    if (visibleCount < items.length) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, delayMs);
      return () => clearTimeout(timer);
    }
  }, [visibleCount, items.length, delayMs]);

  return items.slice(0, visibleCount);
}
