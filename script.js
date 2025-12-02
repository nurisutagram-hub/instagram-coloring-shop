// ===== ヘッダースクロール効果 =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== ハンバーガーメニュー =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// ナビゲーションリンクをクリックしたらメニューを閉じる
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== スムーズスクロール =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== 画像モーダル =====
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.getElementById('modalClose');
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const imageSrc = item.getAttribute('data-image');
        modalImage.src = imageSrc;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // スクロール無効化
    });
});

// モーダルを閉じる
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// ESCキーでモーダルを閉じる
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // スクロール有効化
}

// ===== スクロールアニメーション =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// fade-inクラスを持つ全要素を監視
document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// ===== ギャラリーアイテムの遅延表示 =====
galleryItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
});

// ===== パララックス効果（オプション） =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-content');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== ページ読み込み時のアニメーション =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== コンソールメッセージ =====
console.log('%c🎨 Coloring Art', 'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cようこそ！素敵な塗り絵をお楽しみください 🌸', 'font-size: 14px; color: #fcb045;');
