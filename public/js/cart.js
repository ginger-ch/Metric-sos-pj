document.addEventListener('DOMContentLoaded', () => {

  const checkoutBtn = document.getElementById('checkoutBtn');
  const thankyou = document.getElementById('checkoutThankyou');
  const closeBtn = document.getElementById('closeThankyou');

  checkoutBtn?.addEventListener('click', async () => {
    try {
      const res = await fetch('/cart/checkout', { method: 'POST' });
      const data = await res.json();

      if (data.success) {
        if (thankyou) thankyou.style.display = 'block';
        updateCartCount(0);
      }
    } catch (err) {
      console.error('Checkout error:', err);
    }
  });

  closeBtn?.addEventListener('click', () => {
    window.location.reload();
  });

  fetchCartCount();

});

async function fetchCartCount() {
  try {
    const res = await fetch('/cart/count');
    const data = await res.json();
    updateCartCount(data.count || 0);
  } catch {
    updateCartCount(0);
  }
}

function updateCartCount(count) {
  const el = document.getElementById('cartCount');
  if (!el) return;
  el.textContent = count;
  el.classList.toggle('visible', count > 0);
}