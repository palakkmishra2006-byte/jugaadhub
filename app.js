// Spatial Management Configurations & Localisation State Indexes
let map;
let markersLayer;
let skillsChartInstance;
let userWalletBalance = 250;
let currentLanguage = "en";
let userLiveMarker = null; 

// Dual Language Full Dictionaries Setup for Ground-Level Operations
const translations = {
    en: {
        logoHub: "Jugaad", logoLocal: "Hub",
        navDashboard: "Dashboard", navMarketplace: "Marketplace", navAnalytics: "Analytics Hub", navRewards: "Coins & Rewards",
        createBtn: "Create Listing",
        gpsBtnConnect: "Connect Live GPS", gpsBtnActive: "GPS Connected Live",
        mapTitle: "Hyperlocal Live Skills Tracking", mapStatus: "Live Multi-Vector Tracking Engine Active",
        legTech: "Tech", legMusic: "Music", legTrades: "Trades",
        signalsTitle: "Active Local Activity Signals",
        heroTitle: "Trade Skills. Build Ecosystems. Zero Cash.",
        searchPlaceholder: "Search Python, Classical Guitar, Appliance Repairs...",
        catFilterAll: "All Ecosystems", catFilterTech: "Tech & Coding", catFilterMusic: "Music & Arts", catFilterTrades: "Handyman & Trades",
        chartTitle: "Top High-Demand Skill Ecosystem Trading Index", macroTitle: "Platform Macro Turnover Data",
        metricSwaps: "Successful Local Swaps Settled", metricResolution: "Community Resolution Success Index", metricCoins: "CC Coins Minted over Verifications",
        walletTitle: "Centralized Swap Coins Wallet", walletDesc: "Earn 50 CC Coins for every completed swap and proof-of-verification file upload!",
        coinsSmall: "CC Coins", rewardShopTitle: "Redeem Local Partner Ecosystem Rewards",
        modalHeading: "Broadcast New Local Offer/Request Vector",
        lblTitle: "Listing Title", lblType: "Type Vector", lblCategory: "Category Node",
        lblHave: "Skill I Have", lblWant: "Counter-Skill Demanded", lblDesc: "Operational Description",
        btnSubmit: "Publish to Interactive Geospatial Layer",
        optOffer: "Offering a Skill", optRequest: "Requesting a Skill",
        alertDeal: "Deal Terms Initialized! 50 CC SwapCoins credited to your Centralized Ecosystem Wallet for engagement!",
        alertSuccess: "Redemption Succeeded! Digital voucher access code matrix dispatched successfully for Item node: ",
        alertFail: "Insufficient Swap Coins Balance Matrix! Complete more neighborhood skill barters to mint coins.",
        botHeader: "Jugaad Dost", botOnline: "Online Assistant", botLauncher: "Help",
        botWelcome: "Hello user! Welcome to Jugaad Hub. How can I help you understand our features today?",
        gpsSuccess: "Your Live Location has been securely integrated into the Hyperlocal Map Vector!",
        gpsError: "Unable to retrieve your live coordinates. Please allow location permissions in your browser."
    },
    hi: {
        logoHub: "जुगाड़", logoLocal: "हब",
        navDashboard: "डैशबोर्ड", navMarketplace: "बाज़ार (Market)", navAnalytics: "आंकड़े (Analytics)", navRewards: "सिक्के और इनाम",
        createBtn: "नया पोस्ट बनाएं",
        gpsBtnConnect: "लाइव GPS कनेक्ट करें", gpsBtnActive: "लाइव GPS सक्रिय है",
        mapTitle: "आस-पास के लाइव हुनर (Skills) की ट्रैकिंग", mapStatus: "लाइव मल्टी-वेक्टर ट्रैकिंग सिस्टम सक्रिय है",
        legTech: "तकनीकी (Tech)", legMusic: "संगीत/कला", legTrades: "कारीगरी (Trades)",
        signalsTitle: "आस-पास की लाइव गतिविधियां",
        heroTitle: "हुनर का आदान-प्रदान करें। बिना पैसों के।",
        searchPlaceholder: "पायठन, गिटार, बिजली रिपेयर खोजें...",
        catFilterAll: "सभी श्रेणियां", catFilterTech: "टेक और कोडिंग", catFilterMusic: "संगीत और कला", catFilterTrades: "कारीगरी और मरम्मत",
        chartTitle: "उच्च मांग वाले हुनर का ट्रेडिंग इंडेक्स", macroTitle: "प्लेटफ़ॉर्म का कुल टर्नओवर डेटा",
        metricSwaps: "सफलतापूर्वक किए गए हुनर एक्सचेंज", metricResolution: "सामुदायिक समाधान सफलता सूचकांक", metricCoins: "सत्यापन पर जनरेट हुए कुल सिक्के",
        walletTitle: "केंद्रीयकृत स्वैप कॉइन वॉलेट", walletDesc: "हर सफल एक्सचेंज और सत्यापन फ़ाइल अपलोड करने पर 50 CC कॉइन कमाएं!",
        coinsSmall: "सिक्के (Coins)", rewardShopTitle: "स्थानीय पार्टनर इकोसिस्टम पुरस्कारों को रिडीम करें",
        modalHeading: "नया हुनर ऑफ़र / अनुरोध दर्ज करें",
        lblTitle: "लिस्टिंग का शीर्षक (Title)", lblType: "प्रकार (Type)", lblCategory: "श्रेणी (Category)",
        lblHave: "हुनर जो मेरे पास hai", lblWant: "बदले में जो हुनर चाहिए", lblDesc: "विवरण (Description)",
        btnSubmit: "लाइव नक्शे पर पब्लिश करें",
        optOffer: "हुनर दे रहे हैं (Offering)", optRequest: "हुनर चाहिए (Requesting)",
        alertDeal: "सौदा पक्का हुआ! सक्रिय भागीदारी के लिए आपके इकोसिस्टम वॉलेट में 50 CC स्वैप कॉइन जमा कर दिए गए हैं!",
        alertSuccess: "रिफंड/रिडीम सफल! डिजिटल वाउचर कोड इस आइटम नोड के लिए भेज दिया गया है: ",
        alertFail: "वॉLET में सिक्के कम हैं! अधिक सिक्के कमाने के लिए आस-पास के लोगों के साथ और एक्सचेंज पूरे करें।",
        botHeader: "जुगाड़ दोस्त", botOnline: "सहायक बॉट ऑनलाइन", botLauncher: "मदद",
        botWelcome: "नमस्ते! जुगाड़ हब पर आपका स्वागत है। आज मैं ऐप के फीचर्स समझने में आपकी क्या मदद कर सकता हूँ?",
        gpsSuccess: "आपकी लाइव लोकेशन को सुरक्षित रूप से हाइपरलोकल मैप पर जोड़ दिया गया है!",
        gpsError: "आपकी लाइव लोकेशन नहीं मिल सकी। कृपया अपने ब्राउज़र में लोकेशन परमिशन को अलाउ (Allow) करें।"
    }
};

