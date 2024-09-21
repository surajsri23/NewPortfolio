// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            if (targetId) {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Intersection Observer for section animations
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.7
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add class to make section visible
                entry.target.classList.add('active');
                
                // Update active nav link
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            } else {
                // Remove class when section is not in view
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Scroll event listener for parallax effect
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop - window.innerHeight &&
                scrollPosition <= sectionTop + sectionHeight) {
                const scale = 1 - (scrollPosition - sectionTop + window.innerHeight) / (window.innerHeight + sectionHeight) * 0.1;
                const opacity = 1 - (scrollPosition - sectionTop + window.innerHeight) / (window.innerHeight + sectionHeight) * 0.5;
                
                section.style.transform = `scale(${Math.max(scale, 0.9)})`;
                section.style.opacity = Math.max(opacity, 0.5);
            }
        });
    });

    // Make resume downloadable
    const resumeLink = document.querySelector('a[href="#"]');
    if (resumeLink) {
        resumeLink.addEventListener('click', function(e) {
            e.preventDefault();
            const link = document.createElement('a');
            link.href = 'resume.pdf';
            link.download = 'Suraj_Srivastav_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
});

const faders = document.querySelectorAll('.fade-in-section');
const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('is-visible');
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});


function animateSkills() {
    const skillMeters = document.querySelectorAll('.skill-meter');
    const skillPercentages = document.querySelectorAll('.skill-percentage');
    
    skillMeters.forEach((meter, index) => {
        const targetPercentage = parseInt(meter.getAttribute('stroke-dasharray').split(',')[0]);
        let currentPercentage = 0;
        
        const interval = setInterval(() => {
            if (currentPercentage >= targetPercentage) {
                clearInterval(interval);
            } else {
                currentPercentage++;
                meter.style.strokeDasharray = `${currentPercentage}, 100`;
                skillPercentages[index].textContent = `${currentPercentage}%`;
            }
        }, 20);
    });
}

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillsObserver.observe(document.querySelector('#skills'));