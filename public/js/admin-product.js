document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('productModal');
    const form = document.getElementById('productForm');
    const modalTitle = document.getElementById('modalTitle');
    const container = document.getElementById('attribute-container');
    const uploadBox = document.getElementById('imageUploadBox');
    const uploadText = document.getElementById('uploadText');
    const imageInput = document.getElementById('imageInput');

    // --- Helper: Reset Image Box ---
    function resetImageBox() {
        uploadBox.style.backgroundImage = 'none';
        uploadText.innerText = "UPLOAD IMAGES";
        imageInput.value = ""; // Clears the file selection
    }

    function createAttributeRow(size = '', color = '', stock = '') {
        const row = document.createElement('div');
        row.className = 'pm-form-row attribute-row';
        row.innerHTML = `
            <input type="text"   name="sizes[]"  class="pm-input" placeholder="Size" value="${size}">
            <input type="text"   name="colors[]" class="pm-input" placeholder="Color" value="${color}">
            <input type="number" name="stocks[]" class="pm-input" placeholder="Qty" value="${stock}">
            <button type="button" class="btn-remove" title="Remove row">−</button>
        `;
        row.querySelector('.btn-remove').addEventListener('click', () => { row.remove(); });
        return row;
    }

    // --- Image Preview Logic ---
    imageInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                uploadBox.style.backgroundImage = `url(${e.target.result})`;
                uploadBox.style.backgroundSize = 'cover';
                uploadBox.style.backgroundPosition = 'center';
                uploadText.innerText = `${imageInput.files.length} IMAGES SELECTED`;
            }
            reader.readAsDataURL(this.files[0]);
        }
    });

    // --- OPEN FOR NEW PRODUCT ---
    document.getElementById('openModalBtn').addEventListener('click', () => {
        modalTitle.innerText = "New Product";
        form.action = "/admin/products"; 
        form.reset();
        resetImageBox(); // Clear images
        container.innerHTML = ''; 
        container.appendChild(createAttributeRow()); 
        modal.classList.add('active');
    });

    // --- OPEN FOR EDIT ---
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.edit-trigger');
        if (btn) {
            modalTitle.innerText = "Edit Product";
            form.action = `/admin/products/${btn.dataset.id}/edit`;
            resetImageBox(); // Reset image box for clean edit

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

    // --- CLOSE MODAL ---
    const closeModal = () => {
        modal.classList.remove('active');
        resetImageBox(); // Clear image preview so it's gone when reopened
    };

    document.getElementById('closeModalBtn').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    document.getElementById('add-attribute-btn').addEventListener('click', () => {
        container.appendChild(createAttributeRow());
    });
});