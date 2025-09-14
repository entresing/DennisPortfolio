//When JavaScript is enabled, the page will initially render the header with a transparent background and no box-shadow (since the scrolled class will be added on DOMContentLoaded). As the user scrolls, the class will be toggled based on the scroll position.

document.addEventListener('DOMContentLoaded', function() {
    var header = document.querySelector('.heading');
    // Initially add the 'scrolled' class
    header.classList.add('scrolled');

    window.addEventListener('scroll', function() {
        // Toggle the 'scrolled' class based on scroll position
        header.classList.toggle('scrolled', window.scrollY <= 0);
    });
});