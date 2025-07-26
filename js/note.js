document.addEventListener('DOMContentLoaded', function () {
    // 暗黑模式切换
    const toggleDarkBtn = document.getElementById('toggle-dark');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // 检查本地存储或系统偏好
    const currentTheme = localStorage.getItem('theme') ||
        (prefersDarkScheme.matches ? 'dark' : 'light');

    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        toggleDarkBtn.innerHTML = '<i class="fas fa-sun"></i><span>Light Mode</span>';
    }

    toggleDarkBtn.addEventListener('click', function () {
        let theme;
        if (document.body.getAttribute('data-theme') === 'dark') {
            document.body.removeAttribute('data-theme');
            theme = 'light';
            toggleDarkBtn.innerHTML = '<i class="fas fa-moon"></i><span>Dark Mode</span>';
        } else {
            document.body.setAttribute('data-theme', 'dark');
            theme = 'dark';
            toggleDarkBtn.innerHTML = '<i class="fas fa-sun"></i><span>Light Mode</span>';
        }
        localStorage.setItem('theme', theme);
    });

    // 打印功能
    document.getElementById('print-note').addEventListener('click', function () {
        window.print(); // 触发浏览器打印对话框
    });

    // 图片点击放大
    const images = document.querySelectorAll('.chapter-content img');
    images.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function () {
            if (this.classList.contains('zoomed')) {
                this.classList.remove('zoomed');
                this.style.cursor = 'zoom-in';
            } else {
                this.classList.add('zoomed');
                this.style.cursor = 'zoom-out';
            }
        });
    });
});