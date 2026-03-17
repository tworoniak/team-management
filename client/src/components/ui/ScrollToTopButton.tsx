// import type { RefObject } from 'react';
import { useScrollPosition } from '../../hooks/useScrollPosition';
// import { useElementInView } from '../../hooks/useElementInView';
import { ArrowUp } from 'lucide-react';

// type ScrollToTopButtonProps = {
//   footerRef?: RefObject<HTMLElement | null>;
// };

// const ScrollToTopButton = ({ footerRef }: ScrollToTopButtonProps) => {
//   const isVisible = useScrollPosition(300);
//   const isFooterVisible = useElementInView(footerRef);

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   };

//   return (
//     <button
//       onClick={scrollToTop}
//       className={[
//         styles.scrollToTop,
//         isVisible ? styles.show : '',
//         isFooterVisible ? styles.footerVisible : '',
//       ].join(' ')}
//       aria-label='Scroll to top'
//     >
//       <ArrowUp size={24} />
//     </button>
//   );
// };

// export default ScrollToTopButton;

const ScrollToTopButton = () => {
  const isVisible = useScrollPosition(300);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`scroll-to-top flex items-center justify-center fixed bottom-16 right-4 w-10 h-10 rounded-full cursor-pointer border border-white/60 z-100 bg-blue-500 text-white hover:-translate-y-1 transition duration-300  ${isVisible ? 'opacity-1 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      aria-label='Scroll to top'
    >
      <ArrowUp size={20} />
    </button>
  );
};

export default ScrollToTopButton;
