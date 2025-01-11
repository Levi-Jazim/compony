// Theme handling
document.addEventListener('DOMContentLoaded', function() {
    // Initialize settings from localStorage
    loadSettings();

    // Theme Settings
    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.getAttribute('data-theme');
            setTheme(theme);
            saveSettings();
        });
    });

    // Font Size Controls
    const fontSizeBtns = document.querySelectorAll('.font-size-btn');
    fontSizeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.getAttribute('data-action');
            changeFontSize(action);
            saveSettings();
        });
    });

    // Font Family
    const fontFamilySelect = document.getElementById('fontFamily');
    if (fontFamilySelect) {
        fontFamilySelect.addEventListener('change', () => {
            setFontFamily(fontFamilySelect.value);
            saveSettings();
        });
    }

    // Animation Settings
    const enableAnimations = document.getElementById('enableAnimations');
    if (enableAnimations) {
        enableAnimations.addEventListener('change', () => {
            toggleAnimations(enableAnimations.checked);
            saveSettings();
        });
    }

    const reduceMotion = document.getElementById('reduceMotion');
    if (reduceMotion) {
        reduceMotion.addEventListener('change', () => {
            toggleReduceMotion(reduceMotion.checked);
            saveSettings();
        });
    }

    const animationSpeed = document.getElementById('animationSpeed');
    if (animationSpeed) {
        animationSpeed.addEventListener('input', () => {
            setAnimationSpeed(animationSpeed.value);
            saveSettings();
        });
    }

    // Language Settings
    const languageSelect = document.getElementById('language');
    if (languageSelect) {
        languageSelect.addEventListener('change', () => {
            setLanguage(languageSelect.value);
            saveSettings();
        });
    }

    // Accessibility Settings
    const highContrast = document.getElementById('highContrast');
    if (highContrast) {
        highContrast.addEventListener('change', () => {
            toggleHighContrast(highContrast.checked);
            saveSettings();
        });
    }

    const screenReader = document.getElementById('screenReader');
    if (screenReader) {
        screenReader.addEventListener('change', () => {
            toggleScreenReader(screenReader.checked);
            saveSettings();
        });
    }

    // Save and Reset Buttons
    const saveBtn = document.getElementById('saveSettings');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            saveSettings();
            showNotification('Settings saved successfully!');
        });
    }

    const resetBtn = document.getElementById('resetSettings');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            resetSettings();
            showNotification('Settings reset to default');
        });
    }
});

// Settings Functions
function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('settings')) || getDefaultSettings();
    
    // Apply theme
    setTheme(settings.theme);
    
    // Apply font settings
    document.documentElement.style.fontSize = settings.fontSize + 'px';
    document.getElementById('currentFontSize').textContent = settings.fontSize + 'px';
    setFontFamily(settings.fontFamily);
    
    // Apply animation settings
    toggleAnimations(settings.enableAnimations);
    toggleReduceMotion(settings.reduceMotion);
    setAnimationSpeed(settings.animationSpeed);
    
    // Apply language
    setLanguage(settings.language);
    
    // Apply accessibility settings
    toggleHighContrast(settings.highContrast);
    toggleScreenReader(settings.screenReader);
    
    // Update UI elements
    updateUIElements(settings);
}

function getDefaultSettings() {
    return {
        theme: 'white',
        fontSize: 16,
        fontFamily: 'system-ui',
        enableAnimations: true,
        reduceMotion: false,
        animationSpeed: 1,
        language: 'en',
        highContrast: false,
        screenReader: false
    };
}

function saveSettings() {
    const settings = {
        theme: document.documentElement.getAttribute('data-theme'),
        fontSize: parseInt(document.documentElement.style.fontSize),
        fontFamily: document.documentElement.style.fontFamily,
        enableAnimations: document.getElementById('enableAnimations').checked,
        reduceMotion: document.getElementById('reduceMotion').checked,
        animationSpeed: parseFloat(document.getElementById('animationSpeed').value),
        language: document.getElementById('language').value,
        highContrast: document.getElementById('highContrast').checked,
        screenReader: document.getElementById('screenReader').checked
    };
    
    localStorage.setItem('settings', JSON.stringify(settings));
}

function resetSettings() {
    const defaultSettings = getDefaultSettings();
    localStorage.setItem('settings', JSON.stringify(defaultSettings));
    loadSettings();
}

// Theme Functions
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.querySelectorAll('.theme-option').forEach(option => {
        option.classList.toggle('active', option.getAttribute('data-theme') === theme);
    });
}

// Font Functions
function changeFontSize(action) {
    const currentSize = parseInt(document.documentElement.style.fontSize) || 16;
    let newSize = currentSize;
    
    if (action === 'increase') {
        newSize = Math.min(currentSize + 2, 24);
    } else if (action === 'decrease') {
        newSize = Math.max(currentSize - 2, 12);
    }
    
    document.documentElement.style.fontSize = newSize + 'px';
    document.getElementById('currentFontSize').textContent = newSize + 'px';
}

function setFontFamily(fontFamily) {
    document.documentElement.style.fontFamily = fontFamily;
}

// Animation Functions
function toggleAnimations(enabled) {
    document.documentElement.classList.toggle('disable-animations', !enabled);
}

function toggleReduceMotion(enabled) {
    document.documentElement.classList.toggle('reduce-motion', enabled);
}

function setAnimationSpeed(speed) {
    document.documentElement.style.setProperty('--animation-speed', speed);
}

// Language Functions
function setLanguage(language) {
    document.documentElement.setAttribute('lang', language);
    // Additional language change logic would go here
}

// Accessibility Functions
function toggleHighContrast(enabled) {
    document.documentElement.classList.toggle('high-contrast', enabled);
}

function toggleScreenReader(enabled) {
    document.documentElement.classList.toggle('screen-reader', enabled);
}

// UI Update Functions
function updateUIElements(settings) {
    // Update theme selection
    document.querySelectorAll('.theme-option').forEach(option => {
        option.classList.toggle('active', option.getAttribute('data-theme') === settings.theme);
    });
    
    // Update font controls
    document.getElementById('currentFontSize').textContent = settings.fontSize + 'px';
    document.getElementById('fontFamily').value = settings.fontFamily;
    
    // Update animation controls
    document.getElementById('enableAnimations').checked = settings.enableAnimations;
    document.getElementById('reduceMotion').checked = settings.reduceMotion;
    document.getElementById('animationSpeed').value = settings.animationSpeed;
    
    // Update language selection
    document.getElementById('language').value = settings.language;
    
    // Update accessibility controls
    document.getElementById('highContrast').checked = settings.highContrast;
    document.getElementById('screenReader').checked = settings.screenReader;
}

// Notification Function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
