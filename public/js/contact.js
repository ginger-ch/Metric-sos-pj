document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('subscribeForm');
  const modal = document.getElementById('successModal');
  const modalText = modal.querySelector('p');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const res = await fetch('/subscribe', {
        method: 'POST',
        body: new URLSearchParams(formData)
      });

      const data = await res.json();


      modalText.textContent = data.message;
      modal.classList.remove('hidden');

      if (res.ok) {
        form.reset();
      }

    } catch (err) {
      console.error(err);

      modalText.textContent = "Something went wrong";
      modal.classList.remove('hidden');
    }
  });


  modal.querySelector('button').addEventListener('click', () => {
    modal.classList.add('hidden');
  });
});