// Central Relational Database Structures
let listingsData = [
    { id: 1, name: "Amit Sharma", karma: 4.9, type: "Offering", category: "Tech", skillHave: "Full-Stack React Frameworks", skillWant: "Acoustic Guitar Tuning", title: "React/Node Advanced Mentor", desc: "Offering industry architecture reviews for beginner web builders.", lat: 28.6139, lng: 77.2090 },
    { id: 2, name: "Priya Patel", karma: 4.8, type: "Offering", category: "Music", skillHave: "Classical Indian Sitar", skillWant: "Video Script Editing", title: "Sitar Training for Starters", desc: "Learn essential ragas and rhythm patterns locally.", lat: 28.6220, lng: 77.2210 },
    { id: 3, name: "Rohan Verma", karma: 4.7, type: "Requesting", category: "Trades", skillHave: "Home Electric Repairing", skillWant: "Spoken German Basics", title: "Certified Electrician Wants German Practice", desc: "Will fix household line faults for conversational assistance.", lat: 28.6050, lng: 77.1920 },
    { id: 4, name: "Kiran Rao", karma: 5.0, type: "Offering", category: "Tech", skillHave: "Python Data Wrangling", skillWant: "Carpentry Basics", title: "Python/Pandas Automation Training", desc: "Can write customized scripts to organize messy data files.", lat: 28.6310, lng: 77.2350 }
];

