document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.parentElement;
    item.classList.toggle('open');
  });
});

document.querySelectorAll('.status-select').forEach(select => {
  select.addEventListener('change', async (e) => {
    const id = e.target.dataset.id;
    const status = e.target.value;
    await fetch(`/admin/orders/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
  });
});
