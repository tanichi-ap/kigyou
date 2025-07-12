// 起業準備ウェブサイト - 共通スクリプト

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
    // スクロールアニメーション
    initScrollAnimations();
    
    // スムーズスクロール
    initSmoothScroll();
    
    // ヘッダーの背景透明度変更
    initHeaderScroll();
    
    // モバイルメニュー
    initMobileMenu();
    
    // ページトップボタン
    initPageTopButton();
});

// スクロールアニメーション
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // アニメーション対象の要素を監視
    document.querySelectorAll('.card, .section h2, .hero h1, .hero p').forEach(el => {
        observer.observe(el);
    });
}

// スムーズスクロール
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ヘッダーのスクロール効果
function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(0, 184, 148, 0.95)';
        } else {
            header.style.backgroundColor = '';
        }
    });
}

// モバイルメニュー
function initMobileMenu() {
    const menuButton = document.createElement('button');
    menuButton.innerHTML = '☰';
    menuButton.classList.add('mobile-menu-button');
    menuButton.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        @media (max-width: 768px) {
            display: block;
        }
    `;
    
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    if (nav && navLinks) {
        nav.appendChild(menuButton);
        
        menuButton.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
        
        // ウィンドウリサイズ時の処理
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navLinks.style.display = 'flex';
            } else {
                navLinks.style.display = 'none';
            }
        });
    }
}

// ページトップボタン
function initPageTopButton() {
    const pageTopButton = document.createElement('button');
    pageTopButton.innerHTML = '↑';
    pageTopButton.classList.add('page-top-button');
    pageTopButton.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-green);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(pageTopButton);
    
    // スクロール時の表示/非表示
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            pageTopButton.style.display = 'block';
        } else {
            pageTopButton.style.display = 'none';
        }
    });
    
    // クリック時のスクロール
    pageTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ホバー効果
    pageTopButton.addEventListener('mouseenter', () => {
        pageTopButton.style.transform = 'scale(1.1)';
    });
    
    pageTopButton.addEventListener('mouseleave', () => {
        pageTopButton.style.transform = 'scale(1)';
    });
}

// 検索機能
function initSearch() {
    const searchBox = document.getElementById('search-box');
    const searchResults = document.getElementById('search-results');
    
    if (!searchBox || !searchResults) return;
    
    searchBox.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }
        
        // 検索結果のサンプル（実際の実装では、全ページの内容を検索）
        const allPages = [
            { title: '起業とは何か？', url: '/basics/what-is-entrepreneurship.html' },
            { title: '起業のメリット・デメリット', url: '/basics/pros-and-cons.html' },
            { title: 'ビジネスアイデアの発想法', url: '/business-ideas/ideation.html' },
            // 他のページも追加...
        ];
        
        const results = allPages.filter(page => 
            page.title.toLowerCase().includes(query)
        );
        
        displaySearchResults(results);
    });
}

// 検索結果の表示
function displaySearchResults(results) {
    const searchResults = document.getElementById('search-results');
    if (!searchResults) return;
    
    if (results.length === 0) {
        searchResults.innerHTML = '<p>検索結果が見つかりませんでした。</p>';
    } else {
        searchResults.innerHTML = results.map(result => 
            `<div class="search-result">
                <a href="${result.url}">
                    <h4>${result.title}</h4>
                </a>
            </div>`
        ).join('');
    }
    
    searchResults.style.display = 'block';
}

// フォームバリデーション
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            showError(input, 'この項目は必須です。');
            isValid = false;
        } else {
            clearError(input);
        }
        
        // メールアドレスの検証
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                showError(input, '有効なメールアドレスを入力してください。');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// エラー表示
function showError(input, message) {
    clearError(input);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #e74c3c;
        font-size: 0.9rem;
        margin-top: 0.5rem;
    `;
    input.parentNode.appendChild(errorDiv);
    input.style.borderColor = '#e74c3c';
}

// エラークリア
function clearError(input) {
    const errorMessage = input.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
    input.style.borderColor = '';
}

// ローディング表示
function showLoading(element) {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = '<div class="spinner"></div>';
    loader.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1000;
    `;
    
    element.style.position = 'relative';
    element.appendChild(loader);
}

// ローディング非表示
function hideLoading(element) {
    const loader = element.querySelector('.loader');
    if (loader) {
        loader.remove();
    }
}

// 通知表示
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 2rem;
        padding: 1rem 2rem;
        background: var(--primary-green);
        color: white;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        animation: slideInRight 0.3s ease;
    `;
    
    if (type === 'error') {
        notification.style.background = '#e74c3c';
    } else if (type === 'success') {
        notification.style.background = var(--primary-green);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ユーティリティ関数
const Utils = {
    // 要素の表示/非表示切り替え
    toggle: function(element) {
        element.style.display = element.style.display === 'none' ? 'block' : 'none';
    },
    
    // 要素の追加
    createElement: function(tag, className, textContent) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (textContent) element.textContent = textContent;
        return element;
    },
    
    // 日付のフォーマット
    formatDate: function(date) {
        return new Date(date).toLocaleDateString('ja-JP');
    },
    
    // 数値のフォーマット
    formatNumber: function(number) {
        return number.toLocaleString('ja-JP');
    }
};

// アニメーション用のCSS追加
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .spinner {
        border: 4px solid #f3f3f3;
        border-top: 4px solid var(--primary-green);
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 2s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @media (max-width: 768px) {
        .mobile-menu-button {
            display: block !important;
        }
        
        .nav-links {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--primary-green);
            flex-direction: column;
            padding: 1rem;
            display: none !important;
        }
        
        .nav-links.active {
            display: flex !important;
        }
    }
`;
document.head.appendChild(style);