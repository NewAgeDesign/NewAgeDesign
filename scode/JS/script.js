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

// ...existing code...

document.addEventListener('DOMContentLoaded', () => {
    // --- Hash update on scroll ---
    const sections = document.querySelectorAll('main > section[id]');
    const links = document.querySelectorAll('nav a');
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    // Update hash without scrolling
                    history.replaceState(null, '', '#' + id);

                    // Update nav active class
                    links.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                    });
                }
            });
        },
        {
            threshold: 0.2 // Section is considered active when 50% visible
        }
    );

    function setActiveNavLink() {
        const hash = window.location.hash;
        let found = false;
        links.forEach(link => {
            if (link.getAttribute('href') === hash && hash) {
                link.classList.add('active');
                found = true;
            } else {
                link.classList.remove('active');
            }
        });
        // If no hash match, activate the first link
        if (!found && links.length > 0) {
            links.forEach(l => l.classList.remove('active'));
            links[0].classList.add('active');
        }
    }

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            // Only handle anchor links with hashes
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                window.location.hash = this.getAttribute('href');
                setActiveNavLink();
            }
        });
    });

    window.addEventListener('hashchange', setActiveNavLink);
    sections.forEach(section => observer.observe(section));
    setActiveNavLink();
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
