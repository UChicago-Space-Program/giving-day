(function () {
  var bar = document.querySelector('.progress-bar');
  var fill = document.getElementById('progress-fill');
  if (!bar || !fill) return;

  var canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;pointer-events:none;';
  bar.style.position = 'relative';
  bar.appendChild(canvas);

  var ctx = canvas.getContext('2d');
  var particles = [];
  var COUNT = 32;

  function resize() {
    canvas.width = bar.offsetWidth;
    canvas.height = bar.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function Particle() {}
  Particle.prototype.init = function (fillW) {
    var spread = Math.min(fillW, 70);
    this.x = fillW - Math.random() * spread;
    this.y = canvas.height * (0.15 + Math.random() * 0.7);
    this.vx = 0.4 + Math.random() * 1.4;
    this.vy = (Math.random() - 0.5) * 0.35;
    this.life = 0;
    this.maxLife = 28 + Math.random() * 52;
    this.r = 0.5 + Math.random() * 1.2;
  };
  Particle.prototype.update = function (fillW) {
    this.x += this.vx;
    this.y += this.vy;
    this.life++;
    if (this.life > this.maxLife || this.x > fillW + 5) this.init(fillW);
  };
  Particle.prototype.draw = function () {
    var t = this.life / this.maxLife;
    var a = t < 0.25 ? t / 0.25 : Math.pow(1 - t, 1.2);
    ctx.globalAlpha = a * 0.85;
    ctx.fillStyle = t < 0.35 ? '#ffffff' : '#ffc840';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
  };

  var initialized = false;

  function initParticles(fillW) {
    for (var i = 0; i < COUNT; i++) {
      var p = new Particle();
      p.init(fillW);
      p.life = Math.floor(Math.random() * p.maxLife);
      particles.push(p);
    }
    initialized = true;
  }

  function clipToFill(fillW) {
    var h = canvas.height;
    var r = Math.min(5, fillW / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(fillW - r, 0);
    ctx.arcTo(fillW, 0, fillW, r, r);
    ctx.arcTo(fillW, h, fillW - r, h, r);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.clip();
  }

  function animate() {
    requestAnimationFrame(animate);
    var fillW = fill.offsetWidth;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (fillW < 2) return;
    if (!initialized) initParticles(fillW);
    ctx.save();
    clipToFill(fillW);
    ctx.globalCompositeOperation = 'lighter';
    for (var i = 0; i < particles.length; i++) {
      particles[i].update(fillW);
      particles[i].draw();
    }
    ctx.restore();
    ctx.globalAlpha = 1;
  }

  animate();
})();
