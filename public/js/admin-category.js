function debounceSearch(input) {
  clearTimeout(window._searchTimer);
  window._searchTimer = setTimeout(() => {
    document.getElementById('searchForm').submit();
  }, 400);
}