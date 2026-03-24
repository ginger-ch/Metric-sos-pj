document.addEventListener('DOMContentLoaded', () => {

  const navbar          = document.getElementById('mainNavbar');
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu      = document.getElementById('mobileMenu');
  const mobileOverlay   = document.getElementById('mobileMenuOverlay');
  const mobileClose     = document.getElementById('mobileMenuClose');
  const categoryToggle  = document.querySelector('.mobile-category-toggle');
  const categoryList    = document.getElementById('mobileCategoryList');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  });

  mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent background scroll
  });

  function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  mobileClose.addEventListener('click', closeMobileMenu);
  mobileOverlay.addEventListener('click', closeMobileMenu);

  categoryToggle.addEventListener('click', () => {
    categoryToggle.classList.toggle('open');
    categoryList.classList.toggle('open');
  });

  updateBasketCount();

});

function updateBasketCount() {
  try {
    const basket = JSON.parse(localStorage.getItem('girlette_basket')) || [];
    const total = basket.reduce((sum, item) => sum + (item.qty || 1), 0);
    const countEl = document.getElementById('basketCount');
    if (countEl) {
      countEl.textContent = total;
      countEl.classList.toggle('visible', total > 0);
    }
  } catch (e) {
    console.error('Basket count error:', e);
  }
}