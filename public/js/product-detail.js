let qty = 1;
let selectedAttributeId = null;

function selectSize(btn) {
  if (btn.classList.contains('size-pill--disabled')) return;


  document.querySelectorAll('.size-pill').forEach(p => p.classList.remove('size-pill--active'));
  btn.classList.add('size-pill--active');

  selectedAttributeId = btn.dataset.attributeId;
  qty = 1; 
  document.getElementById('qtyValue').textContent = qty;


  const stock = parseInt(btn.dataset.stock, 10);
  const addToCartBtn = document.getElementById('addToCartBtn');
  addToCartBtn.setAttribute('data-stock', stock); 

  const hint = document.getElementById('stockHint');
  if (hint) {
    hint.textContent = stock > 0 ? `${stock} items in stock` : 'Out of stock';
    hint.className = 'stock-hint ' + (stock > 0 ? 'stock-hint--ok' : 'stock-hint--out');
  }
}

function changeQty(amount) {
  const btn = document.getElementById('addToCartBtn');
  const maxStock = parseInt(btn.getAttribute('data-stock')); 
  const qtyDisplay = document.getElementById('qtyValue');

  const newQty = qty + amount;

  if (newQty >= 1 && newQty <= maxStock) {
    qty = newQty;
    qtyDisplay.innerText = qty;
  } else if (newQty > maxStock) {
    alert(`Sorry, only ${maxStock} items available for this size.`);
  }
}

async function addToCart() {
  const btn = document.getElementById('addToCartBtn');
  const productId = btn.dataset.productId;
  const userId = btn.dataset.userId; 
  const maxStock = parseInt(btn.getAttribute('data-stock'));

  if (!selectedAttributeId) {
    alert("Please select a size first!");
    return;
  }

  if (!userId || userId === "") {
    alert("Please log in to add items to your cart.");
    window.location.href = "/login";
    return;
  }

  if (qty > maxStock) {
    alert("Quantity exceeds available stock.");
    return;
  }


  try {
    const response = await fetch('/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        productId: productId, 
        attributeId: selectedAttributeId,
        quantity: qty 
      })
    });

    if (response.ok) {
      alert("Added to cart!");
    } else {
      const result = await response.json();
      alert(result.message || "Failed to add to cart.");
    }
  } catch (err) {
    alert("An error occurred. Please try again.");
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const firstAvailable = document.querySelector('.size-pill:not(.size-pill--disabled)');
  if (firstAvailable) selectSize(firstAvailable);
});

function selectColor(btn, colorName) {

  if (btn.classList.contains('color-swatch--active')) {
    return;
  }


  document.querySelectorAll('.color-swatch')
    .forEach(s => s.classList.remove('color-swatch--active'));

  btn.classList.add('color-swatch--active');


  const label = document.getElementById('selectedColor');
  if (label) {
    label.textContent = colorName;
  }
}