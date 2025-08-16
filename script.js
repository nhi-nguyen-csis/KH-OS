const toggleBtn = document.getElementById('lang-toggle');
let isVietnamese = false;

toggleBtn.addEventListener('click', () => {
    isVietnamese = !isVietnamese;
    
    document.querySelectorAll('[data-en]').forEach(el => {
        el.textContent = isVietnamese ? el.getAttribute('data-vi') : el.getAttribute('data-en');
    });

    // Update button text
    toggleBtn.textContent = isVietnamese ? 'English' : 'Tiếng Việt';
    document.documentElement.lang = isVietnamese ? 'vi' : 'en';
});

document.getElementById('current-year').textContent = new Date().getFullYear();
