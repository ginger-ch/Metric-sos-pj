function debounceSearch(input) {
  clearTimeout(window._searchTimer);
  window._searchTimer = setTimeout(() => {
    document.getElementById('searchForm').submit();
  }, 400);
}

function openModal(id)  { document.getElementById(id).style.display = 'flex'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }

async function toggleVisibility(id, newVisibility) {
  await fetch(`/admin/categories/${id}/visibility`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ visibility: newVisibility }),
  });
  location.reload();
}

async function deleteCategory(id) {
  if (!confirm('Delete this category?')) return;
  await fetch(`/admin/categories/${id}`, { method: 'DELETE' });
  location.reload();
}

function openEditModal(id, name, visibility) {
  document.getElementById('editCategoryName').value = name;
  document.getElementById('editVisibility').value   = visibility;
  document.getElementById('editCategoryForm').action = `/admin/categories/${id}?_method=PUT`;
  openModal('editCategoryModal');
}