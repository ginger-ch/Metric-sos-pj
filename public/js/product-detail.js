let qty = 1;

    /* attribute_id of currently selected size pill */
    let selectedAttributeId = null;

    // ── Gallery
    function selectImage(btn, src) {
      document.getElementById('mainImage').src = src;
      document.querySelectorAll('.gallery__thumb')
        .forEach(t => t.classList.remove('gallery__thumb--active'));
      btn.classList.add('gallery__thumb--active');
    }

    // ── Color  (visual only — color filter if needed)
    function selectColor(btn, color) {
      document.querySelectorAll('.color-swatch')
        .forEach(s => s.classList.remove('color-swatch--active'));
      btn.classList.add('color-swatch--active');
      document.getElementById('selectedColor').textContent = color;
    }

    // ── Size  (sets selectedAttributeId + stock hint)
    function selectSize(btn) {
      if (btn.disabled) return;
      document.querySelectorAll('.size-pill')
        .forEach(p => p.classList.remove('size-pill--active'));
      btn.classList.add('size-pill--active');

      selectedAttributeId = btn.dataset.attributeId;
      qty = 1;
      document.getElementById('qtyValue').textContent = qty;

      const stock = parseInt(btn.dataset.stock, 10);
      const hint  = document.getElementById('stockHint');
      if (hint) {
        hint.textContent = stock > 0 ? `${stock} items in stock` : 'Out of stock';
        hint.className   = 'stock-hint ' + (stock > 0 ? 'stock-hint--ok' : 'stock-hint--out');
      }
    }

    // ── Quantity
    function changeQty(delta) {
      qty = Math.max(1, qty + delta);
      document.getElementById('qtyValue').textContent = qty;
    }

    // ── Add to cart  → POST /cart/add
    //    Body maps to cart_items columns:
    //      product_id   = products.product_id
    //      attribute_id = product_attributes.attribute_id
    //      quantity     = cart_items.quantity
    async function addToCart() {
      const btn       = document.getElementById('addToCartBtn');
      const productId = btn.dataset.productId;

      if (!selectedAttributeId) {
        alert('Please select a size.');
        return;
      }

      btn.disabled    = true;
      btn.textContent = 'Adding…';

      try {
        const res = await fetch('/cart/add', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            product_id:   productId,
            attribute_id: selectedAttributeId,
            quantity:     qty
          })
        });

        if (res.ok) {
          btn.textContent = '✓ Added';
          setTimeout(() => {
            btn.textContent = 'ADD TO CART';
            btn.disabled    = false;
          }, 1800);
        } else {
          const data = await res.json().catch(() => ({}));
          alert(data.message || 'Could not add to cart. Please try again.');
          btn.textContent = 'ADD TO CART';
          btn.disabled    = false;
        }
      } catch {
        alert('Network error. Please try again.');
        btn.textContent = 'ADD TO CART';
        btn.disabled    = false;
      }
    }

    // Trigger stock hint for first available size on load
    const firstAvailable = document.querySelector('.size-pill:not(.size-pill--disabled)');
    if (firstAvailable) selectSize(firstAvailable);