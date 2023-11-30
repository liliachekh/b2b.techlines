const animateOnScroll = (amount) => ({
  initial: "hidden",
  whileInView: "visible",
  viewport: { amount: amount, once: true },
})

export const animateFromBottom = (custom, amount = 0.5) => ({
  ...animateOnScroll(amount),
  variants: {
    hidden: {
      y: 100,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, delay: custom * 0.2 }
    },
  },
})

export const animateFromLeft = (custom, amount = 0.5) => ({
  ...animateOnScroll(amount),
  variants: {
    hidden: {
      x: -100,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, delay: custom * 0.2 }
    },
  },
})

export const animateFromRight = (custom, amount = 0.5) => ({
  ...animateOnScroll(amount),
  variants: {
    hidden: {
      x: 100,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, delay: custom * 0.2 }
    },
  },
})

export const animateBackToTop = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0, transition: { duration: 0.6 } }
};

export const animateFromTop = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
};

export const animateMobileMenu = {
  initial: { right: '-60%' },
  animate: { right: 0, transition: { duration: 0.3 } },
  exit: { right: '-60%', transition: { duration: 0.3} }
};

export const animateModal = {
  initial: { opacity: 0, scale: 0.8, x: "-50%", y: "-50%" },
  animate: { opacity: 1, scale: 1, x: "-50%", y: "-50%", transition: { delay: 0.1, duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.8, x: "-50%", y: "-50%", transition: { delay: 0.2, duration: 0.5, ease: "easeIn" } }
};
// export const animateModal = {
//   initial: { scale: 0 },
//   animate: { scale: 1, transition: { duration: 0.3 } },
//   exit: { scale: 0, transition: { duration: 0.3} }
// };