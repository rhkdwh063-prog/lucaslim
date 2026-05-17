const searchForm = document.querySelector("#sample-search-form");
const searchInput = document.querySelector("#sample-search");

searchForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (!query) {
    searchInput.focus();
    return;
  }

  console.info("Search fabric sample:", query);
});
