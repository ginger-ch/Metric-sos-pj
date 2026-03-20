
document.addEventListener('DOMContentLoaded', () => {
  renderPagination(CURRENT_PAGE, TOTAL_PAGES);
});

function renderPagination(current, total) {
  const wrapper = document.getElementById('paginationWrapper');
  if (!wrapper || total <= 1) return;

  wrapper.innerHTML = '';

  // Prev button
  const prev = createBtn('←', current === 1);
  prev.classList.add('page-btn-prev');
  if (current > 1) {
    prev.addEventListener('click', () => goToPage(current - 1));
  }
  wrapper.appendChild(prev);

  // Page number
  const pages = getPageNumbers(current, total);
  pages.forEach(p => {
    if (p === '...') {
      const dots = createBtn('...', false);
      dots.classList.add('dots');
      wrapper.appendChild(dots);
    } else {
      const btn = createBtn(p, false);
      if (p === current) btn.classList.add('active');
      btn.addEventListener('click', () => goToPage(p));
      wrapper.appendChild(btn);
    }
  });

  // Next button
  const next = createBtn('→', current === total);
  next.classList.add('page-btn-next');
  if (current < total) {
    next.addEventListener('click', () => goToPage(current + 1));
  }
  wrapper.appendChild(next);
}

// Go to page 
function goToPage(page) {
  const url = new URL(window.location.href);
  url.searchParams.set('page', page);
  window.location.href = url.toString();
}

function createBtn(label, disabled) {
  const btn = document.createElement('button');
  btn.className = 'page-btn';
  btn.textContent = label;
  if (disabled) btn.disabled = true;
  return btn;
}

function getPageNumbers(current, total) {
  const pages = [];

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
    return pages;
  }

  pages.push(1);
  if (current > 3) pages.push('...');

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push('...');
  pages.push(total);

  return pages;
}
