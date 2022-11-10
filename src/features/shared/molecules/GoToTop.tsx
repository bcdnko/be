import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from './GoToTop.module.scss';

function isSmallBreakpoint(): boolean {
  const query = window.matchMedia('(max-width: 576px)');
  return query.matches;
}

export function GoToTop() {
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [isSmall, setIsSmall] = useState<boolean>(isSmallBreakpoint());
  const ref = useRef<HTMLDivElement>(null);

  const el = isSmall ? window : ref.current?.parentElement;

  const handleResize = () => {
    setIsSmall(isSmallBreakpoint());
  };

  const handleScroll = useCallback(() => {
    if (!el) {
      return;
    }

    const val = (el instanceof Window ? window.scrollY : el.scrollTop) || 0;
    setIsHidden(val < 300);
  }, [el]);

  useLayoutEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    el && el.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      el && el.removeEventListener('scroll', handleScroll);
    };
  }, [el, handleScroll]);

  return (
    <div
      ref={ref}
      className={styles.wrapper}
    >
      {!isHidden &&
        <button
          className="btn btn-light"
          onClick={() => el && el.scrollTo(0,0)}
        >Go to the top ↑</button>
      }
    </div>
  );
}
