// chatgpt prompt:how to assign different link to iframe when viewport is below 1200px?
function updateIframeSrc() {
    var iframe = document.querySelector('.figure-two iframe');
    var originalSrc = "https://www.sfu.ca/siat/student_projects/iat339_2023_fall/wxd/Ratatouille/ticket_section_18.html";
    var alternateSrc = "https://www.sfu.ca/siat/student_projects/iat339_2023_fall/wxd/Ratatouille/ticket_seatmap_18.html?section=backBalcony"; 

    iframe.src = window.innerWidth < 1200 ? alternateSrc : originalSrc;
}

// Run the function on initial load
updateIframeSrc();

// chatgpt prompt:how to set iframe scrolling="yes" when viewport is below 600px?
// Add event listener for window resize
window.addEventListener('resize', updateIframeSrc);

    function adjustIframeScrolling() {
        var iframe = document.querySelector('iframe'); 
        var viewportWidth = window.innerWidth;

        if (viewportWidth < 600) {
            iframe.setAttribute('scrolling', 'yes');
        } else {
            iframe.setAttribute('scrolling', 'no');
        }
    }

    // Call on page load
    adjustIframeScrolling();

    // Call on window resize
    window.addEventListener('resize', adjustIframeScrolling);