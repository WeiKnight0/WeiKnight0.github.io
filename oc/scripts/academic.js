// 返回顶部按钮逻辑
document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('back-to-top');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 200) {
            btn.style.display = 'block';
        } else {
            btn.style.display = 'none';
        }
    });
    btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
