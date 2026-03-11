#!/usr/bin/env node
// Helper — generates remaining pages programmatically
// Run: node generate-pages.js

const fs = require('fs');
const path = require('path');

const PAGES_DIR = path.join(__dirname, 'pages');

// Template function for category pages
function categoryPage(config) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.title} — The Part-Timers</title>
    <link rel="stylesheet" href="../css/shared.css">
</head>
<body>
<div class="phone-container">
<div class="screen">
    <div class="status-bar"><div class="time">9:41</div><div class="battery-wifi"><span>📶</span><span>🔋</span></div></div>
    <div class="header">
        <div class="header-top">
            <div class="location-picker">
                <a href="../index.html" style="color:white;text-decoration:none;font-size:20px;margin-right:8px">←</a>
                <div>
                    <div class="location-text">${config.emoji} ${config.name}</div>
                    <div class="location-sub">${config.odia} • ${config.sub}</div>
                </div>
            </div>
            <a href="search.html?q=${encodeURIComponent(config.category)}" class="profile-icon">🔍</a>
        </div>
    </div>
    <div class="filter-bar">
        <div class="filter-chip active" onclick="setR(this,0)">Any Dist.</div>
        <div class="filter-chip" onclick="setR(this,5)">≤ 5 km</div>
        <div class="filter-chip" onclick="setR(this,10)">≤ 10 km</div>
        <div class="filter-chip" onclick="setR(this,20)">≤ 20 km</div>
    </div>
    <div class="feed-section">
        <div class="map-container" style="height:150px">
            <div style="text-align:center">
                <div style="font-size:32px">🗺️</div>
                <div style="font-size:12px;color:#333;font-weight:600;margin-top:6px">${config.name} Providers Map</div>
                <button class="map-overlay-btn" onclick="Maps.findNearMe()">📍 Find Near Me</button>
            </div>
        </div>
        <div class="section-header">
            <div class="section-title">${config.emoji} Available Providers</div>
            <div class="view-all" id="cnt"></div>
        </div>
        <div style="padding:0 15px 20px" id="list"></div>
    </div>
    <div class="bottom-nav">
        <a class="nav-item" href="../index.html"><div class="nav-icon">🏠</div><div class="nav-label">Home</div></a>
        <a class="nav-item" href="search.html"><div class="nav-icon">🔍</div><div class="nav-label">Search</div></a>
        <a class="nav-item" href="orders.html"><div class="nav-icon">📋</div><div class="nav-label">Orders</div></a>
        <a class="nav-item" href="register.html"><div class="nav-icon">📝</div><div class="nav-label">Register</div></a>
        <a class="nav-item" href="profile.html"><div class="nav-icon">👤</div><div class="nav-label">Profile</div></a>
    </div>
</div>
</div>
<script src="../js/app.js"></script>
<script>
    let r = 0;
    function render() {
        let w = DATA.workers.filter(x => x.category === '${config.category}');
        if (r > 0) w = w.filter(x => x.distance <= r);
        document.getElementById('cnt').textContent = w.length + ' providers';
        document.getElementById('list').innerHTML = w.length
            ? w.map(x => Utils.renderWorkerCard(x)).join('')
            : '<div class="empty-state"><div class="empty-icon">${config.emoji}</div><div class="empty-text">No providers in this range</div></div>';
    }
    function setR(el, radius) {
        document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        el.classList.add('active'); r = radius; render();
    }
    render(); Utils.updateTime();
</script>
</body>
</html>`;
}

const PAGES = [
    { file: 'fish.html',       title: 'Fish & Aqua Work',     name: 'Fish & Aqua Work',      odia: 'ମାଛ ଓ ଜଳଜ ଚାଷ',       sub: 'Kendrapara District',  category: 'fish',      emoji: '🐟' },
    { file: 'poultry.html',    title: 'Poultry & Livestock',  name: 'Poultry & Livestock',   odia: 'କୁକୁଡ଼ା ଓ ପଶୁ',         sub: 'Local providers',      category: 'poultry',   emoji: '🐔' },
    { file: 'learning.html',   title: 'Learning & Coaching',  name: 'Learning & Coaching',   odia: 'ଶିକ୍ଷା ଓ ପ୍ରଶିକ୍ଷଣ',   sub: 'Tutors and teachers',  category: 'learn',     emoji: '📚' },
    { file: 'technician.html', title: 'Technicians',          name: 'Technicians',           odia: 'ଟେକ୍ନିସିଆନ',           sub: 'Repairs & services',   category: 'technician',emoji: '🔧' },
    { file: 'contractor.html', title: 'Contractors',          name: 'Contractors',           odia: 'ଠିକାଦାର',              sub: 'Local & verified',     category: 'contract',  emoji: '🏗️' },
    { file: 'equipment.html',  title: 'Equipment Rental',     name: 'Equipment Rental',      odia: 'ଯନ୍ତ୍ରପାତି ଭଡ଼ା',       sub: 'Rent farm equipment',  category: 'equipment', emoji: '⚙️' },
    { file: 'vehicle.html',    title: 'Vehicle Booking',      name: 'Vehicle Booking',       odia: 'ଯାନ ବୁକ୍',             sub: 'Auto, van, truck',     category: 'vehicle',   emoji: '🛺' },
    { file: 'marketplace.html',title: 'Buy/Sell Marketplace', name: 'Buy/Sell Marketplace',  odia: 'କ୍ରୟ/ବିକ୍ରୟ ବଜାର',     sub: 'Local buy and sell',   category: 'mart',      emoji: '🛒' },
];

PAGES.forEach(p => {
    const content = categoryPage(p);
    fs.writeFileSync(path.join(PAGES_DIR, p.file), content);
    console.log('✅ Created:', p.file);
});

console.log('\n🎉 All pages generated!');
