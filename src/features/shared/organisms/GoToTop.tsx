import { useEffect, useState } from "react";

export function GoToTop() {
  const [isHidden, setIsHidden] = useState(true);

  const handleScroll = () => {
    setIsHidden(window.scrollY < 300);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {!isHidden &&
        <button
          className="btn btn-light"
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '-0.4rem',
            transition: 'opacity .2s linear',
            opacity: 1,
            width: '6rem',
          }}
          onClick={() => window.scrollTo(0,0)}
        >Go to the top ↑</button>
      }
    </>
  );
}
