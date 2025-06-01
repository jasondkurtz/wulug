// JavaScript 1. Create at least one interactive element (button, menu, etc.)

fetch("./data/officers.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.querySelector(".leadership");

    data.forEach((student) => {
      const card = document.createElement("div");
      card.className = "face-card";

      const img = document.createElement("img");
      img.src = student.photo;
      img.alt = student.name;

      const desc = document.createElement("div");
      desc.className = "desc";
      desc.innerHTML = `${student.name}<br>${student.position}`;
      
      card.appendChild(img);
      card.appendChild(desc);

      container.appendChild(card);
    });
  });
