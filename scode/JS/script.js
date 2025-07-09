function checkYearMonthDay(selector, startYear = 2015, startMonth = 1, startDay = 1) {
    const startDate = new Date(startYear, startMonth - 1, startDay);
    const currentDate = new Date();
    const output = document.querySelector(selector);

    let years = currentDate.getFullYear() - startDate.getFullYear();
    let months = currentDate.getMonth() - startDate.getMonth();
    let days = currentDate.getDate() - startDate.getDate();

    if (days < 0) {
        months--;
        const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        days += prevMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    output.innerHTML = `${years} years, ${months} months, and ${days} days`;

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
    checkYearMonthDay('date', 2015, 1, 1);
});