export function fadeUpImage(t) {
  gsap.killTweensOf(t);

  gsap.fromTo(
    t,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power2.out',
    }
  );
}
