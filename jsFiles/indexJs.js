const menuCheckbox = document.getElementById('menuCheckbox');
const dropdownMenu = document.getElementById('dropdownMenu');

menuCheckbox.addEventListener('change', function() {
    if (this.checked) {
        // Show the menu
        dropdownMenu.classList.remove('hidden');
    } else {
        // Hide the menu
        dropdownMenu.classList.add('hidden');
    }
});

// Optional: Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuCheckbox.parentElement.contains(e.target) && !dropdownMenu.contains(e.target)) {
        menuCheckbox.checked = false; // Reset the icon
        dropdownMenu.classList.add('hidden'); // Hide the menu
    }
});

//For the animation typing
var typed = new Typed('#typing', {
    strings: ["SmileCheck", "Achieve your perfect smile"],
    typeSpeed: 100,       
    backSpeed: 50,        
    backDelay: 1500,      
    loop: true,     
    showCursor: false       
});





