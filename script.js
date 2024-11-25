//about
// Smooth scrolling logic
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1); // Remove the "#" from href
        const targetSection = document.getElementById(targetId);

        // Scroll to the target section smoothly
        targetSection.scrollIntoView({
            behavior: 'smooth', // Smooth scrolling
            block: 'start' // Scroll to the start of the section
        });
    });
});

// Select all sections and navigation links
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('nav a');

// Function to check if a section is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.top <= window.innerHeight * 0.3; // Adjust visibility threshold
}

// Track the last scroll position
let lastScrollY = window.scrollY;
// Function to animate sections when in view
function handleScroll() {
    const currentScrollY = window.scrollY;

    // Determine the scroll direction (down = true, up = false)
    const isScrollingDown = currentScrollY > lastScrollY;

    // Animate sections only when scrolling down
    if (isScrollingDown) {
        sections.forEach(section => {
            if (isInViewport(section) && !section.classList.contains('animate')) {
                section.classList.add('animate'); // Trigger the animation
            }
        });
    }

    // Update the last scroll position
    lastScrollY = currentScrollY;
}

// Function to handle clicks on navigation links
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1); // Remove the "#" from href
        const targetSection = document.getElementById(targetId);

        // Scroll to the section smoothly
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Add the animation class
        setTimeout(() => {
            targetSection.classList.add('animate');
        }, 10); // Delay for smooth scroll
    });
});

// Add scroll event listener to trigger animations
window.addEventListener('scroll', handleScroll);

// Initial check to animate sections already in view
handleScroll();





//for gmail
function toggleGmail(event) {
    event.preventDefault();
    const gmailWrapper = document.querySelector('.gmail-wrapper');
    gmailWrapper.classList.toggle('show'); // Toggle visibility
}

// Hide Gmail text when scrolling or navigating
function hideGmail() {
    const gmailWrapper = document.querySelector('.gmail-wrapper');
    if (gmailWrapper.classList.contains('show')) {
        gmailWrapper.classList.remove('show');
    }
}

// Add event listeners
window.addEventListener('scroll', hideGmail);

const navLinkss = document.querySelectorAll('nav a');
navLinkss.forEach(link => {
    link.addEventListener('click', hideGmail);
});
//gmail end 


//for form submission
// Ensure this script is linked to your HTML file
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    if (!form) {
        console.error("Form with id 'contactForm' not found in the DOM.");
        return;
    }

    form.addEventListener("submit", async function (e) {
        e.preventDefault(); // Prevent default form submission behavior

        // Retrieve form values
        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();
        const errorContainer = document.getElementById("form-error");

        // Clear previous error messages
        errorContainer.textContent = "";

        try {
            // Send data to the backend
            const response = await fetch("https://saloni-wul1.onrender.com/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, phone, email, message }),
            });

            if (!response.ok) {
                // Show error message if the response is not OK
                const error = await response.json();
                errorContainer.textContent = error.error || "Failed to send the message.";
                return;
            }

            const result = await response.json(); // Parse JSON response
            errorContainer.style.color = "green";
            errorContainer.textContent = result.message; // Show success message
            e.target.reset(); // Clear the form
        } catch (error) {
            console.error("Error submitting the form:", error);
            errorContainer.textContent = "An unexpected error occurred.";
        }
    });
});


document.querySelector('.download-resume').addEventListener('click', (e) => {
    console.log('Resume downloaded!');
    // You can add additional tracking or analytics logic here
});



//navbar
const header = document.getElementById("header");
const profileSection = document.getElementById("profile-container");

window.addEventListener("scroll", () => {
    const profileSectionBottom = profileSection.getBoundingClientRect().bottom;

    // If the profile section is still visible, hide the header
    if (profileSectionBottom > 0) {
        header.classList.add("hidden");
    } else {
        header.classList.remove("hidden");
    }
});

// Smooth scrolling logic
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1); // Remove the "#" from href
        const targetSection = document.getElementById(targetId);

        // Scroll to the target section smoothly
        targetSection.scrollIntoView({
            behavior: 'smooth', // Smooth scrolling
            block: 'start' // Scroll to the start of the section
        });
    });
});

// Select all sections and navigation links
const sectionss = document.querySelectorAll('.section');
const navLinksss = document.querySelectorAll('nav a');

// Function to check if a section is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.top <= window.innerHeight * 0.8; // Adjust visibility threshold
}
