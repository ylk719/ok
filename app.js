(function() {
  var box = document.getElementById('scrollBox');
  var dots = document.querySelectorAll('.dot');

  // 监听滚动，更新指示器
  box.addEventListener('scroll', function() {
    var scrollLeft = box.scrollLeft;
    var pageWidth = box.offsetWidth;
    var page = Math.round(scrollLeft / pageWidth);
    page = Math.max(0, Math.min(2, page));
    dots.forEach(function(d, i) { d.classList.toggle('active', i === page); });
  });

  // 点击圆点跳转
  dots.forEach(function(dot, i) {
    dot.addEventListener('click', function() {
      box.scrollTo({ left: i * box.offsetWidth, behavior: 'smooth' });
    });
  });

  // 点击反馈
  document.querySelectorAll('.app-icon, .dock-icon, .app-item').forEach(function(el) {
    el.addEventListener('click', function() {
      this.style.transform = 'scale(0.92)';
      setTimeout(function() { el.style.transform = ''; }, 120);
    });
  });

  // 时钟
  function updateClock() {
    var now = new Date();
    var h = String(now.getHours()).padStart(2, '0');
    var m = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('clock').textContent = h + ':' + m;
  }
  updateClock();
  setInterval(updateClock, 60000);
})();
