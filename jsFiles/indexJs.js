const btn = document.getElementById('menuBtn');
const menu = document.getElementById('dropdownMenu');

btn.addEventListener('click', (event) => {
    event.stopPropagation();
    menu.classList.toggle('hidden');
});

window.addEventListener('click', () => {
    menu.classList.add('hidden');
});