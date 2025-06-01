let events;

// JavaScript 1. Create at least one interactive element (button, menu, etc.)

function handleEventCards() {
  // Deletes the previous event / article cards
  eventRow.innerHTML = "";
  articleRow.innerHTML = "";

  // If the user's screen is not large enough to support event cards, then just load the article cards.
  let eventColumns = Math.floor(eventRow.parentElement.clientWidth / 600);
  if (eventRow.parentElement.clientWidth > 1300 && eventColumns > 1) {
    events.forEach((item, i) => {
      if (i < eventColumns) eventRow.appendChild(createEventCard(item));
      else articleRow.appendChild(createArticle(item));
    });
  } else events.forEach((item) => articleRow.appendChild(createArticle(item)));
}

// Parse the time and date to an acceptable format
function formatEventDate(ts) {
  const date = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(ts));

  const day = new Date(date).getDate();
  let suffix = "";

  if (day % 10 === 1 && day !== 11) suffix = "st";
  else if (day % 10 === 2 && day !== 12) suffix = "nd";
  else if (day % 10 === 3 && day !== 13) suffix = "rd";
  else suffix = "th";

  // Place the suffix into it's place on the back of the string
  const withSuffix = date.replace(/\d+/, (match) => `${match}${suffix}`);

  return `📅 ${withSuffix}`;
}

// Create the event card for the main events page to display at the top
function createArticle(articleData) {
  const card = document.createElement("div");
  card.className = "article-card";

  const img = new Image();
  img.className = "article-img";
  img.src = articleData.img;
  img.alt = articleData.alt;

  const content = document.createElement("div");
  content.className = "article-content-card";

  const title = document.createElement("h3");
  title.className = "article-title";
  title.textContent = articleData.title;

  const desc = document.createElement("p");
  desc.className = "article-description";
  desc.textContent = articleData.desc;

  const date = document.createElement("p");
  date.className = "article-date";
  date.textContent = formatEventDate(articleData.timestamp);

  const now = new Date();
  const eventDateObj = new Date(articleData.timestamp);
  const status = document.createElement("p");

  if (now < eventDateObj) status.textContent = `🚀 This is happening soon!`;

  content.append(title, desc, date, status);
  card.append(img, content);
  return card;
}

// Create the event card for the main events page to display at the top
function createEventCard(eventData) {
  const card = document.createElement("div");
  card.className = "event-card";

  const img = new Image();
  img.className = "event-img";
  img.src = eventData.img;
  img.alt = eventData.alt;

  const details = document.createElement("div");
  details.className = "event-details";

  const h3 = document.createElement("h3");
  h3.className = "event-title";
  h3.textContent = eventData.title;

  const p = document.createElement("p");
  p.className = "event-description";
  p.textContent = eventData.short_desc;

  card.onclick = function () {
    openModal(eventData);
  };

  details.append(h3, p);
  card.append(img, details);
  return card;
}

// Create modal background for when user clicks on an event
function openModal(eventData) {
  const modalBackground = document.createElement("div");
  modalBackground.className = "event-modal-background";

  const card = document.createElement("div");
  card.className = "article-modal-card-background";

  const img = new Image();
  img.className = "article-img";
  img.src = eventData.img;
  img.alt = eventData.alt;

  const content = document.createElement("div");
  content.className = "article-content-card";

  const title = document.createElement("h3");
  title.className = "article-title";
  title.textContent = eventData.title;

  const desc = document.createElement("p");
  desc.className = "article-description";
  desc.textContent = eventData.desc;

  const date = document.createElement("p");
  date.className = "article-date";
  date.textContent = formatEventDate(eventData.timestamp);

  // Close modal on modal background click
  modalBackground.onclick = function () {
    document.body.removeChild(modalBackground);
  };

  const now = new Date();
  const eventDateObj = new Date(eventData.timestamp);
  const status = document.createElement("p");

  // If the event timestamp is coming up, display message to user
  if (now < eventDateObj) status.textContent = `🚀 This is happening soon!`;

  content.append(title, desc, date, status);
  card.append(img, content);
  modalBackground.append(card);
  document.body.appendChild(modalBackground);
}

// Read the data preset events.json to load the current events for WuLUG
fetch("./data/events.json")
  .then((response) => response.json())
  .then((data) => {
    events = data;
    events.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    eventRow = document.querySelector(".event-row");
    articleRow = document.querySelector(".article-row");

    handleEventCards();
    window.addEventListener("resize", handleEventCards);
  });
