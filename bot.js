const botKnowledgeBase = {
    en: [
        { q: "📍 How does Live Map Tracking work?", a: "The Live Map renders color-coded circles for skills around you (Teal for Tech, Purple for Music, Orange for Trades). Markers drift automatically in real-time to show active tracking telemetry zones of users!" },
        { q: "🔄 How do I swap a skill here?", a: "Go to the Marketplace tab, look for a skill card you need, and check what they want in return. If you match, click 'Lock Exchange Deal' to process it cashlessly!" },
        { q: "🪙 What are Swap Coins & Rewards?", a: "Every time you publish a post or successfully swap skills, you earn 50 CC Swap Coins. You can check your wallet and burn these points in the Coins & Rewards section to claim food vouchers or delivery passes!" },
        { q: "📊 What is the Analytics Hub?", a: "The Analytics section draws real-time charts demonstrating what local skills are in high demand this week, alongside platform-wide success matrices." }
    ],
    hi: [
        { q: "📍 लाइव मैप ट्रैकिंग कैसे काम करती है?", a: "लाइव मैप आपके आस-पास के हुनरमंदों को रंगों द्वारा दिखाता है (Tech के लिए Cyan, संगीत के लिए पर्पल, कारीगरी के लिए संतरा)। ये मार्कर्स हर 4 सेकंड में लाइव खिसकते हैं ताकि लाइव लोकेशन सिग्नल ट्रैक हो सके!" },
        { q: "🔄 हुनर का एक्सचेंज (Swap) कैसे करें?", a: "बाज़ार (Marketplace) टैब पर जाएं, अपनी पसंद का काम ढूंढें और देखें कि उन्हें बदले में क्या चाहिए। सौदा पसंद आने पर 'Lock Exchange Deal' दबाएं, कोई नकद पैसा नहीं लगेगा!" },
        { q: "🪙 स्वैप कॉइन और इनाम क्या हैं?", a: "हर बार जब आप नया पोस्ट डालते हैं या एक्सचेंज सौदा पूरा करते हैं, तो आपको 50 CC सिक्के मिलते हैं। इन सिक्कों को आप इनाम (Rewards) टैब में जाकर अमेज़न या जोमैटो के फ्री वाउचर्स के लिए रिडीम कर सकते हैं!" },
        { q: "📊 आंकड़े (Analytics) हब क्या है?", a: "एनालिटिक्स हब चार्ट्स के ज़रिए आपको दिखाता है कि इस हफ्ते आपके इलाके में किस हुनर की सबसे ज़्यादा डिमांड है, ताकि आप वही सीख या सिखा सकें।" }
    ]
};

class JugaadBotEngine {
    constructor() {
        this.win = document.getElementById("bot-chat-window");
        this.launcher = document.getElementById("bot-toggle-launcher");
        this.closeBtn = document.getElementById("bot-close-btn");
        this.chatBody = document.getElementById("bot-chat-body");
        this.optionsContainer = document.getElementById("bot-chat-options");
    }

    init() {
        if (!this.win || !this.launcher) return;

        this.launcher.addEventListener("click", () => this.win.classList.toggle("hidden"));
        if(this.closeBtn) {
            this.closeBtn.addEventListener("click", () => this.win.classList.add("hidden"));
        }
        
        this.renderPrompts(window.currentLanguage || "en");
    }

    renderPrompts(lang) {
        if (!this.optionsContainer) return;
        this.optionsContainer.innerHTML = "";
        
        const prompts = botKnowledgeBase[lang] || botKnowledgeBase["en"];
        prompts.forEach(item => {
            const btn = document.createElement("button");
            btn.className = "bot-opt-btn";
            btn.innerText = item.q;
            btn.addEventListener("click", () => this.handleDialogTurn(item.q, item.a));
            this.optionsContainer.appendChild(btn);
        });
    }

    handleDialogTurn(userQuestion, botAnswer) {
        if (!this.chatBody) return;

        const userBubble = document.createElement("div");
        userBubble.className = "bot-msg-bubble user";
        userBubble.innerHTML = `<p>${userQuestion}</p>`;
        this.chatBody.appendChild(userBubble);
        
        setTimeout(() => {
            const systemBubble = document.createElement("div");
            systemBubble.className = "bot-msg-bubble system";
            systemBubble.innerHTML = `<p>${botAnswer}</p>`;
            this.chatBody.appendChild(systemBubble);
            this.chatBody.scrollTop = this.chatBody.scrollHeight;
        }, 400);
        
        this.chatBody.scrollTop = this.chatBody.scrollHeight;
    }
}

window.jugaadBot = new JugaadBotEngine();