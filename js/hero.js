(function () {
  var canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = canvas.offsetWidth * devicePixelRatio;
    canvas.height = canvas.offsetHeight * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
  }
  resize();
  window.addEventListener("resize", resize);

  var w = function () { return canvas.offsetWidth; };
  var h = function () { return canvas.offsetHeight; };

  // Floating shapes
  var shapes = [];
  var count = 18;

  function rand(min, max) { return Math.random() * (max - min) + min; }

  for (var i = 0; i < count; i++) {
    shapes.push({
      x: rand(0, 1),
      y: rand(0, 1),
      size: rand(8, 40),
      speedX: rand(-0.08, 0.08),
      speedY: rand(-0.06, 0.06),
      opacity: rand(0.03, 0.1),
      rotation: rand(0, Math.PI * 2),
      rotSpeed: rand(-0.005, 0.005),
      type: Math.floor(rand(0, 3)) // 0=circle, 1=square, 2=triangle
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w(), h());

    for (var i = 0; i < shapes.length; i++) {
      var s = shapes[i];

      // Update position
      s.x += s.speedX / w();
      s.y += s.speedY / h();
      s.rotation += s.rotSpeed;

      // Wrap around
      if (s.x < -0.05) s.x = 1.05;
      if (s.x > 1.05) s.x = -0.05;
      if (s.y < -0.05) s.y = 1.05;
      if (s.y > 1.05) s.y = -0.05;

      var px = s.x * w();
      var py = s.y * h();

      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(s.rotation);
      ctx.globalAlpha = s.opacity;
      ctx.fillStyle = "#ffffff";

      if (s.type === 0) {
        // Circle
        ctx.beginPath();
        ctx.arc(0, 0, s.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (s.type === 1) {
        // Square
        ctx.fillRect(-s.size, -s.size, s.size * 2, s.size * 2);
      } else {
        // Triangle
        ctx.beginPath();
        ctx.moveTo(0, -s.size);
        ctx.lineTo(s.size, s.size);
        ctx.lineTo(-s.size, s.size);
        ctx.closePath();
        ctx.fill();
      }

      ctx.restore();
    }

    // Draw subtle connecting lines between nearby shapes
    ctx.globalAlpha = 1;
    for (var a = 0; a < shapes.length; a++) {
      for (var b = a + 1; b < shapes.length; b++) {
        var ax = shapes[a].x * w(), ay = shapes[a].y * h();
        var bx = shapes[b].x * w(), by = shapes[b].y * h();
        var dist = Math.sqrt((ax - bx) * (ax - bx) + (ay - by) * (ay - by));
        var maxDist = 180;
        if (dist < maxDist) {
          ctx.strokeStyle = "rgba(255,255,255," + (0.04 * (1 - dist / maxDist)) + ")";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  draw();
})();
