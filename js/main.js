// When the user scrolls down 60px from the top of the page, show the button to go back up to the top

const topButton = document.createElement("button");
topButton.className = "TopButton";
topButton.title = "Go to top";
topButton.innerText = "↑ Top of Page";

topButton.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60)
    topButton.style.display = "block";
  else topButton.style.display = "none";
}

document.body.appendChild(topButton);

// This creates hyperlinks in p tags using regex to find things that look like they could be links, so far so good

function autoLink(container) {
  container.innerHTML = container.textContent.replace(
    /(https?:\/\/[^\s]+)/g,
    '<a href="$1">$1</a>'
  );
}

const paragraphs = document.querySelectorAll("p");
paragraphs.forEach((p) => autoLink(p));
