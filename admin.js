document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Check credentials
    if (name === 'Jazim' && 
        email === 'jazimnoor919@gmail.com' && 
        password === '12364635453jJ') {
        // Set login status
        localStorage.setItem('adminLoggedIn', 'true');
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid credentials. Please try again.');
    }
});
