const navbox = document.getElementById('navbox');
const navContent = document.getElementById('nav-overlay');

navContent.style.display = 'none';

function isMobile() {
    var match = window.matchMedia || window.msMatchMedia;
    if(match) {
        var mq = match("(pointer:coarse)");
        return mq.matches;
    }
    return false;
}

navbox.addEventListener('touchstart', () => {
    navbox.style.width = "55px";
    navbox.style.height = "55px";
    console.log("set to 55px");
    if (isMobile()) {
        console.log("mobile");
    } else {
        console.log("not mobile");
    }
});
navbox.addEventListener('touchend', () => {
    navbox.style.width = "50px";
    navbox.style.height = "50px";
    console.log("set to 50px");
    if (isMobile()) {
        console.log("mobile");
    } else {
        console.log("not mobile");
    }    
});

navbox.addEventListener('click', () => {
  navbox.classList.toggle('expanded');
  if (navbox.classList.contains('expanded')) {
    navContent.style.display = 'flex';
  } else {
    navContent.style.display = 'none';
  }
});

