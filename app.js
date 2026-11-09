const form = document.querySelector('#contact-form');

if (form) {
  const nameInput = form.elements.namedItem('name');
  const emailInput = form.elements.namedItem('email');
  const status = document.querySelector('#form-status');

  function validate(input) {
    let message = '';
    if (!input.value.trim()) {
      message = input === nameInput ? 'Please enter your name.' : 'Please enter your email address.';
    } else if (!input.validity.valid) {
      message = 'Please enter a valid email address.';
    }
    input.setAttribute('aria-invalid', String(Boolean(message)));
    document.getElementById(input.getAttribute('aria-describedby')).textContent = message;
    return !message;
  }

  for (const input of [nameInput, emailInput]) {
    input.addEventListener('input', () => {
      if (input.hasAttribute('aria-invalid')) validate(input);
      status.hidden = true;
    });
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    status.hidden = true;
    nameInput.value = nameInput.value.trim();
    emailInput.value = emailInput.value.trim();
    const nameIsValid = validate(nameInput);
    const emailIsValid = validate(emailInput);

    if (!nameIsValid || !emailIsValid) {
      (nameIsValid ? emailInput : nameInput).focus();
      return;
    }

    // Frontend preview only: never send, store, or claim to deliver these details.
    status.textContent = 'This form is a preview. Your details haven’t been sent or saved. For now, you can reach us using the email link.';
    status.hidden = false;
    status.focus({ preventScroll: true });
  });

  // Enable only after interception is installed, so no-JS preview cannot submit a GET.
  form.querySelector('button[type="submit"]').disabled = false;
}