let rewardCatalog = [
    { id: "AMZ50", name: "Amazon Voucher (Worth ₹100)", price: 150, provider: "Ecosystem Partner" },
    { id: "ZOM100", name: "Zomato Dineout Discount Coupon", price: 200, provider: "Local Food Association" },
    { id: "SWG50", name: "Swiggy Delivery Waiver Premium", price: 100, provider: "Delivery Network Hub" }
];

document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    initGeospatialSystem();
    initAnalyticsVisuals();
    renderMarketplaceFeed(listingsData);
    renderRewardsStore();
    setupUnifiedControlRoutings();
    
    if (window.jugaadBot) {
        window.jugaadBot.init();
    }
    
    applyLanguageSelectorEngine("en");
    startLiveCoordinateTrackingSimulation();
});

function initGeospatialSystem() {
    map = L.map('map-canvas', { attributionControl: false }).setView([28.6139, 77.2090], 13);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png').addTo(map);
    markersLayer = L.layerGroup().addTo(map);
    generateMapVectors(listingsData);
}

function generateMapVectors(data) {
    markersLayer.clearLayers();
    const colorCategoryMap = { 'Tech': '#2fd8a7', 'Music': '#9d5bf1', 'Trades': '#ff9f1c' };

    data.forEach(node => {
        const themeColor = colorCategoryMap[node.category] || '#ffffff';
        let vectorMarker = L.circleMarker([node.lat, node.lng], {
            radius: 11, fillColor: themeColor, color: '#0a0f1d', weight: 2, opacity: 1, fillOpacity: 0.9
        });

        vectorMarker.bindPopup(`
            <div style="font-family:'Inter'; font-size:13px; color:#1e293b; min-width:160px;">
                <strong style="font-size:14px; display:block; margin-bottom:4px;">${node.name}</strong>
                <b>${currentLanguage === 'en' ? 'Offers' : 'हुनर'}:</b> ${node.skillHave}<br>
                <b>${currentLanguage === 'en' ? 'Needs' : 'आवश्यकता'}:</b> ${node.skillWant}
            </div>
        `);
        markersLayer.addLayer(vectorMarker);
    });
    
    if(userLiveMarker) {
        userLiveMarker.addTo(map);
    }
}

function startLiveCoordinateTrackingSimulation() {
    setInterval(() => {
        listingsData.forEach(user => {
            user.lat += (Math.random() - 0.5) * 0.0016;
            user.lng += (Math.random() - 0.5) * 0.0016;
        });
        generateMapVectors(listingsData);
        pushLiveTelemetrySignal();
    }, 4000);
}

function pushLiveTelemetrySignal() {
    const feed = document.getElementById("mini-signals-feed");
    if(!feed) return;
    const sampleNames = ["Amit Sharma", "Priya Patel", "Rohan Verma", "Kiran Rao"];
    const chosenUser = sampleNames[Math.floor(Math.random() * sampleNames.length)];
    
    const log = document.createElement("div");
    log.className = "signal-card";
    
    const textLog = currentLanguage === "en" 
        ? `${chosenUser}'s local swap zone location pinged active.` 
        : `${chosenUser} का लाइव लोकेशन सिग्नल सक्रिय हुआ।`;
        
    log.innerHTML = `
        <div class="signal-icon" style="color:var(--accent-teal)"><i data-lucide="refresh-cw"></i></div>
        <div>
            <div style="font-size:0.85rem; font-weight:600;">${currentLanguage === 'en' ? 'Telemetry Vector Updated' : 'लोकेशन सिग्नल अपडेट'}</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">${textLog}</div>
        </div>
    `;
    feed.prepend(log);
    if(feed.children.length > 5) feed.lastChild.remove();
    lucide.createIcons();
}

