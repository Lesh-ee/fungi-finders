const navToggle = document.querySelector('[aria-controls="prime-nav"]');
const primeNav = document.querySelector("#prime-nav");

/*
a personal project I wanted to try, not part of the tutorial
this way people on mobile without JS can use the navigation
*/
function enableBurger() {
  //this is to prevent it showing the transition when the page loads
  primeNav.style.transition = "none";

  navToggle.setAttribute("aria-expanded", "false");
  navToggle.hidden = false;
  navToggle.setAttribute("nav-js", "true");
}
enableBurger();

//this is to prevent it showing the transition when the page resizes
window.addEventListener("resize", () => {
  primeNav.style.transition = "none";
});

//the activating of the dropdown menu
//since other things nuke the transition, this adds it back
navToggle.addEventListener("click", () => {
  primeNav.style.transition = "";

  const navOpened = navToggle.getAttribute("aria-expanded");
  console.log(navOpened);

  if (navOpened === "false") {
    navToggle.setAttribute("aria-expanded", "true");
  } else {
    navToggle.setAttribute("aria-expanded", "false");
  }
});

//this adds the fade-out animation to the hero, since that anim just bricks the hero in firefox
//again, this is more of a personal project
//if it wasn't obvious the tutorial was on chrome and I'm using firefox
function enableHeroAnim() {
  const hero = document.querySelector(".hero");

  //this is a canIuse for css, neat!
  if (CSS.supports("animation-timeline", "view()")) {
    hero.classList.add("scroll-fade");
  }
}
enableHeroAnim();

//<select> filtering for mushroom-guide.html
const cards = document.querySelectorAll(".mushroom-guide .card");
const seasonalFilter = document.querySelector("#season");
const edibleFilter = document.querySelector("#edible");
const noResultsMessage = document.querySelector(".no-matches");
//this is a canIuse for JS, neat!
const supportsViewTransitions = "startViewTransition" in document;

//in the event of a refresh where the webpage retains the <select> value
//the currentFilters are whatever the selects contain when the page loads
//then refilter acordingly
const currentFilters = {
  season: seasonalFilter.value,
  edible: edibleFilter.value,
};
filterCards();
/*
this is somehow all that's necessary to make the cards move around when filtering
magic man, idk
*/
cards.forEach((card, index) => {
  const mushroomId = `mushroom-${index + 1}`;
  card.style.viewTransitionName = `card-${mushroomId}`;
});

seasonalFilter.addEventListener("change", updateFilter);
edibleFilter.addEventListener("change", updateFilter);

function updateFilter(e) {
  const filterType = e.target.id;
  currentFilters[filterType] = e.target.value;

  //essentially, as long as you aren't using firefox or IE you get a cool transition
  if (supportsViewTransitions) {
    document.startViewTransition(() => filterCards());
  } else {
    filterCards();
  }
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
