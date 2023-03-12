const items = [
  {
    title: "Dypsis Lutescens",
    description: "Her size and her beautiful green feathery leaves give an instantly stunning effect in whatever room you put her in.",
    tags: ["air cleaner", "pet friendly"],
    price: 109.95,
    img: "./img/1.jpeg",
    rating: 4.4,
  },
  {
    title: "Monstera",
    description: "A very special plant that would love a spot inside your urban jungle! Thanks to the large leaves, this plant is an excellent air purifier.",
    tags: ["air cleaner"],
    price: 69.95,
    img: "./img/2.jpeg",
    rating: 2.9,
  },
  {
    title: "Senecio Rowleyanus",
    description: "Let these beautiful pearl strings trail out of a cabinet, from a shelf or out of a macrame hanger.",
    tags: ["air cleaner"],
    price: 29.95,
    img: "./img/3.jpeg",
    rating: 5.0,
  },
  {
    title: "«Robusta» Ficus",
    description: "With her dark green, leathery leaves, the Robusta is a tough but elegant looking presence.",
    tags: ["air cleaner"],
    price: 44.95,
    img: "./img/4.jpeg",
    rating: 4.0,
  },
  {
    title: "Ceropegia Woodii «Variegata»",
    description: "This beautiful plant has heart shaped leaves with a silver base and some green spots on it.",
    tags: ["air cleaner"],
    price: 19.95,
    img: "./img/5.jpeg",
    rating: 4.9,
  },
  {
    title: "Pachira Aquatica",
    description: "The braided Pachira Aquatica is a beautiful green plant with a braided tree trunk which might remind you a bit of South American mangroves.",
    tags: ["air cleaner", "pet friendly"],
    price: 26.95,
    img: "./img/6.jpeg",
    rating: 3.2,
  },
  {
    title: "Iresine Herbstii «Bloodleaf»",
    description: "Bloodleaf is known for her stunning ornamental foliage. Her leaf colour varies from a dark purple to beet red with magenta veins.",
    tags: ["air cleaner", "pet friendly"],
    price: 4.45,
    img: "./img/7.jpeg",
    rating: 3.9,
  },
  {
    title: "Zamioculcas Zamiifolia",
    description: "Unlike other succulents though, Zamioculcas Zamiifolia does like a little moisture to keep her stems and leaves growing well and retaining their deep green colour.",
    tags: ["air cleaner"],
    price: 22.95,
    img: "./img/8.jpeg",
    rating: 3.4,
  },
  {
    title: "Yucca Elephantipes",
    description: "The Yucca, also called the Palm Lily, has green leaves with sometimes a hint of creamy-white and have a sharp edge. The roots of Yucca can be used in conditioner.",
    tags: ["air cleaner"],
    price: 69.95,
    img: "./img/9.jpeg",
    rating: 4.8,
  },
  {
    title: "Peperomia Pepperspot",
    description: "Peremorian leaves are round, small and green, but the red back and the striking stem that is reddish-brown in colour make her look special. It is from these leaves that she owes her nickname of 'Green Coins'.",
    tags: ["air cleaner", "pet friendly"],
    price: 16.95,
    img: "./img/10.jpeg",
    rating: 3.2,
  },
  {
    title: "Tillandsia Usneoides",
    description: "Tillandsia Usneoides is an air plant, which means that it extracts its nutrients and water from the air. It’s a very easy plant to care for, and looks a bit like an octopus swimming gracefully through the sea.",
    tags: ["air cleaner", "pet friendly"],
    price: 12.95,
    img: "./img/11.jpeg",
    rating: 4.7,
  },
  {
    title: "Ficus Bonsai",
    description: "Ficus is one of the most popular indoor Bonsai because it is easy to care for and makes a great gift. Having a Ficus in the home is believed to release positivity and understanding.",
    tags: ["air cleaner", "pet friendly"],
    price: 39.95,
    img: "./img/12.jpeg",
    rating: 4.8,
  },
];

let currentState = [...items];

const itemsContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");

function renderItems(arr) {
  nothingFound.textContent = "";
  itemsContainer.innerHTML = "";
  arr.forEach((item) => {
    itemsContainer.append(prepareShopItem(item));
  });
  if (!arr.length) {
    nothingFound.textContent = "Nothing found";
  }
}

function sortByAlphabet(a, b) {
  if (a.title > b.title) {
    return 1;
  }
  if (a.title < b.title) {
    return -1;
  }
  return 0;
}

renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

function prepareShopItem(shopItem) {
  const { title, description, tags, img, price, rating } = shopItem;
  const item = itemTemplate.content.cloneNode(true);
  
  item.querySelector("h1").textContent = title;
  item.querySelector("p").textContent = description;
  item.querySelector("img").src = img;
  item.querySelector(".price").textContent = `${price}€`;

  const ratingContainer = item.querySelector(".rating");
  for (let i = 0; i < rating; i++) {
    const star = document.createElement("i");
    star.classList.add("fa", "fa-star");
    ratingContainer.append(star);
  }

  const tagsHolder = item.querySelector(".tags");

  tags.forEach((tag) => {
    const element = document.createElement("span");
    element.textContent = tag;
    element.classList.add("tag");
    tagsHolder.append(element);
  });

  return item;
}

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");

function applySearch() {
  const searchString = searchInput.value.trim().toLowerCase();

  currentState = items.filter((el) =>
    el.title.toLowerCase().includes(searchString)
  );
  currentState.sort((a, b) => sortByAlphabet(a, b));
  renderItems(currentState);
  sortControl.selectedIndex = 0;
}

searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("search", applySearch);

const sortControl = document.querySelector("#sort");
sortControl.addEventListener("change", (event) => {
  const selectedOption = event.target.value;
  switch (selectedOption) {
    case "expensive": {
      currentState.sort((a, b) => b.price - a.price);
      break;
    }
    case "cheap": {
      currentState.sort((a, b) => a.price - b.price);
      break;
    }
    case "rating": {
      currentState.sort((a, b) => b.rating - a.rating);
      break;
    }
    case "alphabet": {
      currentState.sort((a, b) => sortByAlphabet(a, b));
      break;
    }
  }
  renderItems(currentState);
});