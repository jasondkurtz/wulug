var col = document.querySelector('.column');
col.style.flex = col.style.msFlex = "50%";

fetch('./assets/Recruitment_Photos/')
  .then(r => r.text())
  .then(html => {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    let imgs = Array.from(doc.querySelectorAll('a'))
                    .map(a => a.href.split('/').pop())
                    .filter(f => f.match(/\.(jpe?g|png|gif|webp|svg)$/i));
    imgs.forEach(fname => {
      let img = document.createElement('img');
      img.src = `./assets/Recruitment_Photos/${fname}`;
      img.style.width = '20%';
      img.className="memberImage"
      
      col.appendChild(img);

      img.onclick = function() {
        openModal(img.src);
        console.log("Creating")
      };

    });
  })
  .catch(e => console.error('Couldn’t load images:', e));

function openModal(img) 
{

  // Create modal background
  const modalBackground = document.createElement("div");
  modalBackground.className = "recruitment-modal-background";

  const zoomed_img = new Image();
  zoomed_img.className = "recruitment-zoomed-img";
  zoomed_img.src = img;

  // Close modal on background click
  modalBackground.onclick = function() {
    document.body.removeChild(modalBackground);
    console.log("Exiting")
  };

  modalBackground.append(zoomed_img);
  document.body.appendChild(modalBackground);
}