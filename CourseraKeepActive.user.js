// ==UserScript==
// @name         Coursera Keep Active - Activity Simulator (Fixed)
// @match        https://www.coursera.org/*
// @match        https://coursera.org/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // ===== VISUAL INDICATOR =====
    const indicator = document.createElement('div');
    indicator.id = 'coursera-keep-active-indicator';
    indicator.innerHTML = '🔒 EXTENSION ACTIVE';
    indicator.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        z-index: 999999;
        background: linear-gradient(135deg, #00c853, #00e676);
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-family: 'Segoe UI', system-ui, sans-serif;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.5px;
        box-shadow: 0 4px 15px rgba(0,200,83,0.4);
        cursor: pointer;
        user-select: none;
        transition: all 0.3s ease;
        border: 2px solid rgba(255,255,255,0.3);
    `;

    // Hover effect
    indicator.addEventListener('mouseenter', () => {
        indicator.style.transform = 'scale(1.05)';
        indicator.style.boxShadow = '0 6px 20px rgba(0,200,83,0.6)';
    });
    indicator.addEventListener('mouseleave', () => {
        indicator.style.transform = 'scale(1)';
        indicator.style.boxShadow = '0 4px 15px rgba(0,200,83,0.4)';
    });

    // Click to toggle status display
    let showStatus = false;
    const statusBox = document.createElement('div');
    statusBox.style.cssText = `
        position: fixed;
        top: 50px;
        right: 10px;
        z-index: 999998;
        background: #1a1a2e;
        color: #00ff88;
        padding: 12px;
        border-radius: 8px;
        font-family: monospace;
        font-size: 11px;
        display: none;
        max-width: 300px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.5);
    `;

    indicator.addEventListener('click', () => {
        showStatus = !showStatus;
        statusBox.style.display = showStatus ? 'block' : 'none';
    });

    // Append to page when ready
    function appendIndicator() {
        if (document.body) {
            document.body.appendChild(indicator);
            document.body.appendChild(statusBox);
            console.log('[Coursera Keep Active] Indicator mounted');
        } else {
            setTimeout(appendIndicator, 100);
        }
    }
    appendIndicator();

    // ===== CORE FUNCTIONALITY =====

    // Override visibility API
    Object.defineProperty(document, 'hidden', { get: () => false, configurable: true });
    Object.defineProperty(document, 'visibilityState', { get: () => 'visible', configurable: true });
    document.hasFocus = () => true;

    // Block blur/focus events from reaching page handlers
    window.addEventListener('blur', e => e.stopImmediatePropagation(), true);
    window.addEventListener('visibilitychange', e => e.stopImmediatePropagation(), true);

    // Activity log for status box
    let activityCount = 0;
    let lastActivity = 'Never';
    const activityLog = [];

    // Simulate realistic scroll activity with random intervals
    function randomScroll() {
        const now = new Date();
        const timeStr = now.toLocaleTimeString();

        // Small scroll down then up
        window.scrollBy(0, 3);
        setTimeout(() => window.scrollBy(0, -3), 500);

        // Dispatch a scroll event manually
        window.dispatchEvent(new Event('scroll', { bubbles: true }));

        // Update stats
        activityCount++;
        lastActivity = timeStr;
        activityLog.unshift(timeStr);
        if (activityLog.length > 5) activityLog.pop();

        // Update status box
        statusBox.innerHTML = `
            <div style="color:#ffd700; margin-bottom:6px;">📊 Activity Log</div>
            <div>Total events: ${activityCount}</div>
            <div>Last activity: ${lastActivity}</div>
            <div style="color:#888; margin-top:6px;">Recent:</div>
            ${activityLog.map(t => `<div>• ${t}</div>`).join('')}
            <div style="color:#888; margin-top:8px; font-size:10px;">
                Next: ${(15 + Math.random() * 20).toFixed(1)}s
            </div>
        `;

        console.log('[Coursera Keep Active] Activity at', timeStr);

        // Random interval between 15-35 seconds (more natural)
        const nextInterval = 15000 + Math.random() * 20000;
        setTimeout(randomScroll, nextInterval);
    }

    // Start the random scroll loop
    randomScroll();

    // ===== DEBUG INFO =====
    console.log('%c[Coursera Keep Active]', 'color: #00c853; font-size: 14px; font-weight: bold;', 'ACTIVE');
    console.log('document.hidden override:', document.hidden);
    console.log('document.visibilityState override:', document.visibilityState);
    console.log('document.hasFocus override:', document.hasFocus());
})();