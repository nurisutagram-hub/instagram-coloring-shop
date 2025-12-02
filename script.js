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

// ===== ショッピングカート機能 =====
const cart = {
    items: [],

    init() {
        const savedCart = localStorage.getItem('coloringCart');
        if (savedCart) {
            this.items = JSON.parse(savedCart);
        }
        this.updateCartCount();
    },

    addItem(item) {
        // 既にカートにあるかチェック
        const existingItem = this.items.find(i => i.id === item.id);
        if (existingItem) {
            alert('この商品は既にカートに入っています');
            return;
        }

        this.items.push(item);
        this.save();
        this.updateCartCount();
        this.showNotification('カートに追加しました！');
    },

    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.save();
        this.updateCartCount();
        // カートページにいる場合は表示を更新（後で実装）
        if (window.location.pathname.includes('cart.html')) {
            renderCartItems();
        }
    },

    save() {
        localStorage.setItem('coloringCart', JSON.stringify(this.items));
    },

    updateCartCount() {
        const countElements = document.querySelectorAll('.cart-count');
        countElements.forEach(el => {
            el.textContent = this.items.length;
            el.style.display = this.items.length > 0 ? 'flex' : 'none';
        });
    },

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 2000);
    },

    getTotal() {
        return this.items.reduce((total, item) => total + item.price, 0);
    }
};

// 初期化
cart.init();

// カートボタンのイベントリスナー設定
document.addEventListener('DOMContentLoaded', () => {
    // 通常のギャラリーアイテム
    document.querySelectorAll('.gallery-item').forEach(item => {
        const addButton = document.createElement('button');
        addButton.className = 'btn-add-cart';
        addButton.textContent = 'カートに入れる';
        addButton.onclick = (e) => {
            e.stopPropagation(); // モーダルが開かないようにする
            const title = item.querySelector('h3').textContent;
            const priceText = item.querySelector('.price').textContent;
            const price = parseInt(priceText.replace(/[^0-9]/g, ''));
            const image = item.getAttribute('data-image');

            cart.addItem({
                id: title, // 簡易的にタイトルをIDとする
                title: title,
                price: price,
                image: image
            });
        };

        // 価格表示の横に追加、または適切な場所に追加
        const infoDiv = item.querySelector('.gallery-info');
        infoDiv.appendChild(addButton);
    });

    // キッズ向けアイテム
    document.querySelectorAll('.btn-kids').forEach(btn => {
        btn.textContent = 'カートに入れる';
        btn.onclick = (e) => {
            const card = btn.closest('.kids-card');
            const title = card.querySelector('h3').textContent;
            // キッズ向けは一律300円とする（またはHTMLから取得）
            const price = 300;
            const image = card.querySelector('.kids-img-color').src;

            cart.addItem({
                id: title,
                title: title,
                price: price,
                image: image
            });
        };
    });
});
