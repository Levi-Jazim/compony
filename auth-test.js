// Simple test function to manually sign in
function testSignIn() {
    const testUser = {
        id: 'test123',
        name: 'Test User',
        email: 'test@example.com',
        imageUrl: 'https://ui-avatars.com/api/?name=Test+User&background=random',
        token: 'test-token',
        loginTime: new Date().getTime(),
        expiryTime: new Date().getTime() + (7 * 24 * 60 * 60 * 1000)
    };

    // Store user data
    localStorage.setItem('userAuthData', JSON.stringify(testUser));
    console.log('Test user data stored:', testUser);

    // Update UI
    const authButton = document.getElementById('authButton');
    const userMenu = document.getElementById('userMenu');
    
    console.log('authButton found:', !!authButton);
    console.log('userMenu found:', !!userMenu);

    if (authButton) {
        authButton.style.display = 'none';
        console.log('Auth button hidden');
    }
    
    if (userMenu) {
        userMenu.style.display = 'block';
        const userImage = userMenu.querySelector('.user-image');
        const userName = userMenu.querySelector('.user-name');
        const userEmail = userMenu.querySelector('.user-email');
        
        console.log('userImage found:', !!userImage);
        console.log('userName found:', !!userName);
        console.log('userEmail found:', !!userEmail);

        if (userImage) {
            userImage.src = testUser.imageUrl;
            userImage.alt = testUser.name;
            console.log('User image updated');
        }
        
        if (userName) userName.textContent = testUser.name;
        if (userEmail) userEmail.textContent = testUser.email;
    }

    // Check if data was stored
    const storedData = localStorage.getItem('userAuthData');
    console.log('Stored data retrieved:', storedData);

    return 'Sign in test completed - check console for details';
}

// Function to check current auth state
function checkAuthState() {
    const userData = localStorage.getItem('userAuthData');
    console.log('Current auth data:', userData);
    
    const authButton = document.getElementById('authButton');
    const userMenu = document.getElementById('userMenu');
    
    console.log('Auth button visibility:', authButton?.style.display);
    console.log('User menu visibility:', userMenu?.style.display);
    
    return 'Auth state check completed - check console for details';
}
