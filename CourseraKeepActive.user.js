// ==UserScript==
// @name         Coursera Keep Active
// @namespace    https://github.com/Outrajas/coursera-bg
// @version      1.0.0
// @description  Keeps Coursera videos playing when you switch tabs
// @author       Outrajas
// @match        https://www.coursera.org/*
// @match        https://coursera.org/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Trick the page into thinking it is always visible and focused
    Object.defineProperty(document, 'hidden', {
        get: () => false,
        configurable: true
    });

    Object.defineProperty(document, 'visibilityState', {
        get: () => 'visible',
        configurable: true
    });

    document.hasFocus = () => true;

    // Block blur and visibilitychange events from reaching Coursera's listeners
    window.addEventListener('blur', e => e.stopImmediatePropagation(), true);
    window.addEventListener('visibilitychange', e => e.stopImmediatePropagation(), true);

    // Simulate user activity with tiny scroll jiggles
    function randomScroll() {
        window.scrollBy(0, 3);
        setTimeout(() => window.scrollBy(0, -3), 500);
        window.dispatchEvent(new Event('scroll', { bubbles: true }));
        console.log('Coursera: simulated activity at', new Date().toLocaleTimeString());
        setTimeout(randomScroll, 15000 + Math.random() * 20000);
    }

    randomScroll();
    console.log('Coursera activity simulator: ACTIVE');
})();