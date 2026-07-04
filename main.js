// main.js

// 1. Imports (Agar aapne filters.js aur chat.js banayi hain)
import { initFilters } from './filters.js';
import { initChat } from './chat.js';

// 2. Event Listeners (Jo aapne abhi maange)
document.addEventListener('DOMContentLoaded', () => {
    
    // Chat Trigger Logic
    const chatBtn = document.getElementById('btn-chat-trigger');
    const closeBtn = document.getElementById('close-chat');
    const chatPopup = document.getElementById('chat-popup');

    if (chatBtn) {
        chatBtn.addEventListener('click', () => {
            chatPopup.style.display = 'block';
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            chatPopup.style.display = 'none';
        });
    }

    // Filters Event Listener
    const occasionFilter = document.getElementById('occasion-filter');
    if (occasionFilter) {
        occasionFilter.addEventListener('change', () => {
            alert("Filtering by: " + occasionFilter.value);
            // Yahan aap apna filter logic call kar sakte hain
        });
    }

    // 3. Modules Init
    initFilters();
    initChat();
});