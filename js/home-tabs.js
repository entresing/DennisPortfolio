(function () {
  "use strict";

  function getHomePortfolio() {
    return (document.body.dataset.portfolio || "ux").trim();
  }

  function filterProjectCards() {
    var homePortfolio = getHomePortfolio();
    var cards = document.querySelectorAll("[data-portfolio-type]");

    cards.forEach(function (card) {
      var cardPortfolio = (card.dataset.portfolioType || "").trim();
      var isMatch = cardPortfolio === homePortfolio;

      card.hidden = !isMatch;
      card.setAttribute("aria-hidden", String(!isMatch));
    });
  }

  document.addEventListener("DOMContentLoaded", filterProjectCards);
})();
