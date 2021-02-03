function addPortraitReactions() {
  let contactMeButton = document.getElementById("contact-me");
  let resumeButton = document.getElementById("resume");

  let starEyes = document.getElementById("Star_Eyes");
  let shades = document.getElementById("Shades");

  contactMeButton.addEventListener("mouseenter", function (event) {
    starEyes.style.display = "block";
  })

  contactMeButton.addEventListener("mouseleave", function (event) {
    starEyes.style.display = "none";
  })

  resumeButton.addEventListener("mouseenter", function (event) {
    shades.style.display = "block";
  })

  resumeButton.addEventListener("mouseleave", function (event) {
    shades.style.display = "none";
  })
}

export default addPortraitReactions;