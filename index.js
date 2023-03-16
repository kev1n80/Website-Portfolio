// MISCELLANEOUS
function addClassname(element, name) {
  const classNameArr = element.className.split(" ");
  if (classNameArr.indexOf(name) === -1) {
    element.className += " " + name;
  }
}

function removeClassName(element, name) {
  element.classList.remove(name);
}

function turnPxStringToInt(pxValue) {
  const numberStr = pxValue.substr(0, pxValue.length);
  return parseInt(numberStr)
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// HOME PAGE PORTRAIT SVG INTERACTIVITY
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

// NAVBAR
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

function setNavbarStyles() {
  makeNavbarFixed();
  changeNavBarHighlight();
  setHighlightSvg();
}

// BUBBLES 

const bubbleAnimationTimeoutMS = 250;
const bubbleAnimationDurationMS = 1500;
var bubbleIntervalId = 0;
const bubbleParentId = "landing";
const bufferTimeMS = bubbleAnimationDurationMS + 2750;
var lastBubbleTime = 0; 
var maxBubbleHeightPx = 116;

// Randomly adds a bubble to the screen
function createBubble() {
  const bubble = document.createElement('img');
  document.getElementById(bubbleParentId).appendChild(bubble);

  bubble.src = "./images/bubble.svg";
  bubble.alt = "bubble";
  bubble.className = "water-bubbles";

  bubble.onload = function() {
    // Choose a random y position for the bubble
    const leftPx = randomIntFromInterval(0, document.getElementById("landing").clientWidth - bubble.clientWidth);
    bubble.style.left = `${leftPx}px`;
    bubble.style.animation = `${bubbleAnimationDurationMS / 1000}s 1 normal floatup`;
  }

  // Remove bubble after animation ends
  setTimeout(function() {bubble.remove()}, bubbleAnimationDurationMS - 10);

  return bubble;
}

function createBubbleRow() {
  const parentWidth = document.getElementById(bubbleParentId).offsetWidth;

  // Number of bubbles to create
  const maxNumBubbles = parentWidth / maxBubbleHeightPx;
  const max = maxNumBubbles / 2;
  const min = maxNumBubbles / 3;
  
  // Randomly create bubbles
  const numBubbles = Math.random() * (max - min + 1) + min;

  for (var i = 0; i < numBubbles - 1; i++) {
    createBubble();
  }
}

// Add bubbles depending on width and height of page
function createBubbles() {
  // Number of rows of bubbles to create
  const maxNumRows = screen.height / maxBubbleHeightPx;
  const minRows = maxNumRows * .75;

  // Randomly create rows of bubbles
  const numRows = randomIntFromInterval(minRows, maxNumRows);
  var curRows = 0;

  bubbleIntervalId = setInterval(function() {
    createBubbleRow();
    curRows += 1;
    if (curRows >= numRows) {
      clearInterval(bubbleIntervalId);
    }
  }, bubbleAnimationTimeoutMS);

  // Maybe use fractions to make a certain number of these?
  // Add tiny bubbles 

  // Add medium sized bubbles

  // Add large bubbles
}

function bubblesAnimation() {
  // TODO: if position is before about the set reset to true
  // - Should we trigger when scrolling up or only when scrolling down???
  // - If we scroll down, should we animate in reverse?

  const aboutPage = document.getElementById("about");
  const scrollDownPastAbout = aboutPage.offsetTop;
  const documentScrollBottom = document.documentElement.scrollTop + screen.height;
  const scrollUpPastAboutPage = documentScrollBottom < scrollDownPastAbout + 100;
  const scrollDownPastAboutPage = documentScrollBottom > scrollDownPastAbout;
  const scrollPastTriggerArea = scrollUpPastAboutPage && scrollDownPastAboutPage;
  const animationReady = Date.now() - lastBubbleTime > bufferTimeMS;

  if (scrollPastTriggerArea && animationReady) {
    lastBubbleTime = Date.now();
    
    // Start animation of moving bubbles hidden at bottom of screen to move past the top of screen
    createBubbles();
  }
}

// Change one-word description of you
// TODO: Use this list where engineer is the first word
// const adjectives = ["Engineer", "Artist", "Dancer", "Latino"];
const adjectives = ["Artist", "Dancer", "Latino", "Engineer"];
var adjectiveIndex = 0;
const wordChangeTimeoutMS = 750;
const wordChangeBufferMS = wordChangeTimeoutMS * adjectives.length + 4000;
var adjectiveIntervalId = -1;

function setAdjective() {
  const adjective = document.getElementById("adjective");
  adjective.innerHTML = adjectives[adjectiveIndex];
}

function cycleAdjective() {
  adjectiveIntervalId = setInterval(function() {

    if (adjectiveIndex >= adjectives.length - 1) {
      clearInterval(adjectiveIntervalId);
    } else {
      setAdjective();
      adjectiveIndex += 1;
    }
  }, wordChangeTimeoutMS);
}

// ADD FUNCTIONS TO WEBSITE
function addFunctionsToScroll() {
  window.onscroll = () => {
    setNavbarStyles();
    bubblesAnimation();
  }
}

window.onload = function() {
  addPortraitReactions();
  addFunctionsToScroll();
  setNavbarStyles();

  // TODO: have changeAdjective change to "Artist" rather than "Engineer"
  cycleAdjective();
  setInterval(function() {
    setAdjective();
    adjectiveIndex = 0;
    cycleAdjective();
  }, wordChangeBufferMS);
};
