import React, { useRef, useEffect } from 'react';

const MagicalParticles = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const explosions = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      dx: Math.random() * 0.5 - 0.25,
      dy: Math.random() * 0.5 - 0.25,
      opacity: Math.random() * 0.5 + 0.5, // range: 0.5–1
    });

    const createExplosion = (x, y) => {
      const count = 40;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        explosions.current.push({
          x,
          y,
          radius: Math.random() * 2 + 1,
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed,
          opacity: 1,
        });
      }
    };

    particles.current = Array.from({ length: 120 }, createParticle);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Floating gold particles
      particles.current.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 215, 0, ${p.opacity})`; // gold
        ctx.fill();
      });

      // Click explosion particles
      explosions.current.forEach((p, index) => {
        p.x += p.dx;
        p.y += p.dy;
        p.opacity -= 0.02;

        if (p.opacity <= 0) {
          explosions.current.splice(index, 1);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 105, 180, ${p.opacity})`; // hot pink
          ctx.fill();
        }
      });

      requestAnimationFrame(animate);
    };

    // Handle click explosion
    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      createExplosion(e.clientX - rect.left, e.clientY - rect.top);
    };

    canvas.addEventListener('click', handleClick);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto', // needed for click events
      }}
    />
  );
};

export default MagicalParticles;
