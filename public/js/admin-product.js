document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('productModal');
    const form = document.getElementById('productForm');
    const modalTitle = document.getElementById('modalTitle');
    const container = document.getElementById('attribute-container');


    function createAttributeRow(size = '', color = '', stock = '') {
        const row = document.createElement('div');
        row.className = 'pm-form-row attribute-row';
        row.innerHTML = `
            <input type="text"   name="sizes[]"  class="pm-input" placeholder="Size" value="${size}">
            <input type="text"   name="colors[]" class="pm-input" placeholder="Color" value="${color}">
            <input type="number" name="stocks[]" class="pm-input" placeholder="Qty" value="${stock}">
            <button type="button" class="btn-remove" title="Remove row">−</button>
        `;
        
        row.querySelector('.btn-remove').addEventListener('click', () => {
            row.remove();
        });
        return row;
    }


    document.getElementById('openModalBtn').addEventListener('click', () => {
        modalTitle.innerText = "New Product";
        form.action = "/admin/products"; 
        form.reset();
        container.innerHTML = ''; // Clear old rows
        container.appendChild(createAttributeRow()); // Add one empty row
        modal.classList.add('active');
    });

  
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-trigger')) {
            const btn = e.target;
            modalTitle.innerText = "Edit Product";
            form.action = `/admin/products/${btn.dataset.id}/edit`; 

            document.getElementById('modalName').value = btn.dataset.name || '';
            document.getElementById('modalDetail').value = btn.dataset.detail || '';
            document.getElementById('modalPrice').value = btn.dataset.price || '';
            document.getElementById('modalCategory').value = btn.dataset.category || '';


            container.innerHTML = '';
            if (btn.dataset.attributes) {
                const attrs = JSON.parse(btn.dataset.attributes);
                attrs.forEach(a => container.appendChild(createAttributeRow(a.size, a.color, a.stock_qty)));
            } else {
                container.appendChild(createAttributeRow());
            }

            modal.classList.add('active');
        }
    });


    document.getElementById('add-attribute-btn').addEventListener('click', () => {
        container.appendChild(createAttributeRow());
    });


    document.getElementById('closeModalBtn').addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });
});