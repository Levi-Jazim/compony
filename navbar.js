// Check if user is logged in and update navbar
function updateNavbar() {
    const userStr = localStorage.getItem('currentUser');
    const authSection = document.querySelector('.auth-section');
    
    if (!authSection) {
        // Create auth section if it doesn't exist
        const nav = document.querySelector('nav');
        const authDiv = document.createElement('div');
        authDiv.className = 'auth-section';
        nav.appendChild(authDiv);
    }

    if (userStr) {
        const user = JSON.parse(userStr);
        document.querySelector('.auth-section').innerHTML = `
            <div class="user-menu">
                <img src="${user.avatar}" alt="${user.name}" class="user-image" onclick="toggleUserMenu()">
                <div class="user-dropdown" style="display: none;">
                    <div class="user-info">
                        <img src="${user.avatar}" alt="${user.name}" class="user-image-large">
                        <div class="user-details">
                            <span class="user-name">${user.name}</span>
                            <span class="user-email">${user.email}</span>
                        </div>
                    </div>
                    <a href="settings.html">Settings</a>
                    <button onclick="signOut()">Sign Out</button>
                </div>
            </div>
        `;
    } else {
        document.querySelector('.auth-section').innerHTML = `
            <button onclick="window.location.href='signin.html'" class="signin-btn">
                <i class="fas fa-user"></i> Sign In
            </button>
        `;
    }
}

// Toggle user dropdown menu
function toggleUserMenu() {
    const dropdown = document.querySelector('.user-dropdown');
    if (dropdown) {
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    }
}

// Handle sign out
function signOut() {
    localStorage.removeItem('currentUser');
    window.location.href = 'signin.html';
}

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.user-menu')) {
        const dropdown = document.querySelector('.user-dropdown');
        if (dropdown) {
            dropdown.style.display = 'none';
        }
    }
});

// Update navbar when page loads
document.addEventListener('DOMContentLoaded', updateNavbar);
