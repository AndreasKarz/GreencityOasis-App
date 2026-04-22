// ==========================================================================
// Greencity Oasis App - JavaScript
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Update date and time
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Sound widget functionality
    initSoundWidget();

    // Weather tabs functionality
    initWeatherTabs();

    // Transport tabs functionality
    initTransportTabs();

    // Floor plan info icons
    initFloorPlanIcons();

    // Instruction items click handlers
    initInstructionItems();
});

// --------------------------------------------------------------------------
// Date & Time
// --------------------------------------------------------------------------
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
    const dateTimeString = now.toLocaleDateString('de-CH', options);
    document.getElementById('dateTime').textContent = dateTimeString;
}

// --------------------------------------------------------------------------
// Sound Widget
// --------------------------------------------------------------------------
function initSoundWidget() {
    const soundOptions = document.querySelectorAll('.sound-option');
    const playButton = document.getElementById('playButton');
    const volumeSlider = document.getElementById('volumeSlider');
    let isPlaying = false;
    let currentSound = 'sommerwald';

    soundOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove active class from all options
            soundOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            option.classList.add('active');
            currentSound = option.dataset.sound;
            
            console.log(`Sound selected: ${currentSound}`);
            showNotification(`Sound "${option.querySelector('span').textContent}" ausgewählt`);
        });
    });

    playButton.addEventListener('click', () => {
        isPlaying = !isPlaying;
        const icon = playButton.querySelector('svg');
        
        if (isPlaying) {
            icon.setAttribute('data-lucide', 'pause');
            showNotification(`"${currentSound}" wird abgespielt`);
        } else {
            icon.setAttribute('data-lucide', 'play');
            showNotification('Wiedergabe pausiert');
        }
        
        lucide.createIcons();
    });

    volumeSlider.addEventListener('input', (e) => {
        console.log(`Volume: ${e.target.value}%`);
    });
}

// --------------------------------------------------------------------------
// Weather Tabs
// --------------------------------------------------------------------------
function initWeatherTabs() {
    const weatherTabs = document.querySelectorAll('.weather-tab');
    const forecastContainer = document.getElementById('weatherForecast');
    
    const forecasts = {
        1: [
            { day: 'Mo', icon: 'sun', temp: '20° / 14°' },
            { day: 'Di', icon: 'cloud-sun', temp: '18° / 13°' },
            { day: 'Mi', icon: 'cloud-rain', temp: '16° / 12°' }
        ],
        3: [
            { day: 'Mo', icon: 'sun', temp: '20° / 14°' },
            { day: 'Di', icon: 'cloud-sun', temp: '18° / 13°' },
            { day: 'Mi', icon: 'cloud-rain', temp: '16° / 12°' },
            { day: 'Do', icon: 'cloud', temp: '15° / 11°' },
            { day: 'Fr', icon: 'sun', temp: '19° / 13°' }
        ],
        7: [
            { day: 'Mo', icon: 'sun', temp: '20° / 14°' },
            { day: 'Di', icon: 'cloud-sun', temp: '18° / 13°' },
            { day: 'Mi', icon: 'cloud-rain', temp: '16° / 12°' },
            { day: 'Do', icon: 'cloud', temp: '15° / 11°' },
            { day: 'Fr', icon: 'sun', temp: '19° / 13°' },
            { day: 'Sa', icon: 'sun', temp: '21° / 15°' },
            { day: 'So', icon: 'cloud-sun', temp: '19° / 14°' }
        ]
    };

    weatherTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update tab styles
            weatherTabs.forEach(t => {
                t.classList.remove('tab-active');
                t.classList.add('tab-inactive');
            });
            tab.classList.remove('tab-inactive');
            tab.classList.add('tab-active');

            // Update forecast display
            const days = tab.dataset.days;
            const forecast = forecasts[days];
            
            forecastContainer.innerHTML = forecast.map(day => `
                <div class="flex-1 flex flex-col items-center gap-2 p-3 bg-white/50 rounded-md">
                    <span class="text-xs font-semibold text-neutral-500 uppercase">${day.day}</span>
                    <i data-lucide="${day.icon}" class="w-8 h-8 text-calm-jade"></i>
                    <span class="text-sm font-semibold text-warm-gray">${day.temp}</span>
                </div>
            `).join('');
            
            lucide.createIcons();
            showNotification(`${days}-Tage-Vorschau angezeigt`);
        });
    });
}

// --------------------------------------------------------------------------
// Transport Tabs
// --------------------------------------------------------------------------
function initTransportTabs() {
    const transportTabs = document.querySelectorAll('.transport-tab');
    const scheduleList = document.getElementById('scheduleList');
    
    transportTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update tab styles
            transportTabs.forEach(t => {
                t.classList.remove('tab-active');
                t.classList.add('tab-inactive');
            });
            tab.classList.remove('tab-inactive');
            tab.classList.add('tab-active');

            const filterType = tab.dataset.type;
            const scheduleItems = scheduleList.querySelectorAll('.schedule-item');
            
            scheduleItems.forEach(item => {
                if (filterType === 'all' || item.dataset.type === filterType) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
            
            showNotification(`Filter: ${tab.textContent}`);
        });
    });
}

// --------------------------------------------------------------------------
// Floor Plan Icons
// --------------------------------------------------------------------------
function initFloorPlanIcons() {
    const infoIcons = document.querySelectorAll('.info-icon');
    
    infoIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const item = icon.dataset.item;
            const location = icon.dataset.location;
            showNotification(`${item} befindet sich im ${location}`);
        });
        
        icon.addEventListener('mouseenter', () => {
            icon.querySelector('circle').style.fill = '#5C8A6F';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.querySelector('circle').style.fill = '#78AA8C';
        });
    });
}

// --------------------------------------------------------------------------
// Instruction Items
// --------------------------------------------------------------------------
function initInstructionItems() {
    const instructionItems = document.querySelectorAll('.instruction-item');
    
    instructionItems.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.querySelector('h3').textContent;
            showNotification(`Anleitung für "${title}" wird geöffnet...`);
        });
    });
}

// --------------------------------------------------------------------------
// Notification System
// --------------------------------------------------------------------------
function showNotification(message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification fixed bottom-6 right-6 bg-warm-gray text-soft-white px-6 py-4 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-y-0 opacity-100';
    notification.innerHTML = `
        <div class="flex items-center gap-3">
            <i data-lucide="info" class="w-5 h-5 text-calm-jade"></i>
            <span class="font-medium">${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    lucide.createIcons();
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
