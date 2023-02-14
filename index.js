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
  const windowHeight = window.innerHeight;
  const scrollPast = aboutPage.offsetTop - windowHeight;
  const desiredBottom = (windowHeight * .90) - navbar.offsetHeight;
  toggleOnFixed(navbar, scrollPast, desiredBottom);
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
  const highlightNavlinkSvg = document.getElementById("highlight-navlink-svg");
  if (document.documentElement.scrollTop > scrollPast) { // For Chrome, Firefox, IE and Opera
    navbarSetFixed(desiredBottom, element, scrollPast, document.documentElement.scrollTop);
    highlightNavlinkSvg.style.display = "block";
  } else if (document.body.scrollTop > scrollPast) {  // For Safari
    navbarSetFixed(desiredBottom, element, scrollPast, document.body.scrollTop);
    highlightNavlinkSvg.style.display = "block";
  } else {
    element.style.position = "static";
    highlightNavlinkSvg.style.display = "none";
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


let navlinkHighlightedId = "about-navlink";

function changeNavBarHighlight() {
  const navbar = document.getElementById("info-navbar");
  const projectsPage = document.getElementById("projects");
  const scrollPastAbout = projectsPage.offsetTop - navbar.offsetHeight;
  const homeNavLink = document.getElementById("home-navlink");
  const aboutNavLink = document.getElementById("about-navlink");
  const projectsNavLink = document.getElementById("projects-navlink");

  const highlightNavLinkClassName = "current-page";

  // when we pass the about section
  if (document.body.scrollTop > scrollPastAbout || document.documentElement.scrollTop > scrollPastAbout) {
    addClassname(projectsNavLink, highlightNavLinkClassName);
    removeClassName(aboutNavLink, highlightNavLinkClassName);
    aboutNavLink.style.color = "white";
    homeNavLink.style.color = "white";
    navlinkHighlightedId = "projects-navlink";
  } else {
    navlinkHighlightedId = "about-navlink";
    addClassname(aboutNavLink, highlightNavLinkClassName);
    removeClassName(projectsNavLink, highlightNavLinkClassName)
    aboutNavLink.style.color = "black";
    homeNavLink.style.color = "black";
  }
}

function addClassname(element, name) {
  const classNameArr = element.className.split(" ");
  if (classNameArr.indexOf(name) === -1) {
    element.className += " " + name;
  }
}

function removeClassName(element, name) {
  element.classList.remove(name);
}

function setHighlightSvg() {
  // Get elements
  const highlightNavlinkSvg = document.getElementById("highlight-navlink-svg");
  const navlinkHighlighted = document.getElementById(navlinkHighlightedId);

  // get computed styles for navlink
  const navLinkComputatedStyles = window.getComputedStyle(navlinkHighlighted);

  // get bounding client rect for svg
  const highlightNavlinkBcr = highlightNavlinkSvg.getBoundingClientRect();

  // calculate left
  const leftPaddingNavlink = turnPxStringToInt(navLinkComputatedStyles.getPropertyValue("padding-left"));
  const rightPaddingNavlink = turnPxStringToInt(navLinkComputatedStyles.getPropertyValue("padding-right"));
  const left = (leftPaddingNavlink + rightPaddingNavlink) / 2;

  // calculate top
  const topPaddingNavlink = turnPxStringToInt(navLinkComputatedStyles.getPropertyValue("padding-top"));
  const bottomPaddingNavlink = turnPxStringToInt(navLinkComputatedStyles.getPropertyValue("padding-bottom"));
  const navLinkedHeightWOPadding = navlinkHighlighted.offsetHeight - topPaddingNavlink - bottomPaddingNavlink;
  const halfSvgHeightAboveNavlink = (highlightNavlinkBcr.height - navLinkedHeightWOPadding) / 2;

  // navlinkHighlighted.offsetTop + topPaddingNavlink brings svg to the top of the highlight navlink
  const top = navlinkHighlighted.offsetTop + topPaddingNavlink - halfSvgHeightAboveNavlink;

  // set svg style (position svg under highlighted nav)
  highlightNavlinkSvg.style.top = top.toString() + "px";
  highlightNavlinkSvg.style.width = navlinkHighlighted.offsetWidth.toString() + "px";
  highlightNavlinkSvg.style.left = left.toString();
}

function turnPxStringToInt(pxValue) {
  const numberStr = pxValue.substr(0, pxValue.length);
  return parseInt(numberStr)
}

function setNavbarStyles() {
  makeNavbarFixed();
  changeNavBarHighlight();
  setHighlightSvg();
}

function addFunctionsToScroll() {
  window.onscroll = () => {
    setNavbarStyles();
  }
}

function addOnHoverToProjects() {
  let projects = document.getElementsByClassName("project");
  for(let i = 0; i < projects.length; i++) {
    addOnHoverToProject(projects[i]);
  }
}

function addOnHoverToProject(project) {

}

window.onload = function() {
  addPortraitReactions();
  addFunctionsToScroll();
  setNavbarStyles();
};
