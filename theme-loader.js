// Apply saved theme on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || 'white';
    document.documentElement.setAttribute('data-theme', savedTheme);
});
