document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state
    const buttonText = document.querySelector('.button-text');
    const buttonLoader = document.querySelector('.button-loader');
    buttonText.style.display = 'none';
    buttonLoader.style.display = 'inline-block';
    
    // Prepare template parameters
    const templateParams = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        to_email: 'jazimnoor919@gmail.com'
    };

    // Send email using EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Thank you for your message! I will get back to you soon.');
            document.getElementById('contactForm').reset();
        }, function(error) {
            console.log('FAILED...', error);
            alert('Oops! Something went wrong. Please try again later.');
        })
        .finally(function() {
            // Reset button state
            buttonText.style.display = 'inline-block';
            buttonLoader.style.display = 'none';
        });
});
