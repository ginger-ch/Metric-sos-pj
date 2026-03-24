 const modal = document.getElementById('productModal');
  document.getElementById('openModalBtn').addEventListener('click', () => {
    modal.classList.add('active');
  });
  document.getElementById('closeModalBtn').addEventListener('click', () => {
    modal.classList.remove('active');
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });


  document.getElementById('searchInput').addEventListener('input', function () {
    const val = this.value.toLowerCase();
    document.querySelectorAll('.pm-card').forEach(card => {
      const name = card.querySelector('.pm-card-name').textContent.toLowerCase();
      card.style.display = name.includes(val) ? '' : 'none';
    });
  });


  document.getElementById('categoryFilter').addEventListener('change', function () {
  });