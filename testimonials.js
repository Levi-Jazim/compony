// Get DOM elements
const testimonialsGrid = document.getElementById('testimonialsGrid');
const testimonialForm = document.getElementById('testimonialForm');
const ratingStars = document.querySelectorAll('.rating-input i');
const ratingInput = document.getElementById('ratingValue');
const addTestimonialSection = document.getElementById('addTestimonialSection');

// Check authentication on page load
document.addEventListener('DOMContentLoaded', () => {
    if (!checkRestrictedContent()) {
        document.getElementById('authPrompt').style.display = 'flex';
        addTestimonialSection.style.display = 'none';
    } else {
        loadTestimonials();
        setupRatingStars();
    }
});

// Load testimonials from localStorage
function loadTestimonials() {
    const testimonials = JSON.parse(localStorage.getItem('testimonials') || '[]');
    testimonialsGrid.innerHTML = ''; // Clear existing testimonials

    testimonials.forEach(testimonial => {
        const testimonialCard = createTestimonialCard(testimonial);
        testimonialsGrid.appendChild(testimonialCard);
    });
}

// Create a testimonial card element
function createTestimonialCard(testimonial) {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    
    const stars = '★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating);
    
    card.innerHTML = `
        <div class="testimonial-header">
            <img src="${testimonial.userImage || 'default-avatar.png'}" alt="${testimonial.userName}" class="testimonial-avatar">
            <div class="testimonial-info">
                <h3>${testimonial.userName}</h3>
                <div class="testimonial-rating">${stars}</div>
                <span class="testimonial-date">${new Date(testimonial.date).toLocaleDateString()}</span>
            </div>
        </div>
        <p class="testimonial-text">${testimonial.text}</p>
    `;
    
    return card;
}

// Setup rating stars functionality
function setupRatingStars() {
    let selectedRating = 0;

    ratingStars.forEach(star => {
        star.addEventListener('mouseover', () => {
            const rating = parseInt(star.dataset.rating);
            highlightStars(rating);
        });

        star.addEventListener('mouseout', () => {
            highlightStars(selectedRating);
        });

        star.addEventListener('click', () => {
            selectedRating = parseInt(star.dataset.rating);
            ratingInput.value = selectedRating;
            highlightStars(selectedRating);
        });
    });
}

// Update star display based on rating
function highlightStars(rating) {
    ratingStars.forEach(star => {
        const starRating = parseInt(star.dataset.rating);
        if (starRating <= rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// Handle testimonial form submission
testimonialForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        showNotification('Please sign in to submit a testimonial', 'error');
        return;
    }

    const testimonial = {
        userId: user.id,
        userName: user.name,
        userImage: user.imageUrl,
        text: document.getElementById('testimonialText').value,
        rating: parseInt(ratingInput.value),
        date: new Date().toISOString()
    };

    // Get existing testimonials
    const testimonials = JSON.parse(localStorage.getItem('testimonials') || '[]');
    
    // Add new testimonial
    testimonials.push(testimonial);
    
    // Save to localStorage
    localStorage.setItem('testimonials', JSON.stringify(testimonials));
    
    // Reload testimonials and reset form
    loadTestimonials();
    testimonialForm.reset();
    ratingInput.value = '5';
    updateStarDisplay(5);
    
    showNotification('Thank you for your testimonial!', 'success');
});
