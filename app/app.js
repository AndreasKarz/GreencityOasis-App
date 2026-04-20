/**
 * Greencity Oasis App - JavaScript
 * Interactive functionality for the tablet app
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initDateTime();
    initSoundWidget();
    initWeatherWidget();
    initTransportWidget();
    initFloorPlan();
    initInstructions();
    initSearch();
    
    // Re-initialize Lucide icons after DOM updates
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

/**
 * Date and Time Display
 * Updates every second with current date and time in German format
 */
function initDateTime() {
    const dateTimeElement = document.getElementById('dateTime');
    
    function updateDateTime() {
        const now = new Date();
        
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        
        dateTimeElement.textContent = now.toLocaleDateString('de-CH', options);
    }
    
    updateDateTime();
    setInterval(updateDateTime, 1000);
}

/**
 * Sound Widget - Balcony Audio Selection
 */
function initSoundWidget() {
    const soundOptions = document.querySelectorAll('.sound-option');
    const playButton = document.querySelector('.btn-icon');
    const volumeSlider = document.querySelector('.slider');
    let currentSound = null;
    let isPlaying = false;
    
    // Sound descriptions
    const soundDescriptions = {
        sommerwald: 'Ruhige Waldgeräusche mit Vogelgezwitscher',
        bach: 'Plätscherndes Wasser eines Bergbachs',
        meer: 'Entspannendes Meeresrauschen',
        voegel: 'Fröhliches Vogelgezwitscher',
        regen: 'Beruhigender leichter Regen'
    };
    
    soundOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            soundOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to selected option
            this.classList.add('active');
            
            currentSound = this.dataset.sound;
            
            // Visual feedback
            showNotification(`"${this.querySelector('span').textContent}" ausgewählt`);
        });
    });
    
    if (playButton) {
        playButton.addEventListener('click', function() {
            if (!currentSound) {
                showNotification('Bitte wähle zuerst einen Sound aus', 'warning');
                return;
            }
            
            isPlaying = !isPlaying;
            const icon = this.querySelector('svg');
            
            if (isPlaying) {
                // Change to pause icon
                icon.innerHTML = '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>';
                showNotification(`"${soundDescriptions[currentSound]}" wird abgespielt`);
            } else {
                // Change to play icon
                icon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"></polygon>';
                showNotification('Wiedergabe pausiert');
            }
        });
    }
    
    if (volumeSlider) {
        volumeSlider.addEventListener('input', function() {
            const volumeIcon = this.parentElement.querySelector('svg');
            const value = parseInt(this.value);
            
            // Update volume icon based on level
            if (value === 0) {
                volumeIcon.innerHTML = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>';
            } else if (value < 50) {
                volumeIcon.innerHTML = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>';
            } else {
                volumeIcon.innerHTML = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>';
            }
        });
    }
}

/**
 * Weather Widget - Forecast Toggle
 */
function initWeatherWidget() {
    const weatherTabs = document.querySelectorAll('.weather-tab');
    const forecastContainer = document.getElementById('weatherForecast');
    
    // Extended forecast data
    const forecastData = {
        1: [], // Current day only
        3: [
            { day: 'Mo', icon: 'sun', temp: '20° / 14°' },
            { day: 'Di', icon: 'cloud-sun', temp: '18° / 13°' },
            { day: 'Mi', icon: 'cloud-rain', temp: '16° / 12°' }
        ],
        7: [
            { day: 'Mo', icon: 'sun', temp: '20° / 14°' },
            { day: 'Di', icon: 'cloud-sun', temp: '18° / 13°' },
            { day: 'Mi', icon: 'cloud-rain', temp: '16° / 12°' },
            { day: 'Do', icon: 'cloud', temp: '17° / 11°' },
            { day: 'Fr', icon: 'sun', temp: '19° / 13°' },
            { day: 'Sa', icon: 'cloud-sun', temp: '21° / 15°' },
            { day: 'So', icon: 'sun', temp: '22° / 16°' }
        ]
    };
    
    weatherTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            weatherTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to selected tab
            this.classList.add('active');
            
            const days = parseInt(this.dataset.days);
            updateForecast(days);
        });
    });
    
    function updateForecast(days) {
        if (!forecastContainer) return;
        
        const data = forecastData[days] || forecastData[3];
        
        forecastContainer.innerHTML = data.map(day => `
            <div class="forecast-day">
                <span class="forecast-day-name">${day.day}</span>
                <i data-lucide="${day.icon}" class="forecast-icon"></i>
                <span class="forecast-temp">${day.temp}</span>
            </div>
        `).join('');
        
        // Re-initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
}

