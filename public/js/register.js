//Toggle password
const toggleBtn = document.getElementById('toggleBtn');
const passwordInput = document.getElementById('password');
const eyeIcon = document.getElementById('eye-icon');

toggleBtn.addEventListener('click', () => {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    eyeIcon.innerHTML = `
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    `;
  } else {
    passwordInput.type = 'password';
    eyeIcon.innerHTML = `
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    `;
  }
});

//Toggle checkbox
let isChecked = true;
const customCheckbox = document.getElementById('customCheckbox');
const termsInput = document.getElementById('terms');

customCheckbox.addEventListener('click', () => {
  isChecked = !isChecked;
  termsInput.checked = isChecked;
  if (isChecked) {
    customCheckbox.classList.remove('unchecked');
  } else {
    customCheckbox.classList.add('unchecked');
  }
});

document.querySelector('label[for="terms"]').addEventListener('click', () => {
  customCheckbox.click();
});
