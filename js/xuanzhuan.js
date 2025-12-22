const imageContainer = document.querySelector('.image-container');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const images = document.querySelectorAll('.scroll-image');

let slideWidth = window.innerWidth;

// ✅ 明确：真实图片索引 0,1,2，副本索引 3
const maxRealIndex = 2;   // 第三张图的索引
const copyIndex = 3;      // 副本的索引

let currentIndex = 0;
let isTransitioning = false;
let autoPlayTimer = setInterval(nextSlide, 3000);

function nextSlide() {
  if (isTransitioning) return;
  isTransitioning = true;

  currentIndex++;

  // 正常滑到下一张
  imageContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

  // 如果滑到了“副本”
  if (currentIndex === copyIndex) {
    // 动画结束后，悄悄把 currentIndex 改回 0（视觉上还是那张图）
    setTimeout(() => {
      // 关掉过渡，瞬间切回 0
      imageContainer.style.transition = 'none';
      currentIndex = 0;
      imageContainer.style.transform = `translateX(0)`;
      // 强制重绘后恢复过渡
      setTimeout(() => {
        imageContainer.style.transition = 'transform 0.5s ease';
        isTransitioning = false;
      }, 50);
    }, 500); // 只等动画时长 0.5s
  } else {
    // 普通图片，动画结束后就可以继续
    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  }
}

prevBtn.addEventListener('click', () => {
  if (isTransitioning) return;
  isTransitioning = true;

  if (currentIndex === 0) {
    // 从第 0 张往上一张：先瞬间跳到副本前一张（2），再做动画滑到 1
    imageContainer.style.transition = 'none';
    currentIndex = maxRealIndex; // 2
    imageContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

    setTimeout(() => {
      imageContainer.style.transition = 'transform 0.5s ease';
      currentIndex--; // 2 → 1
      imageContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
      setTimeout(() => {
        isTransitioning = false;
      }, 500);
    }, 50);
  } else {
    currentIndex--;
    imageContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  }
  resetAutoPlay();
});

nextBtn.addEventListener('click', () => {
  nextSlide();
  resetAutoPlay();
});

window.addEventListener('resize', () => {
  slideWidth = window.innerWidth;
  imageContainer.style.transition = 'none';
  imageContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  setTimeout(() => {
    imageContainer.style.transition = 'transform 0.5s ease';
  }, 50);
});

function resetAutoPlay() {
  clearInterval(autoPlayTimer);
  autoPlayTimer = setInterval(nextSlide, 3000);
}

document.querySelector('.fullscreen-carousel').addEventListener('mouseenter', () => {
  clearInterval(autoPlayTimer);
});
document.querySelector('.fullscreen-carousel').addEventListener('mouseleave', () => {
  resetAutoPlay();
});
// 顶部按钮跳转逻辑（替换原有代码）
document.addEventListener('DOMContentLoaded', function () {
    const btns = document.querySelectorAll('.top-buttons .special-cursor');
    const section2 = document.getElementById('section2');
    const section5 = document.getElementById('section5');
    const section6 = document.getElementById('section6');

    // 确认所有元素都找到（控制台验证）
    console.log('按钮数量：', btns.length);
    console.log('section2是否存在：', !!section2);
    console.log('section5是否存在：', !!section5);
    console.log('section6是否存在：', !!section6);

    // 主页→section2（用绝对距离跳转，兼容性100%）
    btns[0].addEventListener('click', function () {
        if (section2) {
            window.scrollTo({
                top: section2.getBoundingClientRect().top + window.pageYOffset - 20,
                behavior: 'smooth'
            });
            console.log('主页按钮触发跳转，目标距离顶部：', section2.offsetTop);
        }
    });

    // 作品→section5
    btns[1].addEventListener('click', function () {
        if (section5) {
            window.scrollTo({
                top: section5.getBoundingClientRect().top + window.pageYOffset - 20,
                behavior: 'smooth'
            });
            console.log('作品按钮触发跳转，目标距离顶部：', section5.offsetTop);
        }
    });

    // 联系→section6
    btns[2].addEventListener('click', function () {
        if (section6) {
            window.scrollTo({
                top: section6.getBoundingClientRect().top + window.pageYOffset - 20,
                behavior: 'smooth'
            });
            console.log('联系按钮触发跳转，目标距离顶部：', section6.offsetTop);
        }
    });
});