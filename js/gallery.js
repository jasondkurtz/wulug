//Event Photos importing from file

var scroll_container_div = document.querySelector(
  ".gallery-scroll-container-div"
);

function categoryImages(category) {
  let path = category.photo_urls_folder;
  let category_name = category.category_name;
  let category_title_color = category.title_color;

  fetch(path)
    .then((r) => r.text())
    .then((html) => {
      let doc = new DOMParser().parseFromString(html, "text/html");
      let imgs = Array.from(doc.querySelectorAll("a"))
        .map((a) => a.href.split("/").pop())
        .filter((f) => f.match(/\.(jpe?g|png|gif|webp|svg)$/i));

      let gallery_category_title = document.createElement("h2");
      gallery_category_title.className = "gallery-category-title";
      gallery_category_title.innerText = category_name;
      gallery_category_title.style.color = category_title_color;

      let gallery_scroll_container = document.createElement("div");
      gallery_scroll_container.className = "gallery-scroll-container";
      gallery_scroll_container.style.height = "50%";

      imgs.forEach((fname) => {
        let img = document.createElement("img");
        img.src = img.src = `${path}/${fname}`;
        img.style.width = "20%";
        img.style.height = "100%";

        gallery_scroll_container.appendChild(img);

        img.onclick = function () {
          openModal(img.src);
        };
      });

      scroll_container_div.appendChild(gallery_category_title);
      scroll_container_div.appendChild(gallery_scroll_container);
    })
    .catch((e) => console.error("Couldn’t load images:", e));
}

// When a user clicks on a picture, open a closer photo in a modal
function openModal(img) {
  // Create modal background
  const modalBackground = document.createElement("div");
  modalBackground.className = "gallery-modal-background";

  const zoomed_img = new Image();
  zoomed_img.className = "gallery-zoomed-img";
  zoomed_img.src = img;

  // Close modal on background click
  modalBackground.onclick = function () {
    document.body.removeChild(modalBackground);
    console.log("Exiting");
  };

  modalBackground.append(zoomed_img);
  document.body.appendChild(modalBackground);
}

const response = await fetch("./data/gallery.json");
const data = await response.json();

// Sort: most recent first
const categories = data.sort(
  (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
);

for (const category of categories) {
  categoryImages(category);
}
