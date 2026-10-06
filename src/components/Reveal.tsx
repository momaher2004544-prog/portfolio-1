'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  variant?: 'spread' | 'fade-up';
  className?: string;
  as?: ElementType;
  delay?: number;
  style?: React.CSSProperties;
}

export default function Reveal({
  children,
  variant = 'fade-up',
  className = '',
  as: Tag = 'div',
  delay = 0,
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<'idle' | 'in' | 'past'>('idle');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.top < vh * 0.85 && rect.bottom > 0) setState((s) => (s === 'in' ? s : 'in'));
      else if (rect.bottom <= 0) setState('past');
      else setState('idle');
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const classes = [
    variant === 'spread' ? 'spread' : 'fade-up',
    state === 'in' ? 'is-in' : '',
    state === 'past' ? 'is-past' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag
      ref={ref}
      className={classes}
      style={delay || style ? ({ transitionDelay: delay ? `${delay}ms` : undefined, ...style } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
