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

    document.querySelectorAll('figure.highlight').forEach((figure) => {
        if (figure.querySelector('.code-lang-label')) return;

        const langClass = Array.from(figure.classList).find(cls => cls !== 'highlight');
        if (!langClass) return;

        const langLabel = document.createElement('div');
        langLabel.className = 'code-lang-label';
        langLabel.textContent = langClass;
        figure.style.position = 'relative';
        figure.prepend(langLabel);
    });

    document.querySelectorAll('pre.astro-code').forEach((pre) => {
        if (pre.dataset.noteCodeReady === 'true') return;
        pre.dataset.noteCodeReady = 'true';

        const classList = Array.from(pre.classList);
        const langClass = classList.find(cls => cls !== 'astro-code' && !cls.includes('light') && !cls.includes('dark'));
        const marker = pre.previousElementSibling?.classList.contains('note-code-language')
            ? pre.previousElementSibling
            : null;
        const language = marker?.getAttribute('data-language') || pre.getAttribute('data-language') || langClass || 'code';

        if (marker) {
            marker.remove();
        }

        const langLabel = document.createElement('div');
        langLabel.className = 'code-lang-label';
        langLabel.textContent = language;
        pre.prepend(langLabel);

        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-code-btn';
        copyBtn.type = 'button';
        copyBtn.textContent = 'Copy';
        copyBtn.addEventListener('click', async () => {
            const code = Array.from(pre.querySelectorAll('code .line'))
                .map(line => {
                    const clone = line.cloneNode(true);
                    clone.querySelector('.line-number')?.remove();
                    return clone.textContent || '';
                })
                .join('\n');

            try {
                await navigator.clipboard.writeText(code);
                copyBtn.textContent = 'Copied';
                window.setTimeout(() => {
                    copyBtn.textContent = 'Copy';
                }, 1200);
            } catch (error) {
                copyBtn.textContent = 'Failed';
                window.setTimeout(() => {
                    copyBtn.textContent = 'Copy';
                }, 1200);
            }
        });
        pre.prepend(copyBtn);

        pre.querySelectorAll('code .line').forEach((line, index) => {
            if (line.querySelector('.line-number')) return;

            const lineNumber = document.createElement('span');
            lineNumber.className = 'line-number';
            lineNumber.textContent = String(index + 1);
            line.prepend(lineNumber);
        });
    });
});
