//************************ Home Navbar Header *******************//

const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');
let currentIndex = 0;
const totalSlides = slides.length;

function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100 / totalSlides}%)`;
}

function nextSlide() {
    currentIndex++;
    if (currentIndex >= totalSlides) {
        currentIndex = 0;
        slider.style.transition = 'none';
        updateSlider();
        // Force reflow to restart transition
        slider.offsetHeight;
        slider.style.transition = 'transform 0.5s ease-in-out';
    }
    updateSlider();
}

function prevSlide() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
        slider.style.transition = 'none';
        updateSlider();
        // Force reflow to restart transition
        slider.offsetHeight;
        slider.style.transition = 'transform 0.5s ease-in-out';
    }
    updateSlider();
}

arrowRight.addEventListener('click', nextSlide);
arrowLeft.addEventListener('click', prevSlide);

// Auto-slide every 5 seconds
setInterval(nextSlide, 5000);

// Footer bottom up button
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Filter functionality
const filterButtons = document.querySelectorAll('.filter-buttons button');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});