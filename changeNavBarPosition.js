function makeNavbarFixed() {
  const navbar = document.getElementById("info-navbar");
  const scrollPast = navbar.offset();
  console.log("Pixels from top: " + scrollPast);
  toggleOnFixed(navbar, scrollPast);
}

/**
 * When the user scrolls past the scrollPast parameter (number in px) from the
 *     top of the documents, it will make the element have a fixed position.
 *
 * @param element An element whose display will toggle between fixed and block.
 * @param scrollPast A number in px from the top of the document.
 */
function toggleOnFixed(element, scrollPast) {
  if (document.body.scrollTop > scrollPast || document.documentElement.scrollTop > scrollPast) {
    element.style.display = "fixed";
  } else {
    element.style.display = "block";
  }
}

export default makeNavbarFixed;