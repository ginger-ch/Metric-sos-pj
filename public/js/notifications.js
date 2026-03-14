document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.adm-notif-close').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = document.getElementById('notif-' + btn.dataset.index);
      if (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateX(20px)';
        setTimeout(() => card.remove(), 250);
      }
    });
  });

  document.querySelectorAll('.adm-cat-item').forEach(item => {
    item.addEventListener('click', () => {
      const index    = item.dataset.index;
      const products = document.getElementById('cat-products-' + index);
      const arrow    = document.getElementById('arrow-' + index);
      products.classList.toggle('open');
      arrow.classList.toggle('open');
    });
  });

});