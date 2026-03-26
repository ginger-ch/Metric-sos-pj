document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('productModal');
    const form = document.getElementById('productForm');
    const modalTitle = document.getElementById('modalTitle');
    const container = document.getElementById('attribute-container');
    const uploadBox = document.getElementById('imageUploadBox');
    const uploadText = document.getElementById('uploadText');
    const imageInput = document.getElementById('imageInput');

    if (!modal || !form || !container) return; // prevent crash

    // --- Helper: Reset Image Box ---
    function resetImageBox() {
        if (!uploadBox || !uploadText || !imageInput) return;
        uploadBox.style.backgroundImage = 'none';
        uploadText.innerText = "UPLOAD IMAGES";
        imageInput.value = "";
    }

    // --- Create Attribute Row ---
    function createAttributeRow(size = '', color = '', stock = 0){
        const row = document.createElement('div');
        row.className = 'pm-form-row attribute-row';

        row.innerHTML = `
            <input type="text" name="sizes[]"  class="pm-input" placeholder="Size" value="${size}">
            <input type="text" name="colors[]" class="pm-input" placeholder="Color" value="${color}">
            <input type="number" name="stocks[]" class="pm-input" placeholder="Qty" value="${stock}" min="0">
            <button type="button" class="btn-remove">−</button>
        `;

        row.querySelector('.btn-remove').addEventListener('click', () => {
            row.remove();

            // Ensure at least 1 row exists
            if (container.children.length === 0) {
                container.appendChild(createAttributeRow());
            }
        });

        return row;
    }

    // --- Image Preview Logic ---
    if (imageInput) {
        imageInput.addEventListener('change', function () {
            if (!this.files || this.files.length === 0) return;

            const reader = new FileReader();
            reader.onload = function (e) {
                uploadBox.style.backgroundImage = `url(${e.target.result})`;
                uploadBox.style.backgroundSize = 'cover';
                uploadBox.style.backgroundPosition = 'center';
                uploadText.innerText = `${imageInput.files.length} IMAGE(S) SELECTED`;
            };
            reader.readAsDataURL(this.files[0]);
        });
    }

    // --- OPEN: CREATE ---
    const openBtn = document.getElementById('openModalBtn');
    if (openBtn) {
        openBtn.addEventListener('click', () => {
            modalTitle.innerText = "New Product";
            form.action = "/admin/products";

            form.reset();
            resetImageBox();

            container.innerHTML = '';
            container.appendChild(createAttributeRow());

            modal.classList.add('active');
        });
    }

    // --- OPEN: EDIT ---
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.edit-trigger');
        if (!btn) return;

        modalTitle.innerText = "Edit Product";
        form.action = `/admin/products/${btn.dataset.id}/edit`;

        resetImageBox();

        document.getElementById('modalName').value = btn.dataset.name || '';
        document.getElementById('modalDetail').value = btn.dataset.detail || '';
        document.getElementById('modalPrice').value = btn.dataset.price || '';
        document.getElementById('modalCategory').value = btn.dataset.category || '';

        container.innerHTML = '';

        // --- SAFER JSON PARSE ---
        let attrs = [];
        try {
            if (btn.dataset.attributes) {
                attrs = JSON.parse(btn.dataset.attributes);
            }
        } catch (err) {
            console.error("Invalid attribute JSON:", err);
        }

        if (attrs.length > 0) {
            attrs.forEach(a => {
                container.appendChild(
                    createAttributeRow(a.size, a.color, a.stock_qty)
                );
            });
        } else {
            container.appendChild(createAttributeRow());
        }

        modal.classList.add('active');
    });

    // --- CLOSE MODAL ---
    function closeModal() {
        modal.classList.remove('active');
        resetImageBox();
    }

    const closeBtn = document.getElementById('closeModalBtn');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // --- ADD ATTRIBUTE ---
    const addBtn = document.getElementById('add-attribute-btn');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            container.appendChild(createAttributeRow());
        });
    }
});
// Change these lines to match your EJS IDs
const searchInput = document.getElementById('searchInput'); // Was 'search-input'
const categorySelect = document.getElementById('categoryFilter'); // Was 'category-filter'

function applyFilters() {
    const url = new URL(window.location.href);
    
    // Search logic
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        const searchValue = searchInput.value.trim();
        if (searchValue) url.searchParams.set('search', searchValue);
        else url.searchParams.delete('search');
    }

    // Category logic
    const categorySelect = document.getElementById('categoryFilter');
    if (categorySelect) {
        const categoryValue = categorySelect.value;
        // If value is empty string (All Categories), remove the param
        if (categoryValue && categoryValue !== "") {
            url.searchParams.set('category', categoryValue);
        } else {
            url.searchParams.delete('category');
        }
    }

    // Always reset to page 1 when filtering
    url.searchParams.delete('page'); 
    
    window.location.href = url.href;
}

// Event Listeners
if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') applyFilters();
    });
}

if (categorySelect) {
    categorySelect.addEventListener('change', applyFilters);
}