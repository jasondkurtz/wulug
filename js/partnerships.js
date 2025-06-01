fetch("./data/partners.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.querySelector(".partnerships");

    data.forEach((partner) => {
      const card = document.createElement("div");
      card.className = "emblem-card";

      const img = document.createElement("img");
      img.src = partner.photo;
      img.alt = partner.name;

      img.onclick = () => openModal(img.src);

      const desc = document.createElement("div");
      desc.className = "desc";
      desc.textContent = partner.name;
      desc.style.color = partner.color;

      card.appendChild(img);
      card.appendChild(desc);

      const partnerLink = document.createElement("a");
      partnerLink.href = partner.link;
      partnerLink.appendChild(card);
      container.appendChild(partnerLink);
    });
  });

// Validate user input
document
  .querySelector(".partnerships-form")
  .addEventListener("submit", function (e) {
    const description = document.getElementById("description").value.trim();

    if (description === "" || description.length < 30) {
      alert(
        "Please fill out the 'Tell us about your organization and goals for partnering' section."
      );
      e.preventDefault();
      document.getElementById("description").focus();
    }
  });
