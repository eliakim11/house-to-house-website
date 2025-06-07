// ===== Dark Mode Toggle =====
const checkbox = document.getElementById('checkbox');
const toggleIcon = document.getElementById('toggle-icon');

checkbox.addEventListener('change', () => {
    document.documentElement.setAttribute(
        'data-theme',
        checkbox.checked ? 'dark' : 'light'
    );
    toggleIcon.innerHTML = checkbox.checked
        ? '<i class="fas fa-moon"></i>'
        : '<i class="fas fa-sun"></i>';
});1

// ===== Language Toggle =====
const languageToggle = document.getElementById('languageToggle');
languageToggle.addEventListener('click', () => {
    const currentLang = document.documentElement.getAttribute('data-lang') || 'en';
    const newLang = currentLang === 'en' ? 'kin' : 'en';
    document.documentElement.setAttribute('data-lang', newLang);
    
    // Update form placeholders
    document.querySelectorAll('.bilingual-placeholder').forEach(el => {
        el.placeholder = el.getAttribute(`data-${newLang}`);
    });
});

// ===== Sermon Language Filter =====
document.querySelectorAll('.sermon-filters button').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelector('.sermon-filters .active').classList.remove('active');
        this.classList.add('active');
        
        const filter = this.textContent.toLowerCase();
        document.querySelectorAll('.sermon-card').forEach(card => {
            card.style.display = 'block';
            if (filter !== 'all' && !card.dataset.lang.includes(filter)) {
                card.style.display = 'none';
            }
        });
    });
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
//------------SMORN JAVA......//
// Gallery Navigation
let currentGalleryPage = 1;
const itemsPerPage = 8; // Show 8 items at a time
const galleryItems = document.querySelectorAll('.gallery-item');

function showGalleryPage(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    galleryItems.forEach((item, index) => {
        if (index >= startIndex && index < endIndex) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
    
    // Update button states
    document.querySelector('.gallery-prev').disabled = page === 1;
    document.querySelector('.gallery-next').disabled = endIndex >= galleryItems.length;
    
    currentGalleryPage = page;
}

document.querySelector('.gallery-prev').addEventListener('click', () => {
    if (currentGalleryPage > 1) {
        showGalleryPage(currentGalleryPage - 1);
    }
});

document.querySelector('.gallery-next').addEventListener('click', () => {
    if ((currentGalleryPage * itemsPerPage) < galleryItems.length) {
        showGalleryPage(currentGalleryPage + 1);
    }
});

// Initialize gallery
showGalleryPage(1);
