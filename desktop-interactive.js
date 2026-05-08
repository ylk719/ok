/**
 * 好好柯的桌面 - 交互动效脚本
 * 功能：柔和动效、点击反馈、悬浮动画、粒子装饰
 * 风格：少女温柔风、渐变光影、轻微粒子飘落
 */

class DesktopInteractive {
  constructor() {
    this.phoneScreen = document.querySelector('.phone-screen');
    this.init();
  }

  /**
   * 初始化所有交互功能
   */
  init() {
    this.setupIconInteractions();
    this.setupHoverEffects();
    this.startParticleAnimation();
    this.initCountdownAnimation();
    this.setupProfileCardAnimation();
  }

  /**
   * 设置图标点击反馈
   * 包括应用图标和Dock栏图标
   */
  setupIconInteractions() {
    const icons = document.querySelectorAll('.app-icon, .dock-icon');
    
    icons.forEach((icon) => {
      // 鼠标按下效果
      icon.addEventListener('mousedown', () => {
        this.createClickRipple(icon);
        icon.style.transform = 'scale(0.92)';
      });

      // 鼠标抬起恢复
      icon.addEventListener('mouseup', () => {
        icon.style.transform = '';
      });

      // 鼠标离开恢复
      icon.addEventListener('mouseleave', () => {
        icon.style.transform = '';
      });

      // 触摸设备支持
      icon.addEventListener('touchstart', () => {
        this.createClickRipple(icon);
        icon.style.transform = 'scale(0.92)';
      });

      icon.addEventListener('touchend', () => {
        icon.style.transform = '';
      });
    });
  }

