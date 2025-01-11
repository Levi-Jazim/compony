document.addEventListener('DOMContentLoaded', function() {
    // Add animation to service cards on scroll
    const cards = document.querySelectorAll('.service-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    cards.forEach(card => {
        observer.observe(card);
    });

    // Add hover effect to service cards
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('card-hover');
        });

        card.addEventListener('mouseleave', function() {
            this.classList.remove('card-hover');
        });
    });
});