/**
 * Transport Widget - Filter by Type
 */
function initTransportWidget() {
    const transportTabs = document.querySelectorAll('.transport-tab');
    const scheduleItems = document.querySelectorAll('.schedule-item');
    
    transportTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            transportTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to selected tab
            this.classList.add('active');
            
            const type = this.dataset.type;
            
            scheduleItems.forEach(item => {
                if (type === 'all') {
                    item.style.display = 'flex';
                } else {
                    const lineClass = item.querySelector('.schedule-line').classList;
                    if (lineClass.contains(type)) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });
}

/**
 * Floor Plan - Interactive Info Icons
 */
function initFloorPlan() {
    const infoIcons = document.querySelectorAll('.info-icon');
    
    infoIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const item = this.dataset.item;
            const location = this.dataset.location;
            
            showNotification(`${item} befindet sich im ${location}`, 'info', 3000);
            
            // Visual feedback
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
        
        // Add tooltip on hover
        icon.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });
}

/**
 * Instructions Widget - Expand Details
 */
function initInstructions() {
    const instructionItems = document.querySelectorAll('.instruction-item');
    
    instructionItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            
            // In a real app, this would open a modal or navigate to a detail page
            showNotification(`Anleitung für "${title}" wird geöffnet...`, 'info', 2000);
        });
    });
}

/**
 * Search Functionality
 */
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    performSearch(query);
                }
            }
        });
        
        // Real-time search feedback
        searchInput.addEventListener('input', function() {
            const query = this.value.trim();
            if (query.length > 2) {
                // Could implement live search suggestions here
            }
        });
    }
}

function performSearch(query) {
    // In a real app, this would search through all content
    const searchableItems = [
        'Kaffeemaschine', 'Smart TV', 'Plex', 'Waschmaschine', 
        'Trockner', 'Soundbar', 'Balkon', 'WLAN', 'Staubsauger',
        'Bügelbrett', 'Wetter', 'Fahrplan', ' Tram', 'Bus'
    ];
    
    const results = searchableItems.filter(item => 
        item.toLowerCase().includes(query.toLowerCase())
    );
    
    if (results.length > 0) {
        showNotification(`${results.length} Ergebnis(se) gefunden: ${results.join(', ')}`, 'success', 4000);
    } else {
        showNotification('Keine Ergebnisse gefunden', 'warning', 3000);
    }
}

/**
 * Notification System
 */
function showNotification(message, type = 'default', duration = 2500) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        padding: '16px 24px',
        background: type === 'warning' ? '#D8A864' : type === 'success' ? '#5C8A6F' : '#78AA8C',
        color: '#F7F7F4',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        zIndex: '1000',
        fontFamily: 'Inter, sans-serif',
        fontWeight: '500',
        animation: 'slideIn 0.3s ease-out',
        maxWidth: '400px'
    });
    
    document.body.appendChild(notification);
    
    // Auto-remove after duration
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// Add notification animations to stylesheet
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/**
 * Utility: Format relative time for transport schedule
 */
function getRelativeTime(minutes) {
    if (minutes < 1) return 'jetzt';
    if (minutes === 1) return 'in 1 Min.';
    if (minutes < 60) return `in ${minutes} Min.`;
    
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (mins === 0) return `in ${hours} Std.`;
    return `in ${hours} Std. ${mins} Min.`;
}

/**
 * Utility: Get day name in German
 */
function getGermanDayName(date) {
    const days = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
    return days[date.getDay()];
}

console.log('🌿 Greencity Oasis App initialized successfully!');