  /**
   * 创建点击涟漪效果
   * @param {Element} element - 目标元素
   */
  createClickRipple(element) {
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.cssText = `
      position: absolute;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%);
      border-radius: inherit;
      pointer-events: none;
      animation: rippleEffect 0.6s ease-out;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  }

  /**
   * 设置悬浮动画效果
   * 为卡片和图标添加轻微的浮动感
   */
  setupHoverEffects() {
    // 个人信息卡片悬浮
    const profileCard = document.querySelector('.profile-card');
    if (profileCard) {
      profileCard.addEventListener('mouseenter', () => {
        profileCard.style.transform = 'translateY(-8px)';
        profileCard.style.boxShadow = '0 15px 35px rgba(100, 200, 255, 0.15)';
      });

      profileCard.addEventListener('mouseleave', () => {
        profileCard.style.transform = '';
        profileCard.style.boxShadow = '';
      });
    }

    // 爱情纪念卡片悬浮
    const loveWidget = document.querySelector('.love-widget');
    if (loveWidget) {
      loveWidget.addEventListener('mouseenter', () => {
        loveWidget.style.transform = 'translateY(-5px)';
        loveWidget.style.boxShadow = '0 8px 25px rgba(255, 107, 157, 0.12)';
      });

      loveWidget.addEventListener('mouseleave', () => {
        loveWidget.style.transform = '';
        loveWidget.style.boxShadow = '';
      });
    }

    // 应用图标悬浮
    const appIcons = document.querySelectorAll('.app-icon');
    appIcons.forEach((icon) => {
      icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'translateY(-6px) scale(1.02)';
        icon.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)';
      });

      icon.addEventListener('mouseleave', () => {
        icon.style.transform = '';
        icon.style.boxShadow = '';
      });
    });

    // Dock栏图标悬浮
    const dockIcons = document.querySelectorAll('.dock-icon');
    dockIcons.forEach((icon) => {
      icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.15) translateY(-8px)';
      });

      icon.addEventListener('mouseleave', () => {
        icon.style.transform = '';
      });
    });
  }

  /**
   * 启动粒子动画系统
   * 创建柔和的粒子飘落效果
   */
  startParticleAnimation() {
    // 创建粒子容器
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      overflow: hidden;
    `;
    this.phoneScreen.appendChild(particleContainer);

    // 定期生成粒子
    setInterval(() => {
      this.createParticle(particleContainer);
    }, 1200);

    // 初始生成几个粒子
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        this.createParticle(particleContainer);
      }, i * 400);
    }
  }

  /**
   * 创建单个粒子
   * @param {Element} container - 粒子容器
   */
  createParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2;
    const duration = Math.random() * 4 + 5;
    const delay = Math.random() * 0.5;
    const startX = Math.random() * 100;
    const opacity = Math.random() * 0.4 + 0.2;

    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle, rgba(255, 200, 224, ${opacity}), rgba(255, 200, 224, 0));
      border-radius: 50%;
      left: ${startX}%;
      top: -10px;
      box-shadow: 0 0 ${size * 2}px rgba(255, 200, 224, ${opacity * 0.6});
      animation: particleFloat ${duration}s linear ${delay}s forwards;
    `;

    container.appendChild(particle);

    // 清理已完成的粒子
    setTimeout(() => {
      particle.remove();
    }, (duration + delay) * 1000);
  }

  /**
   * 初始化倒计时动画
   * 为爱情纪念天数添加脉动效果
   */
  initCountdownAnimation() {
    const daysElement = document.querySelector('.days');
    if (daysElement) {
      // 添加脉动动画
      daysElement.style.animation = 'gentlePulse 3s ease-in-out infinite';
      
      // 定期更新天数（可选）
      this.updateCountdown();
    }
  }

  /**
   * 更新倒计时天数
   * 计算从指定日期到现在的天数
   */
  updateCountdown() {
    const startDate = new Date('2026-05-02');
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const daysElement = document.querySelector('.days');
    if (daysElement) {
      const numberPart = daysElement.querySelector('span');
      if (numberPart) {
        daysElement.textContent = diffDays;
        daysElement.appendChild(numberPart);
      }
    }
  }

  /**
   * 设置个人信息卡片的初始动画
   * 页面加载时的淡入效果
   */
  setupProfileCardAnimation() {
    const profileCard = document.querySelector('.profile-card');
    const avatar = document.querySelector('.avatar');
    
    if (profileCard) {
      profileCard.style.animation = 'fadeInUp 0.8s ease-out';
    }

    if (avatar) {
      avatar.style.animation = 'scaleIn 0.8s ease-out 0.2s both';
    }

    // 为各个文本元素添加错落的淡入效果
    const textElements = document.querySelectorAll('.nickname, .id, .bio, .location');
    textElements.forEach((el, index) => {
      el.style.animation = `fadeInUp 0.6s ease-out ${0.3 + index * 0.1}s both`;
    });
  }
}

/**
 * 页面加载完成后初始化
 */
document.addEventListener('DOMContentLoaded', () => {
  new DesktopInteractive();
});

/**
 * 添加CSS动画定义
 * 这些动画通过JavaScript注入，避免与原有CSS冲突
 */
const style = document.createElement('style');
style.textContent = `
  /* 涟漪效果动画 */
  @keyframes rippleEffect {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }

  /* 粒子飘落动画 */
  @keyframes particleFloat {
    0% {
      transform: translateY(0) translateX(0);
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      transform: translateY(812px) translateX(${Math.random() * 40 - 20}px);
      opacity: 0;
    }
  }

  /* 温柔脉动效果 */
  @keyframes gentlePulse {
    0%, 100% {
      transform: scale(1);
      text-shadow: 0 0 0 rgba(255, 107, 157, 0);
    }
    50% {
      transform: scale(1.05);
      text-shadow: 0 0 15px rgba(255, 107, 157, 0.3);
    }
  }

  /* 淡入上升动画 */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* 缩放进入动画 */
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  /* 平滑过渡 */
  .app-icon,
  .dock-icon,
  .profile-card,
  .love-widget {
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* 移动设备优化 */
  @media (max-width: 768px) {
    .app-icon,
    .dock-icon {
      transition: all 0.2s ease-out;
    }
  }
`;
document.head.appendChild(style);
