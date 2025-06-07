// === JavaScript Enhancements for Sermons Page ===

// === Utility Functions ===
function $(selector, context = document) {
    return context.querySelector(selector);
}
function $all(selector, context = document) {
    return context.querySelectorAll(selector);
}

// === Transcript Toggle ===
$all('.transcript-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
        const transcript = toggle.nextElementSibling;
        transcript.classList.toggle('show');
    });
});

// === Download Button Alert (Placeholder) ===
$all('.download-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const sermonId = btn.dataset.sermonId;
        alert(`Downloading sermon: ${sermonId}`);
    });
});

// === Bilingual Toggle ===
$('#languageToggle')?.addEventListener('click', () => {
    const body = document.querySelector('body');
    const currentLang = body.getAttribute('data-lang') || 'en';
    const newLang = currentLang === 'kin' ? 'en' : 'kin';
    body.setAttribute('data-lang', newLang);
});

// === Theme Switch ===
$('#checkbox')?.addEventListener('change', () => {
    const isDark = $('#checkbox').checked;
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
});

// === Gallery Controls ===
const galleryGrid = $('.gallery-grid');
$('.gallery-next')?.addEventListener('click', () => {
    galleryGrid.scrollBy({ left: 300, behavior: 'smooth' });
});
$('.gallery-prev')?.addEventListener('click', () => {
    galleryGrid.scrollBy({ left: -300, behavior: 'smooth' });
});

// === Pagination Highlight ===
$all('.page-number').forEach(num => {
    num.addEventListener('click', () => {
        $all('.page-number').forEach(n => n.classList.remove('active'));
        num.classList.add('active');
    });
});

// === Filter and Search Sermons ===
function filterSermons() {
    const search = $('.search-input').value.toLowerCase();
    const media = $('.filter-select:nth-of-type(1)').value;
    const language = $('.filter-select:nth-of-type(2)').value;
    const series = $('.filter-select:nth-of-type(3)').value;

    $all('.sermon-card').forEach(card => {
        const title = card.querySelector('.sermon-title')?.textContent.toLowerCase() || '';
        const type = card.dataset.type;
        const lang = card.dataset.lang;
        const ser = card.dataset.series;

        const matchSearch = title.includes(search);
        const matchType = (media === 'all' || media === type);
        const matchLang = (language === 'all' || language === lang);
        const matchSeries = (series === 'all' || series === ser);

        card.style.display = (matchSearch && matchType && matchLang && matchSeries) ? 'block' : 'none';
    });
}

$('.search-input')?.addEventListener('input', filterSermons);
$all('.filter-select').forEach(select => select.addEventListener('change', filterSermons));

// === Plyr Setup ===
if (window.Plyr) {
    Plyr.setup('.plyr__video-embed iframe');
}

// === Run Initial Language and Theme ===
document.addEventListener('DOMContentLoaded', () => {
    const lang = document.body.getAttribute('data-lang') || 'en';
    document.body.setAttribute('data-lang', lang);
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    $('#checkbox').checked = isDark;
});
