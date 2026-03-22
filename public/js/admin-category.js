function debounceSearch(input) {
  clearTimeout(window._searchTimer);
  window._searchTimer = setTimeout(() => {
    document.getElementById('searchForm').submit();
  }, 400);
}

function openModal(id)  { document.getElementById(id).style.display = 'flex'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }