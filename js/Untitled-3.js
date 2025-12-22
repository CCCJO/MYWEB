// JavaScript Document
document.addEventListener('DOMContentLoaded', function() {
    // ============== 轮播逻辑（无缝平滑） ==============
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        const inner = carousel.querySelector('.carousel-inner');
        const items = carousel.querySelectorAll('.carousel-item');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');

        const realTotal = items.length - 1; // 真实项数量（不含复制的那一张）
        let currentIndex = 0;
        const intervalTime = 4000;
        let timer = setInterval(next, intervalTime);
        let isAnimating = false;

        // 切换到指定索引
        function goToIndex(index) {
            if (isAnimating) return;
            isAnimating = true;

            // 右边界：最后一张 → 复制的第一张 → 瞬间回 0
            if (index > realTotal) {
                inner.style.transition = 'transform 0.5s ease';
                inner.style.transform = `translateX(-${index * 100}%)`;
                setTimeout(() => {
                    inner.style.transition = 'none';
                    inner.style.transform = 'translateX(0)';
                    currentIndex = 0;
                    isAnimating = false;
                }, 500);
                return;
            }

            // 左边界：0 → 瞬间跳到 realTotal（复制的前一张）
            if (index < 0) {
                inner.style.transition = 'none';
                inner.style.transform = `translateX(-${realTotal * 100}%)`;
                setTimeout(() => {
                    inner.style.transition = 'transform 0.5s ease';
                    inner.style.transform = `translateX(-${(realTotal - 1) * 100}%)`;
                    currentIndex = realTotal - 1;
                    isAnimating = false;
                }, 50);
                return;
            }

            // 正常情况
            inner.style.transition = 'transform 0.5s ease';
            inner.style.transform = `translateX(-${index * 100}%)`;
            currentIndex = index;

            setTimeout(() => {
                isAnimating = false;
            }, 500);

            // 暂停所有视频
            items.forEach(item => {
                const video = item.querySelector('video');
                if (video) video.pause();
            });

            // 当前项是视频则播放
            const currentItem = items[currentIndex];
            const video = currentItem.querySelector('video');
            if (video) {
                if (video.readyState >= 2) {
                    video.currentTime = 0;
                    video.play().catch(err => {
                        console.log('视频自动播放失败（浏览器策略）：', err);
                    });
                } else {
                    video.addEventListener('loadedmetadata', function() {
                        video.currentTime = 0;
                        video.play().catch(err => {
                            console.log('视频自动播放失败（浏览器策略）：', err);
                        });
                    }, { once: true });
                }
            }
        }

        function next() {
            goToIndex(currentIndex + 1);
        }

        function prev() {
            goToIndex(currentIndex - 1);
        }

        function handleBtnClick(fn) {
            return function() {
                clearInterval(timer);
                fn();
                timer = setInterval(next, intervalTime);
            };
        }

        prevBtn.addEventListener('click', handleBtnClick(prev));
        nextBtn.addEventListener('click', handleBtnClick(next));
    }

    // ============== 点击图片放大逻辑 ==============
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const items = document.querySelectorAll('.works-item');

    items.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.getAttribute('data-img');
            lightboxImg.src = imgSrc;
            lightbox.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('show');
        document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', function(e) {
        if (e.target === this) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
});