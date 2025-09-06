function checkYearMonthDay() {

    const topLines = document.querySelectorAll('.text.top h1');
    const bottomLines = document.querySelectorAll('.text.bottom h1');

    function animateLine(index) {
        if (index >= topLines.length) return;

        const topEl = topLines[index];
        const bottomEl = bottomLines[index];

        // Fade them in BEFORE animation
        topEl.style.opacity = '1';
        bottomEl.style.opacity = '1';
        
        const topText = topEl.textContent.trim();
        const bottomText = bottomEl.textContent.trim();

        topEl.innerHTML = '';
        bottomEl.innerHTML = '';

        const maxLength = Math.max(topText.length, bottomText.length);

        for (let j = 0; j < maxLength; j++) {
            const delay = j * 50; // milliseconds

            const topChar = topText[j] || ' ';
            const bottomChar = bottomText[j] || ' ';

            const topSpan = document.createElement('span');
            topSpan.textContent = topChar === ' ' ? '\u00A0' : topChar;
            topSpan.style.animationDelay = `${delay}ms`;

            const bottomSpan = document.createElement('span');
            bottomSpan.textContent = bottomChar === ' ' ? '\u00A0' : bottomChar;
            bottomSpan.style.animationDelay = `${delay}ms`;

            topEl.appendChild(topSpan);
            bottomEl.appendChild(bottomSpan);
        }

        // Wait for animation to complete before starting next line
        const totalDuration = maxLength * 50 + 600;
        setTimeout(() => {
            animateLine(index + 1);
        }, totalDuration);
    }

    // Start the chain
    animateLine(0);


}

// Usage
document.addEventListener('DOMContentLoaded', () => {
    checkYearMonthDay();
});

document.addEventListener('DOMContentLoaded', function () {
    const titles = [
        'Software Development ',
        'UI/UX Design ',
        'Brand Design ',
        'Creative Strategy '
    ];
    const spiralTitles = document.querySelectorAll('.spiral-title');
    let idx = 0;
    let charIdx = 0;
    let typing = true;

    function typeEffect() {
        spiralTitles.forEach(el => {
            el.innerHTML = '';
            // Add typed text, each character in a span
            for (let i = 0; i < charIdx; i++) {
                const span = document.createElement('span');
                span.textContent = titles[idx][i] === ' ' ? '\u00A0' : titles[idx][i];
                el.appendChild(span);
            }
            // Add cursor
            const cursor = document.createElement('span');
            cursor.className = 'typewriter-cursor';
            cursor.textContent = '|';
            el.appendChild(cursor);
        });

        if (typing) {
            if (charIdx < titles[idx].length) {
                charIdx++;
                setTimeout(typeEffect, 80);
            } else {
                typing = false;
                setTimeout(typeEffect, 3000);
            }
        } else {
            if (charIdx > 0) {
                charIdx--;
                setTimeout(typeEffect, 40);
            } else {
                typing = true;
                idx = (idx + 1) % titles.length;
                setTimeout(typeEffect, 400);
            }
        }
    }

    typeEffect();
});

// Clock functionality
function updateClock() {
    const now = new Date();
    const days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
    const dateElement = document.querySelector('.date');
    const meridian = dateElement.querySelector('.meridian');
    const timeElement = document.querySelector('time');
    const data = dateElement.querySelector('.data');
    const dayIndex = now.getDay();

    // Format time as HH:MM am/pm
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    timeElement.textContent = `${hours}:${minutes}`;
    meridian.textContent = ampm + ' | ' + days[dayIndex];

    // Format date as DD MMM YY
    const day = now.getDate().toString().padStart(2, '0');
    const month = now.toLocaleString('en-US', { month: 'short' });
    const year = now.getFullYear().toString().slice(-2);

    data.textContent = `${day} ${month} ${year}`;
}

// Start clock
setInterval(updateClock, 1000);
updateClock();
