function addPortraitReactions() {
  let contactMeButton = document.getElementById("contact-me");
  let resumeButton = document.getElementById("resume");

  let starEyes = document.getElementById("Star_Eyes");
  let shades = document.getElementById("Shades");

  contactMeButton.addEventListener("mouseenter", function (event) {
    starEyes.style.display = "block";
  });

  contactMeButton.addEventListener("mouseleave", function (event) {
    starEyes.style.display = "none";
  });

  resumeButton.addEventListener("mouseenter", function (event) {
    shades.style.display = "block";
  });

  resumeButton.addEventListener("mouseleave", function (event) {
    shades.style.display = "none";
  });
}

function makeNavbarFixed() {
  const navbar = document.getElementById("info-navbar");
  const aboutPage = document.getElementById("about");
  const myInfoSection = aboutPage.parentNode;
  const windowHeight = window.innerHeight;
  const scrollPast = aboutPage.offsetTop - windowHeight;
  const desiredBottom = (windowHeight * .90) - navbar.offsetHeight;
  console.log("Pixels from top: " + scrollPast);
  console.log("Pixels from top: " + desiredBottom);
  window.onscroll = () => {toggleOnFixed(navbar, scrollPast, desiredBottom)};
}

/**
 * When the user scrolls past the scrollPast parameter (number in px) from the
 *     top of the documents, it will make the element have a fixed position.
 *
 * @param element An element whose display will toggle between fixed and block.
 * @param scrollPast A number in px from the top of the document.
 * @param desiredBottom sets the limit to what the value can be.
 */
function toggleOnFixed(element, scrollPast, desiredBottom) {
  // const windowHeight = window.innerHeight;
  // console.log("window height:" + windowHeight);
  // if (document.body.scrollTop > scrollPast || document.documentElement.scrollTop > scrollPast) {
  // if (document.body.scrollTop > scrollPast) {
  if ( document.documentElement.scrollTop > scrollPast) { // For Chrome, Firefox, IE and Opera
    navbarSetFixed(desiredBottom, element, scrollPast, document.documentElement.scrollTop);
  } else if (document.body.scrollTop > scrollPast) {  // For Safari
    navbarSetFixed(desiredBottom, element, scrollPast, document.body.scrollTop);
  } else {
    element.style.position = "static";
    console.log("static");
  }
}

function navbarSetFixed(desiredBottom, element, scrollPast, scrollTop) {
  element.style.position = "fixed";
  const bottom = scrollTop - scrollPast - element.offsetHeight;
  if (bottom < desiredBottom) {
    element.style.bottom = bottom.toString() + "px";
  } else {
    element.style.bottom = (desiredBottom).toString() + "px";
  }
}

function scrollToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

window.onload = function() {
  addPortraitReactions();
  makeNavbarFixed();
};
