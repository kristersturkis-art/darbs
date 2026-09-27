document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const successMessage = document.getElementById('successMessage');

  // Regex e-pasta pārbaudei
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Funkcija kļūdas parādīšanai
  function showError(input, errorElement, message) {
    input.classList.add('invalid');
    errorElement.textContent = message;
  }

  // Funkcija kļūdas dzēšanai
  function clearError(input, errorElement) {
    input.classList.remove('invalid');
    errorElement.textContent = '';
  }

  // Vārda validācija
  function validateName() {
    const errorEl = document.getElementById('nameError');
    if (nameInput.value.trim() === '') {
      showError(nameInput, errorEl, 'Lūdzu, ievadiet vārdu!');
      return false;
    }
    clearError(nameInput, errorEl);
    return true;
  }

  // E-pasta validācija
  function validateEmail() {
    const errorEl = document.getElementById('emailError');
    const emailVal = emailInput.value.trim();
    if (emailVal === '') {
      showError(emailInput, errorEl, 'Lūdzu, ievadiet e-pastu!');
      return false;
    } else if (!emailRegex.test(emailVal)) {
      showError(emailInput, errorEl, 'Ievadiet derīgu e-pasta adresi!');
      return false;
    }
    clearError(emailInput, errorEl);
    return true;
  }

  // Ziņojuma validācija
  function validateMessage() {
    const errorEl = document.getElementById('messageError');
    const msgVal = messageInput.value.trim();
    if (msgVal === '') {
      showError(messageInput, errorEl, 'Lūdzu, ievadiet ziņojumu!');
      return false;
    } else if (msgVal.length < 10) {
      showError(messageInput, errorEl, 'Ziņojumam jābūt vismaz 10 simbolus garam!');
      return false;
    }
    clearError(messageInput, errorEl);
    return true;
  }

  // Dinamiskā validācija (dzēš kļūdu, kad lietotājs sāk rakstīt)
  nameInput.addEventListener('input', validateName);
  emailInput.addEventListener('input', validateEmail);
  messageInput.addEventListener('input', validateMessage);

  // Formas iesniegšana
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Neļauj lapai pārlādēties

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    // Ja visi lauki ir derīgi
    if (isNameValid && isEmailValid && isMessageValid) {
      successMessage.hidden = false; // Parāda veiksmīga paziņojuma ziņu
      form.reset(); // Attīra formas laukus
    } else {
      successMessage.hidden = true;
    }
  });
});
