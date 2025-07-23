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
        const content = document.querySelector('.chapter-content').innerHTML;
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Printing...</title>
            </head>
            <body>${content}</body>
            </html>
        `;

        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const printWindow = window.open(url, '_blank');

        printWindow.onload = () => {
            printWindow.print();
            setTimeout(() => {
                printWindow.close(); // 打印后立即关闭
                URL.revokeObjectURL(url);
            }, 0); // 短暂延迟确保打印对话框弹出
        };
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