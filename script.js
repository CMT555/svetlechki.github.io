document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        mirror: false,
        // Добавляем кастомные анимации для выезда снизу
        disable: function() {
            return window.innerWidth < 768;
        }
    });

    // Плавный скролл для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 30,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Анимация появления блоков истории при скролле
function observeHistoryBlocks() {
    const historyBlocks = document.querySelectorAll('.history-block');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    historyBlocks.forEach(block => {
        observer.observe(block);
    });
}

// Добавьте вызов функции в DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        mirror: false,
        disable: function() {
            return window.innerWidth < 768;
        }
    });

    // Плавный скролл для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 30,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Запускаем наблюдение за блоками истории
    observeHistoryBlocks();
});

class AdvancedImageGallery {
    constructor() {
        this.modal = document.getElementById('imageModal');
        this.modalImg = document.getElementById('modalImage');
        this.closeBtn = document.querySelector('.close');
        
        // Находим ВСЕ ленты на странице
        this.galleryTracks = document.querySelectorAll('.gallery-track, .gallery-track-s, .gallery-track-n');
        this.allImages = [];
        this.currentIndex = 0;
        
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        
        this.init();
    }
    
    init() {
        // Собираем все изображения со всех лент
        this.collectAllImages();
        
        // Добавляем обработчики для КАЖДОЙ ленты
        this.galleryTracks.forEach(track => {
            track.addEventListener('click', (e) => this.openModal(e));
        });
        
        // Обработчики для закрытия
        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });
        
        // Навигация (если есть кнопки)
        if (this.prevBtn && this.nextBtn) {
            this.prevBtn.addEventListener('click', () => this.navigate(-1));
            this.nextBtn.addEventListener('click', () => this.navigate(1));
        }
        
        // Клавиатура
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
            if (e.key === 'ArrowLeft') this.navigate(-1);
            if (e.key === 'ArrowRight') this.navigate(1);
        });
    }
    
    collectAllImages() {
        this.allImages = [];
        
        this.galleryTracks.forEach((track, trackIndex) => {
            const images = Array.from(track.querySelectorAll('img'));
            images.forEach((img, imgIndex) => {
                // Исключаем дубликаты (из второй части ленты)
                const isDuplicate = this.allImages.some(existingImg => 
                    existingImg.src === img.src && 
                    existingImg.element === img
                );
                
                if (!isDuplicate) {
                    this.allImages.push({
                        element: img,
                        src: img.src,
                        trackIndex: trackIndex,
                        imgIndex: imgIndex
                    });
                }
            });
        });
    }
    
    openModal(e) {
        if (e.target.tagName === 'IMG') {
            // Останавливаем ВСЕ ленты
            this.galleryTracks.forEach(track => {
                track.style.animationPlayState = 'paused';
            });
            
            // Находим индекс изображения в общем массиве
            this.currentIndex = this.allImages.findIndex(item => 
                item.element === e.target
            );
            
            if (this.currentIndex !== -1) {
                this.showImage(this.currentIndex);
                this.modal.style.display = 'block';
                setTimeout(() => this.modal.classList.add('show'), 10);
            }
        }
    }
    
    showImage(index) {
        if (index >= 0 && index < this.allImages.length) {
            this.modalImg.src = this.allImages[index].src;
            this.currentIndex = index;
        }
    }
    
    navigate(direction) {
        let newIndex = this.currentIndex + direction;
        
        if (newIndex < 0) {
            newIndex = this.allImages.length - 1;
        } else if (newIndex >= this.allImages.length) {
            newIndex = 0;
        }
        
        this.showImage(newIndex);
    }
    
    closeModal() {
        this.modal.classList.remove('show');
        setTimeout(() => {
            this.modal.style.display = 'none';
            // Возобновляем ВСЕ ленты
            this.galleryTracks.forEach(track => {
                track.style.animationPlayState = 'running';
            });
        }, 300);
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedImageGallery();
});

