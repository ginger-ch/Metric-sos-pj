// function debounceSearch(input) {
//   clearTimeout(window._searchTimer);
//   window._searchTimer = setTimeout(() => {
//     document.getElementById('searchForm').submit();
//   }, 400);
// }

// function openModal(id)  { document.getElementById(id).style.display = 'flex'; }
// function closeModal(id) { document.getElementById(id).style.display = 'none'; }

// async function toggleVisibility(id, newVisibility) {
//   await fetch(`/admin/categories/${id}/visibility`, {
//     method: 'PATCH',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ visibility: newVisibility }),
//   });
//   location.reload();
// }

// async function deleteCategory(id) {
//   if (!confirm('Delete this category?')) return;
//   await fetch(`/admin/categories/${id}`, { method: 'DELETE' });
//   location.reload();
// }





function openModal(id)  { document.getElementById(id).style.display = 'flex'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }

function debounceSearch(input) {
  clearTimeout(window._searchTimer);
  window._searchTimer = setTimeout(() => {
    document.getElementById('searchForm').submit();
  }, 400);
}

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

let _editId = null;

function openEditModal(id, name, visibility) {
  _editId = id;
  document.getElementById('editCategoryName').value = name;
  document.getElementById('editVisibility').value   = visibility;
  openModal('editCategoryModal');
}

async function submitEdit() {
  const name       = document.getElementById('editCategoryName').value.trim();
  const visibility = document.getElementById('editVisibility').value;
  if (!name) return;

  await fetch(`/admin/categories/${_editId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ category_name: name, visibility }),
  });
  closeModal('editCategoryModal');
  location.reload();
}

function toggleAccordion(item) {
  item.classList.toggle('open');
}
