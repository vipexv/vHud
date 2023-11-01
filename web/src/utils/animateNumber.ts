export const animateNumber = (element: any, newValue: any, symbol = "") => {
  const oldValue = parseInt(element.textContent, 10);

  if (oldValue === newValue) {
    return;
  }

  const duration = 500;
  const start = performance.now();

  requestAnimationFrame(function animate(currentTime) {
    const elapsedTime = currentTime - start;
    const progress = Math.min(elapsedTime / duration, 1);
    const currentValue = Math.floor(
      oldValue + (newValue - oldValue) * progress
    );

    element.textContent = `${currentValue}${symbol}`;

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  });
};
