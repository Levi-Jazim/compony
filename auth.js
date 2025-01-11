// Global auth configuration
const AUTH_KEY = 'userAuthData';
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
const DEFAULT_AVATAR = 'https://ui-avatars.com/api/?name=User&background=random';

// Handle Google Sign-In
function signInWithGoogle() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signIn().then(
        googleUser => {
            const profile = googleUser.getBasicProfile();
            const userData = {
                id: profile.getId(),
                name: profile.getName(),
                email: profile.getEmail(),
                imageUrl: profile.getImageUrl() || DEFAULT_AVATAR,
                token: googleUser.getAuthResponse().id_token,
                loginTime: new Date().getTime(),
                expiryTime: new Date().getTime() + SESSION_DURATION
            };
            setUserData(userData);
            showNotification('Signed in successfully!');
            window.location.href = 'index.html';
        },
        error => {
            console.error('Google Sign In Error:', error);
            showNotification('Sign in failed. Please try again.', 'error');
        }
    );
}

// Handle Email Sign-In/Sign-Up
document.getElementById('emailSignInForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const isSignUp = document.querySelector('.signin-btn').textContent === 'Sign Up';

    // Create user data
    const userData = {
        id: generateUserId(email),
        name: name,
        email: email,
        imageUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
        token: 'email-auth-token',
        loginTime: new Date().getTime(),
        expiryTime: new Date().getTime() + SESSION_DURATION
    };

    setUserData(userData);
    showNotification(isSignUp ? 'Account created successfully!' : 'Signed in successfully!');
    window.location.href = 'index.html';
});

// Store user data consistently across storage mechanisms
function setUserData(userData) {
    const userDataString = JSON.stringify(userData);
    localStorage.setItem(AUTH_KEY, userDataString);
    sessionStorage.setItem(AUTH_KEY, userDataString);
    document.cookie = `${AUTH_KEY}=${encodeURIComponent(userDataString)}; path=/; max-age=${SESSION_DURATION/1000}`;
    updateUIForAuthState(true);
}

// Clear user data from all storage mechanisms
function clearUserData() {
    localStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(AUTH_KEY);
    document.cookie = `${AUTH_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    updateUIForAuthState(false);
}

// Get user data from available storage mechanisms
function getUserData() {
    let userData = null;
    
    // Try localStorage first
    userData = localStorage.getItem(AUTH_KEY);
    if (!userData) {
        // Try sessionStorage next
        userData = sessionStorage.getItem(AUTH_KEY);
    }
    if (!userData) {
        // Try cookies as last resort
        const cookies = document.cookie.split(';');
        const authCookie = cookies.find(c => c.trim().startsWith(`${AUTH_KEY}=`));
        if (authCookie) {
            userData = decodeURIComponent(authCookie.split('=')[1]);
        }
    }

    if (userData) {
        try {
            userData = JSON.parse(userData);
            // Check if session is expired
            if (userData.expiryTime && userData.expiryTime < new Date().getTime()) {
                clearUserData();
                return null;
            }
            return userData;
        } catch (e) {
            clearUserData();
            return null;
        }
    }
    return null;
}

// Update UI based on auth state
function updateUIForAuthState(isSignedIn) {
    const userData = getUserData();
    const authButton = document.getElementById('authButton');
    const userMenu = document.getElementById('userMenu');
    const userImages = document.querySelectorAll('.user-image, .user-image-large');
    const userName = document.querySelector('.user-name');
    const userEmail = document.querySelector('.user-email');
    const adminLink = document.querySelector('.admin-link');

    if (isSignedIn && userData) {
        if (authButton) authButton.style.display = 'none';
        if (userMenu) {
            userMenu.style.display = 'block';
            const userImage = userMenu.querySelector('.user-image');
            if (userImage) {
                userImage.src = userData.imageUrl || DEFAULT_AVATAR;
                userImage.alt = userData.name;
            }
        }
        
        userImages.forEach(img => {
            img.src = userData.imageUrl || DEFAULT_AVATAR;
            img.alt = userData.name;
        });

        if (userName) userName.textContent = userData.name;
        if (userEmail) userEmail.textContent = userData.email;
        if (adminLink) {
            adminLink.style.display = userData.email.endsWith('@admin.com') ? 'block' : 'none';
        }
    } else {
        if (authButton) authButton.style.display = 'block';
        if (userMenu) userMenu.style.display = 'none';
        if (adminLink) adminLink.style.display = 'none';
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Google Sign-In
    gapi.load('auth2', () => {
        gapi.auth2.init({
            client_id: 'YOUR_GOOGLE_CLIENT_ID'
        }).then(() => {
            // Check if user is already signed in
            const userData = getUserData();
            if (userData) {
                updateUIForAuthState(true);
            } else {
                updateUIForAuthState(false);
            }
        });
    });
});

// Utility function to generate consistent user ID from email
function generateUserId(email) {
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
        const char = email.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return 'user_' + Math.abs(hash).toString(16);
}
