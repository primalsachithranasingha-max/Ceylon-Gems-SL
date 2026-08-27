/**
 * Ceylon Gems SL - Ambient Canvas Shimmer & Gem Facet Light Particle Engine
 */

class GemShimmerFX {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.sparkles = [];
    this.width = 0;
    this.height = 0;
    this.mouse = { x: null, y: null, radius: 150 };
    this.animationFrameId = null;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });

    this.createParticles();
    this.animate();
  }

  resize() {
    this.width = this.canvas.parentElement.clientWidth || window.innerWidth;
    this.height = this.canvas.parentElement.clientHeight || window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  createParticles() {
    const particleCount = Math.min(Math.floor(this.width * 0.04), 60);
    this.particles = [];
    this.sparkles = [];

    // Ambient floating gold / sapphire crystal dust
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 2 + 0.8,
        color: Math.random() > 0.4 ? 'rgba(212, 175, 55, ' : 'rgba(74, 144, 226, ',
        baseAlpha: Math.random() * 0.5 + 0.1,
        alpha: 0.1,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        pulseVal: Math.random() * Math.PI
      });
    }

    // Occasional 4-point diamond glints
    for (let j = 0; j < 12; j++) {
      this.sparkles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 6 + 4,
        opacity: 0,
        targetOpacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.015 + 0.008,
        rot: Math.random() * Math.PI,
        timer: Math.random() * 200
      });
    }
  }

  drawDiamondGlint(ctx, x, y, size, opacity, rot) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.fillStyle = `rgba(255, 248, 220, ${opacity})`;
    ctx.shadowBlur = 12;
    ctx.shadowColor = 'rgba(212, 175, 55, 0.8)';

    // Vertical spike
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.quadraticCurveTo(size * 0.15, 0, size * 0.1, 0);
    ctx.quadraticCurveTo(0, 0, 0, size);
    ctx.quadraticCurveTo(0, 0, -size * 0.1, 0);
    ctx.quadraticCurveTo(-size * 0.15, 0, 0, -size);
    ctx.fill();

    // Horizontal spike
    ctx.beginPath();
    ctx.moveTo(-size, 0);
    ctx.quadraticCurveTo(0, size * 0.15, 0, size * 0.1);
    ctx.quadraticCurveTo(0, 0, size, 0);
    ctx.quadraticCurveTo(0, 0, 0, -size * 0.1);
    ctx.quadraticCurveTo(0, -size * 0.15, -size, 0);
    ctx.fill();

    // Center flare
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.25, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 1.2})`;
    ctx.fill();

    ctx.restore();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw floating crystal dust
    for (let p of this.particles) {
      p.pulseVal += p.pulseSpeed;
      p.alpha = p.baseAlpha + Math.sin(p.pulseVal) * 0.25;
      if (p.alpha < 0.05) p.alpha = 0.05;

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      if (p.y > this.height) p.y = 0;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color + p.alpha + ')';
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = p.color + '0.7)';
      this.ctx.fill();
    }

    // Draw diamond glints
    for (let s of this.sparkles) {
      s.timer++;
      s.rot += 0.005;
      s.opacity = Math.abs(Math.sin(s.timer * s.speed)) * s.targetOpacity;

      if (s.opacity > 0.05) {
        this.drawDiamondGlint(this.ctx, s.x, s.y, s.size, s.opacity, s.rot);
      }

      // Relocate sparkle when cycle completes
      if (s.timer % 300 === 0) {
        s.x = Math.random() * this.width;
        s.y = Math.random() * this.height;
      }
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('heroShimmerCanvas')) {
    new GemShimmerFX('heroShimmerCanvas');
  }
});
