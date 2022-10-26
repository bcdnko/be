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
            bottom: '30px',
            right: '-5px',
            transition: 'opacity .2s linear',
            opacity: 1,
            width: '100px',
          }}
          onClick={() => window.scrollTo(0,0)}
        >Go to the Top ↑</button>
      }
    </>
  );
}
