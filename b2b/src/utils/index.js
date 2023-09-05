export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const scrollToRef = (ref) => {
  ref.current.scrollIntoView({ block: "start", behavior: "smooth" })
};