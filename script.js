document.addEventListener("DOMContentLoaded", () => {
    // --- 1. Mobile Menu ---
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");
    const links = document.querySelectorAll(".nav-links a"); 

    // Toggle menu visibility
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
    
    // Fix: Close menu when a link is clicked (for mobile UX)
    links.forEach(link => {
        link.addEventListener("click", () => {
            if (navLinks.classList.contains("active")) {
                navLinks.classList.remove("active");
            }
        });
    });

    // --- 2. Fade-up scroll animation (Performance Optimization) ---
    const fadeUpElements = document.querySelectorAll(".fade-up");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                // Optimization: Stop observing once the element has appeared
                observer.unobserve(entry.target); 
            }
        });
    }, { 
        threshold: 0.1 
    }); 

    fadeUpElements.forEach(el => observer.observe(el));


    // --- 3. DARK MODE TOGGLE (State Preservation Optimization) ---
    const darkToggle = document.getElementById("darkToggle");
    const localStorageKey = "darkModeEnabled";

    // Helper function to apply the theme based on boolean state
    const applyTheme = (isDark) => {
        document.body.classList.toggle("dark", isDark);
        darkToggle.textContent = isDark ? "☀️" : "🌙";
    };

    // Check localStorage on page load and apply saved theme
    const savedTheme = localStorage.getItem(localStorageKey);
    if (savedTheme === "true") {
        applyTheme(true);
    } else {
        // Fallback for initial load or if setting is false/missing
        applyTheme(false); 
    }

    darkToggle.addEventListener("click", () => {
        // Toggle the class and check the current state
        const isCurrentlyDark = document.body.classList.toggle("dark");
        
        applyTheme(isCurrentlyDark);
        
        // Save the new preference to localStorage
        localStorage.setItem(localStorageKey, isCurrentlyDark);
    });
    
    // --- 4. Booking Form Submission (NEW CODE) ---
    const bookingForm = document.getElementById("booking-form");
    const confirmationMessage = document.getElementById("booking-confirmation");

    bookingForm.addEventListener("submit", function(event) {
        // 1. Prevent the default form submission (page reload)
        event.preventDefault(); 
        
        // Get name (optional, for personalization)
        const name = document.getElementById('name').value;
        console.log(`Booking for ${name} submitted successfully!`);

        // 2. Hide the form
        bookingForm.style.display = 'none'; 
        
        // 3. Set the message content
        confirmationMessage.innerHTML = `
            🎉 **Success!** Your ride has been booked! 
            <br>A confirmation will be sent to your mail shortly.
        `;
        
        // 4. Make the message visible and trigger transition
        confirmationMessage.style.display = 'block';
        setTimeout(() => {
            confirmationMessage.classList.add('show');
        }, 10);
    });
});
      
