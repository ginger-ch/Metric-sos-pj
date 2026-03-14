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
});