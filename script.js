class PhoneSlider {
    constructor() {
        this.wrapper = document.getElementById('pagesWrapper');
        this.dots = document.querySelectorAll('.dot');
        this.currentPage = 0;
        this.totalPages = 3;
        this.isTransitioning = false;
        this.startX = 0;
        this.currentX = 0;
        this.isDragging = false;
        this.threshold = 50; // 滑动阈值（像素）

        this.init();
    }

    init() {
        // 鼠标事件
        this.wrapper.addEventListener('mousedown', (e) => this.handleStart(e));
        document.addEventListener('mousemove', (e) => this.handleMove(e));
        document.addEventListener('mouseup', (e) => this.handleEnd(e));

        // 触摸事件
        this.wrapper.addEventListener('touchstart', (e) => this.handleStart(e));
        document.addEventListener('touchmove', (e) => this.handleMove(e), { passive: false });
        document.addEventListener('touchend', (e) => this.handleEnd(e));

        // 点击指示点
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToPage(index));
        });

        // 键盘导航
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.nextPage();
            if (e.key === 'ArrowRight') this.prevPage();
        });
    }

    getX(e) {
        return e.touches ? e.touches[0].clientX : e.clientX;
    }

    handleStart(e) {
        if (this.isTransitioning) return;
        this.isDragging = true;
        this.startX = this.getX(e);
        this.currentX = this.startX;
        this.wrapper.classList.add('grabbing');
        this.wrapper.style.transition = 'none';
    }

    handleMove(e) {
        if (!this.isDragging) return;
        
        this.currentX = this.getX(e);
        const diff = this.currentX - this.startX;
        const offset = -this.currentPage * 100 + (diff / this.wrapper.offsetWidth) * 100;
        
        this.wrapper.style.transform = `translateX(${offset}%)`;
    }

    handleEnd(e) {
        if (!this.isDragging) return;
        this.isDragging = false;
        this.wrapper.classList.remove('grabbing');

        const diff = this.currentX - this.startX;
        const distance = Math.abs(diff);

        this.wrapper.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

        if (distance > this.threshold) {
            if (diff > 0) {
                this.prevPage();
            } else {
                this.nextPage();
            }
        } else {
            this.updatePosition();
        }
    }

    nextPage() {
        if (this.currentPage < this.totalPages - 1) {
            this.currentPage++;
            this.updatePosition();
        } else {
            // 循环回到第一页
            this.currentPage = 0;
            this.updatePosition();
        }
    }

    prevPage() {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.updatePosition();
        } else {
            // 循环到最后一页
            this.currentPage = this.totalPages - 1;
            this.updatePosition();
        }
    }

    goToPage(index) {
        this.currentPage = index;
        this.updatePosition();
    }

    updatePosition() {
        this.isTransitioning = true;
        this.wrapper.style.transform = `translateX(-${this.currentPage * 100}%)`;
        
        // 更新指示点
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentPage);
        });

        setTimeout(() => {
            this.isTransitioning = false;
        }, 300);
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    new PhoneSlider();
});