function initAnalyticsVisuals() {
    const ctx = document.getElementById('skillsChart').getContext('2d');
    if(!ctx) return;
    skillsChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Tech Systems', 'Music Core', 'Handyman Trades', 'Language Nodes'],
            datasets: [{
                data: [42, 28, 19, 31],
                backgroundColor: ['#2fd8a7', '#9d5bf1', '#ff9f1c', '#3b82f6'],
                borderRadius: 8
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } }, x: { ticks: { color: '#94a3b8' } } }
        }
    });
}

function applyLanguageSelectorEngine(lang) {
    currentLanguage = lang;
    window.currentLanguage = lang; 
    const item = translations[lang];

    document.getElementById("logo-container").innerHTML = `${item.logoHub}<span class="accent-violet">${item.logoLocal}</span>`;
    document.querySelector("#nav-dashboard span").innerText = item.navDashboard;
    document.querySelector("#nav-marketplace span").innerText = item.navMarketplace;
    document.querySelector("#nav-analytics span").innerText = item.navAnalytics;
    document.querySelector("#nav-rewards span").innerText = item.navRewards;
    document.getElementById("text-create-btn").innerText = item.createBtn;
    
    const gpsBtnSpan = document.getElementById("text-gps-btn");
    if(gpsBtnSpan) {
        gpsBtnSpan.innerText = userLiveMarker ? item.gpsBtnActive : item.gpsBtnConnect;
    }

    document.getElementById("map-section-title").innerHTML = `<i data-lucide="navigation"></i> ${item.mapTitle}`;
    document.getElementById("map-status-txt").innerText = item.mapStatus;
    document.getElementById("leg-tech").innerText = item.legTech;
    document.getElementById("leg-music").innerText = item.legMusic;
    document.getElementById("leg-trades").innerText = item.legTrades;
    document.getElementById("signals-title").innerHTML = `<i data-lucide="activity"></i> ${item.signalsTitle}`;
    document.getElementById("hero-main-title").innerHTML = item.heroTitle;
    document.getElementById("global-search").placeholder = item.searchPlaceholder;

    const filterSelect = document.getElementById("category-filter");
    if(filterSelect) {
        filterSelect.options[0].text = item.catFilterAll;
        filterSelect.options[1].text = item.catFilterTech;
        filterSelect.options[2].text = item.catFilterMusic;
        filterSelect.options[3].text = item.catFilterTrades;
    }

    document.getElementById("chart-section-title").innerHTML = `<i data-lucide="bar-chart-3"></i> ${item.chartTitle}`;
    document.getElementById("macro-data-title").innerHTML = `<i data-lucide="trending-up"></i> ${item.macroTitle}`;
    document.getElementById("lbl-metric-swaps").innerText = item.metricSwaps;
    document.getElementById("lbl-metric-resolution").innerText = item.metricResolution;
    document.getElementById("lbl-metric-coins").innerText = item.metricCoins;

    document.getElementById("wallet-title").innerHTML = `<i data-lucide="wallet" class="accent-teal"></i> ${item.walletTitle}`;
    document.getElementById("wallet-desc").innerText = item.walletDesc;
    document.getElementById("lbl-cc-coins-small").innerText = item.coinsSmall;
    document.getElementById("reward-shop-title").innerHTML = `<i data-lucide="shopping-bag"></i> ${item.rewardShopTitle}`;
    
    document.getElementById("modal-heading").innerText = item.modalHeading;
    document.getElementById("lbl-form-title").innerText = item.lblTitle;
    document.getElementById("lbl-form-type").innerText = item.lblType;
    document.getElementById("lbl-form-category").innerText = item.lblCategory;
    document.getElementById("lbl-form-have").innerText = item.lblHave;
    document.getElementById("lbl-form-want").innerText = item.lblWant;
    document.getElementById("lbl-form-desc").innerText = item.lblDesc;
    document.getElementById("btn-submit-form").innerText = item.btnSubmit;

    const formType = document.getElementById("form-type");
    if(formType) {
        formType.options[0].text = item.optOffer;
        formType.options[1].text = item.optRequest;
    }

    const formCat = document.getElementById("form-category");
    if(formCat) {
        formCat.options[0].text = item.catFilterTech;
        formCat.options[1].text = item.catFilterMusic;
        formCat.options[2].text = item.catFilterTrades;
    }

    document.getElementById("bot-header-title").innerText = item.botHeader;
    document.getElementById("bot-status-sub").innerText = item.botOnline;
    document.getElementById("bot-badge-txt").innerText = item.botLauncher;
    document.getElementById("bot-welcome-msg").innerText = item.botWelcome;

    if (window.jugaadBot) {
        window.jugaadBot.renderPrompts(lang);
    }

    generateMapVectors(listingsData);
    renderRewardsStore();
    renderMarketplaceFeed(listingsData);
    lucide.createIcons();
}

