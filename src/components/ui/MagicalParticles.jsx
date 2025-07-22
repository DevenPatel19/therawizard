import React, { useEffect, useRef } from "react";

const MagicalParticles = ({ flySpell }) => {
  const canvasRef = useRef(null);
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      dx: Math.random() * 0.5 - 0.25,
      dy: Math.random() * 0.5 - 0.25,
      opacity: Math.random(),
    });

    particles.current = Array.from({ length: 100 }, createParticle);

    // Flying spell particle data
    let flyingParticle = null;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Animate regular particles
      particles.current.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(173, 216, 230, ${p.opacity})`; // Light blue
        ctx.fill();
      });

      // Animate flying spell if present
      if (flyingParticle) {
        flyingParticle.x += flyingParticle.dx;
        flyingParticle.y += flyingParticle.dy;
        flyingParticle.radius *= 0.98; // shrink gradually
        flyingParticle.opacity *= 0.95; // fade gradually

        ctx.beginPath();
        ctx.arc(
          flyingParticle.x,
          flyingParticle.y,
          flyingParticle.radius,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 215, 0, ${flyingParticle.opacity})`; // gold
        ctx.shadowColor = "gold";
        ctx.shadowBlur = 15;
        ctx.fill();

        // If too small or transparent, remove flying particle
        if (flyingParticle.radius < 0.5 || flyingParticle.opacity < 0.1) {
          flyingParticle = null;
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    // Listen for flySpell prop changes to trigger flying particle
    if (flySpell && flySpell.position) {
      flyingParticle = {
        x: flySpell.position.x,
        y: flySpell.position.y,
        radius: 15,
        dx: 0,
        dy: -3, // flying upwards
        opacity: 1,
      };
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [flySpell]); // re-run when flySpell changes

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
};

export default MagicalParticles;
