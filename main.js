const navToggle = document.querySelector('[aria-controls="prime-nav"]');
const primeNav = document.querySelector("#prime-nav");

navToggle.addEventListener("click", () => {
  const navOpened = navToggle.getAttribute("aria-expanded");

  if (navOpened === "false") {
    navToggle.setAttribute("aria-expanded", "true");
  } else {
    navToggle.setAttribute("aria-expanded", "false");
  }
});

//a personal project I wanted to try, not part of the tutorial
//this way people on mobile without JS can use the navigation
function enableBurger() {
  navToggle.hidden = false;
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("nav-js", "true");
}
enableBurger();

//<select> filtering for mushroom-guide.html
const cards = document.querySelectorAll(".mushroom-guide .card");
const seasonalFilter = document.querySelector("#season");
const edibleFilter = document.querySelector("#edible");
const noResultsMessage = document.querySelector(".no-matches");

//in the event of a refresh where the webpage retains the <select> value
//the currentFilters are whatever the selects contain when the page loads
//then refilter acordingly
const currentFilters = {
  season: seasonalFilter.value,
  edible: edibleFilter.value,
};
filterCards();

seasonalFilter.addEventListener("change", updateFilter);
edibleFilter.addEventListener("change", updateFilter);

function updateFilter(e) {
  const filterType = e.target.id;
  currentFilters[filterType] = e.target.value;

  filterCards();
}

function filterCards() {
  let hasVisibleCards = false;
  cards.forEach((card) => {
    //if the card contains a data-season (it better) then from that dataset get the season (i.e. "fall") then set season to that
    const season = card.querySelector("[data-season]").dataset.season;
    const edible = card.querySelector("[data-edible]").dataset.edible;

    const matchesSeason = currentFilters.season === season;
    const matchesEdible = currentFilters.edible === edible;

    if (
      (matchesEdible || currentFilters.edible === "all") &&
      (matchesSeason || currentFilters.season === "all")
    ) {
      card.hidden = false;
      hasVisibleCards = true;
    } else {
      card.hidden = true;
    }

    //if there are cards, then it is hidden, and vice versa
    noResultsMessage.hidden = hasVisibleCards;
  });
}

function enableFiltering() {
  seasonalFilter.hidden = false;
  edibleFilter.hidden = false;
}
enableFiltering();