function setupUnifiedControlRoutings() {
    // REAL-TIME GPS HARDWARE CONTROLLER
    document.getElementById("connect-gps-btn").addEventListener("click", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;
                    
                    if (userLiveMarker) {
                        map.removeLayer(userLiveMarker);
                    }
                    
                    userLiveMarker = L.layerGroup();
                    
                    let pulseArea = L.circle([userLat, userLng], {
                        radius: 250, color: '#2fd8a7', fillColor: '#2fd8a7', fillOpacity: 0.15, weight: 1
                    }).addTo(userLiveMarker);
                    
                    let corePoint = L.circleMarker([userLat, userLng], {
                        radius: 9, fillColor: '#3b82f6', color: '#ffffff', weight: 3, opacity: 1, fillOpacity: 1
                    }).bindPopup(`<b>${currentLanguage === 'en' ? 'Your Live Node' : 'आपकी लाइव लोकेशन'}</b>`).addTo(userLiveMarker);
                    
                    userLiveMarker.addTo(map);
                    map.setView([userLat, userLng], 14); 
                    
                    alert(translations[currentLanguage].gpsSuccess);
                    document.getElementById("text-gps-btn").innerText = translations[currentLanguage].gpsBtnActive;
                },
                () => {
                    alert(translations[currentLanguage].gpsError);
                }
            );
        } else {
            alert("Geolocation is not supported by your browser network.");
        }
    });

    document.getElementById("language-toggle").addEventListener("change", (e) => {
        applyLanguageSelectorEngine(e.target.value);
    });

    document.querySelectorAll(".nav-icon-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            document.querySelectorAll(".nav-icon-btn").forEach(b => b.classList.remove("active"));
            const targetButton = e.currentTarget;
            targetButton.classList.add("active");

            const routeTarget = targetButton.getAttribute("data-target");
            document.querySelectorAll(".portal-view").forEach(view => view.classList.add("hidden"));
            document.getElementById(`${routeTarget}-view`).classList.remove("hidden");

            if(routeTarget === 'dashboard') {
                setTimeout(() => map.invalidateSize(), 150);
            }
        });
    });

    document.getElementById("theme-toggle").addEventListener("click", () => {
        const root = document.documentElement;
        const currentTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", currentTheme);
        document.getElementById("theme-icon").setAttribute("data-lucide", currentTheme === "dark" ? "sun" : "moon");
        lucide.createIcons();
    });

    const modal = document.getElementById("listing-modal");
    document.getElementById("open-modal-btn").addEventListener("click", () => modal.classList.remove("hidden"));
    document.getElementById("close-modal-btn").addEventListener("click", () => modal.classList.add("hidden"));

    document.getElementById("new-listing-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const freshListing = {
            id: listingsData.length + 1,
            name: currentLanguage === 'en' ? "Palak (You)" : "पलक (आप)",
            karma: 5.0,
            type: document.getElementById("form-type").value,
            category: document.getElementById("form-category").value,
            skillHave: document.getElementById("form-skill-have").value,
            skillWant: document.getElementById("form-skill-want").value,
            title: document.getElementById("form-title").value,
            desc: document.getElementById("form-desc").value,
            lat: 28.6139 + (Math.random() - 0.5) * 0.04,
            lng: 77.2090 + (Math.random() - 0.5) * 0.04
        };

        listingsData.unshift(freshListing);
        renderMarketplaceFeed(listingsData);
        generateMapVectors(listingsData);
        modal.classList.add("hidden");
        e.target.reset();
        
        userWalletBalance += 50;
        updateCoinsUIBalances();
    });
}

