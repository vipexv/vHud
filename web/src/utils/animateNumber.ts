import { SettingsInterface } from "@/App";

export const animateNumber = (
  element: any,
  newValue: any,
  symbol = "",
  settings: SettingsInterface
) => {
  const oldValue = parseInt(element.textContent, 10);

  if (oldValue === newValue) return;

  let duration = settings.resourceUsage
    ? settings.resourceUsage === "2"
      ? 1000
      : 100
    : 1000;

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
