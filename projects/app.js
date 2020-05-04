const hamburger = document.querySelector('.hamburger');
const links = document.querySelector('.links');
const all = document.querySelectorAll('.links li');
const line = document.querySelector('.line')

hamburger.addEventListener('click', () => {
links.classList.toggle("open");
line.classList.toggle("click");
});