function renderMarketplaceFeed(data) {
    const feed = document.getElementById("listings-feed");
    if(!feed) return;
    feed.innerHTML = "";
    
    data.forEach(item => {
        const card = document.createElement("div");
        card.className = "glass-card listing-card";
        
        const btnText = currentLanguage === 'en' ? 'Lock Exchange Deal' : 'सौदा लॉक करें';
        const haveText = currentLanguage === 'en' ? 'Offers' : 'पास है';
        const wantText = currentLanguage === 'en' ? 'Demands' : 'चाहिए';

        card.innerHTML = `
            <div class="card-header">
                <div>
                    <span class="tag tag-${item.category.toLowerCase()}">${item.category}</span>
                    <h4 style="margin-top:0.5rem; font-size:1.15rem;">${item.title}</h4>
                </div>
                <div style="font-size:0.8rem; color:var(--text-muted);">★ ${item.karma} (${item.name})</div>
            </div>
            <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.5;">${item.desc}</p>
            <div style="font-size:0.85rem; border-top:1px solid var(--border-color); padding-top:0.75rem;">
                <div>${haveText}: <strong class="accent-teal">${item.skillHave}</strong></div>
                <div>${wantText}: <strong class="accent-violet">${item.skillWant}</strong></div>
            </div>
            <button class="btn btn-secondary btn-full btn-small" onclick="simulateSuccessfulSwapSecure()">${btnText}</button>
        `;
        feed.appendChild(card);
    });
}

function renderRewardsStore() {
    const rootBlock = document.getElementById("rewards-store-feed");
    if(!rootBlock) return;
    rootBlock.innerHTML = "";

    rewardCatalog.forEach(p => {
        const card = document.createElement("div");
        card.className = "glass-card reward-item-card";
        const claimBtnText = currentLanguage === 'en' ? 'Claim Voucher' : 'दावा करें';
        const coinUnit = currentLanguage === 'en' ? 'SwapCoins' : 'सिक्के';

        card.innerHTML = `
            <div>
                <div style="font-size:0.75rem; color:var(--accent-teal); font-weight:600; text-transform:uppercase;">${p.provider}</div>
                <h4 style="margin-top:0.25rem; font-size:1.1rem;">${p.name}</h4>
            </div>
            <div class="reward-price">${p.price} ${coinUnit}</div>
            <button class="btn btn-primary btn-small btn-full" onclick="executeRewardClaimSequence('${p.id}', ${p.price})">${claimBtnText}</button>
        `;
        rootBlock.appendChild(card);
    });
}

function simulateSuccessfulSwapSecure() {
    alert(translations[currentLanguage].alertDeal);
    userWalletBalance += 50;
    updateCoinsUIBalances();
}

window.simulateSuccessfulSwapSecure = simulateSuccessfulSwapSecure;

function executeRewardClaimSequence(id, cost) {
    if(userWalletBalance >= cost) {
        userWalletBalance -= cost;
        updateCoinsUIBalances();
        alert(`${translations[currentLanguage].alertSuccess} ${id}`);
    } else {
        alert(translations[currentLanguage].alertFail);
    }
}

window.executeRewardClaimSequence = executeRewardClaimSequence;

function updateCoinsUIBalances() {
    const badge = document.getElementById("wallet-display-badge");
    const balanceTxt = document.getElementById("current-balance-txt");
    if(badge) badge.innerText = `${userWalletBalance} CC`;
    if(balanceTxt) balanceTxt.innerText = userWalletBalance;
}