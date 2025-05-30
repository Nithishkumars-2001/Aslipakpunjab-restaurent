
//**************************** Select Sidenavbar  *****************************//

var sidenavbar = document.querySelector(".side-navbar")

function shownavbar() {
    sidenavbar.style.left = "0"
}
function closenavbar() {
    sidenavbar.style.left = "-100%"
}

//***************************** Service Dropdown ******************************//

const serviceToggle = document.getElementById('serviceToggle');
const serviceDropdown = document.getElementById('serviceDropdown');

serviceToggle.addEventListener('click', function (e) {
    e.preventDefault();

    // Get position of the service menu item
    const rect = serviceToggle.getBoundingClientRect();

    // Adjust dropdown position dynamically
    serviceDropdown.style.top = `${rect.bottom + 30 + window.scrollY}px`; // 20px space below
    serviceDropdown.style.left = `${rect.left + rect.width / 2 + window.scrollX}px`;
    serviceDropdown.style.transform = "translateX(-50%)";

    // Toggle visibility
    if (serviceDropdown.style.display === "block") {
        serviceDropdown.style.display = "none";
    } else {
        serviceDropdown.style.display = "block";
    }
});

// Hide dropdown if click outside
document.addEventListener('click', function (e) {
    if (!serviceToggle.contains(e.target) && !serviceDropdown.contains(e.target)) {
        serviceDropdown.style.display = "none";
    }
});

// Optional: Hide on window resize or scroll
window.addEventListener('scroll', () => {
    serviceDropdown.style.display = "none";
});

window.addEventListener('resize', () => {
    serviceDropdown.style.display = "none";
});


// side bar service option
function toggleTopServiceDropdown() {
    const dropdown = document.getElementById("topServiceDropdown");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

// Optional: Click outside to close
window.addEventListener("click", function (e) {
    const dropdown = document.getElementById("topServiceDropdown");
    if (!e.target.closest('.side-navbar-link') && !e.target.closest('#topServiceDropdown')) {
        dropdown.style.display = "none";
    }
});

// *************************** Client Testimonial slider ***************************** //

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildren = [...carousel.children];

let isDragging = false, startX, startScrollLeft, timeoutId;
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Clone last cards and prepend them
carouselChildren.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Clone first cards and append them
carouselChildren.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Adjust scroll position to the first original card (avoid jump effect)
carousel.scrollLeft = firstCardWidth * cardPerView;

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const autoplay = () => {
    if (window.innerWidth < 800) return;
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2000);
}
autoplay();

// Infinite loop effect when reaching cloned elements
const infiniteScroll = () => {
    if (carousel.scrollLeft <= 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");

    } else if (carousel.scrollLeft >= carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoplay();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoplay);


// reservation book
document.addEventListener("DOMContentLoaded", () => {
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("date").value = today;
});
