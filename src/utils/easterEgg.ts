export const EASTER_EGG_KEY = "easterEggUnlocked";
export const THEME_KEY = "CstarterKitTheme";

export const getEasterEggUnlocked = (): boolean => {
  return localStorage.getItem(EASTER_EGG_KEY) === "true";
};

export const setEasterEggUnlocked = (value: boolean): void => {
  localStorage.setItem(EASTER_EGG_KEY, String(value));
};

export const getStoredTheme = (): string | null => {
  return localStorage.getItem(THEME_KEY);
};

export const setStoredTheme = (theme: string): void => {
  localStorage.setItem(THEME_KEY, theme);
};

export const createTripleClickHandler = (
  onTripleClick: () => void,
  thresholdMs = 700,
): (() => void) => {
  let clicks = 0;
  let lastClick = 0;

  return () => {
    const now = Date.now();
    if (now - lastClick > thresholdMs) {
      clicks = 0;
    }
    clicks += 1;
    lastClick = now;

    if (clicks >= 3) {
      clicks = 0;
      onTripleClick();
    }
  };
};

type ConfettiParticle = {
  x: number;
  y: number;
  radius: number;
  color: string;
  velocityX: number;
  velocityY: number;
  rotation: number;
  rotationSpeed: number;
};

const COLORS = ["#7c3aed", "#06b6d4", "#f97316", "#22c55e", "#e11d48"];

export const fireConfetti = (canvas: HTMLCanvasElement, durationMs = 2000): void => {
  const context = canvas.getContext("2d");
  if (!context) {
    return;
  }

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  resizeCanvas();

  const particles: ConfettiParticle[] = Array.from({ length: 160 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height,
    radius: 4 + Math.random() * 4,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    velocityX: -1.5 + Math.random() * 3,
    velocityY: 2 + Math.random() * 4,
    rotation: Math.random() * Math.PI,
    rotationSpeed: -0.05 + Math.random() * 0.1,
  }));

  const startTime = performance.now();

  const draw = (time: number) => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.x += particle.velocityX;
      particle.y += particle.velocityY;
      particle.rotation += particle.rotationSpeed;

      if (particle.y - particle.radius > canvas.height) {
        particle.y = -particle.radius;
        particle.x = Math.random() * canvas.width;
      }

      context.save();
      context.translate(particle.x, particle.y);
      context.rotate(particle.rotation);
      context.fillStyle = particle.color;
      context.fillRect(-particle.radius / 2, -particle.radius / 2, particle.radius, particle.radius * 2);
      context.restore();
    });

    if (time - startTime < durationMs) {
      requestAnimationFrame(draw);
    } else {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  requestAnimationFrame(draw);
};
