var acc = document.getElementsByClassName("accordion");

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    const isActive = this.classList.contains("active");

    // first close all panels
    closeAllPanels();

    // if there was no active panel to begin, 
    // open panel and hide other buttons
    if (!isActive) {
        this.classList.toggle("active");
        const panel = this.nextElementSibling;
        panel.style.display = "block";
        hideOtherButtons(this);
    // if it was already active, return to base state
    } else {
        this.classList.remove("active");
        acc[i].nextElementSibling.style.display = "none";
    }
  });
}
// Close all panels
function closeAllPanels() {
    for (let i = 0; i < acc.length; i++) {
      acc[i].classList.remove("active");
      acc[i].style.display = "block";
      acc[i].nextElementSibling.style.display = "none";
    }
}
  
// Close panels when clicking outside accordion (such as document page)
document.addEventListener("click", function(event) {
    const isAccordion = event.target.closest(".accordion");
    const isPanel = event.target.closest(".panel");

    if (!isAccordion && !isPanel) {
        closeAllPanels();
    }
});

// Hide all other buttons except for activeButton
function hideOtherButtons(activeButton) {
    for (let i = 0; i < acc.length; i++) {
      if (acc[i] !== activeButton) {
        acc[i].style.display = "none";
      }
    }
}
  