let nameValid = false;
let emailValid = false;
let phoneValid = false;
let messageValid = false;
const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const message = document.getElementById("message");
const iti = intlTelInput(phone, { utilsScript: "../bundle/intl-tel-input.utils.js" });

isFormValid = () => {
  return (nameValid && emailValid && phoneValid && messageValid) == true;
};

checkSubmit = () => {
  document.getElementById("submit-button").disabled = !isFormValid();
};

addCustomValidation = (form) => {
  name.addEventListener("blur", () => {
    nameValid = validateName(name.value);
    checkSubmit();
  });
  email.addEventListener("blur", () => {
    emailValid = validateEmail(email.value);
    checkSubmit();
  });
  phone.addEventListener("blur", () => {
    phoneValid = validatePhone();
    checkSubmit();
  });
  message.addEventListener("blur", () => {
    messageValid = validateMessage(message.value);
    checkSubmit();
  });

  const submitButton = document.getElementById("submit-button");
  submitButton.addEventListener("click", function (event) {
    event.preventDefault();

    // clear existing error messages
    [].forEach.call(document.querySelectorAll(".message"), (div) => {
      if (!div.classList.contains("d-none")) {
        div.classList.add("d-none");
      }
    });

    if (!isFormValid()) {
      document.getElementById("general-error").classList.remove("d-none");
    }
    else {
      [].forEach.call(document.getElementsByClassName("form-control"), (element) => {
        element.value = "";
      });
      nameValid = false;
      emailValid = false;
      phoneValid = false;
      messageValid = false;
      submitButton.disabled = true;

      let messageSent = document.getElementById("message-sent");
      messageSent.classList.remove("d-none");
      messageSent.classList.add("animated", "fadeInUp");
      setTimeout(() => {
        messageSent.classList.add("animated", "fadeOutUp");
        submitButton.disabled = false;
      }, 2500);
      setTimeout(() => {
        messageSent.classList.add("animated", "fadeOutUp");
        submitButton.disabled = false;
        setTimeout(() => {
          messageSent.classList.remove("animated", "fadeOutUp");
          messageSent.classList.add("d-none");
        }, 500);
      }, 3000);
    }
  });
};

validateName = (name) => {
  let nameError = document.getElementById("name-error");
  if (name.length < 4 || name.length > 20) {
    if (name.length < 4) {
      nameError.textContent = `The name ${name} is too short.`;
    }
    else if (name.length > 20) {
      nameError.textContent = `The name ${name} is too long.`;
    }
    document.getElementById("name-error").classList.remove("d-none");
    nameValid = false;
    return nameValid;
  }
  else {
    document.getElementById("name-error").classList.add("d-none");
    nameValid = true;
    return nameValid;
  }
};

validateEmail = (email) => {
  const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  if (!emailRegex.test(email)) {
    let emailError = document.getElementById("email-error");
    emailError.classList.remove("d-none");
    emailError.textContent = `The email ${email} is not a valid.`;
    emailValid = false;
    return emailValid;
  }
  else {
    document.getElementById("email-error").classList.add("d-none");
    emailValid = true;
    return emailValid;
  }
};

validatePhone = () => {
  let phoneError = document.getElementById("phone-error");

  if (iti.isValidNumber()) {
    phoneError.classList.add("d-none");
    phoneValid = true;
    return phoneValid;
  }
  else {
    let countryCode = iti.getSelectedCountryData().dialCode;
    let fullNumber = `+${countryCode}${phone.value}`;
    switch (iti.getValidationError()) {
      case 1:
        phoneError.textContent = `Invalid country code - +${countryCode}.`;
        break;
      case 2:
        phoneError.textContent = `Number "${fullNumber}" is too short.`;
        break;
      case 3:
        phoneError.textContent = `Number "${fullNumber}" is too long.`;
        break;
      case 4:
        phoneError.textContent = `"${fullNumber}" is not a valid number.`;
        break;
      default:
        phoneError.textContent = `Invalid number "${fullNumber}".`;
        break;
    }
    phoneError.classList.remove("d-none");
    phoneValid = false;
    return phoneValid;
  }
};

validateMessage = (message) => {
  let messageError = document.getElementById("message-error");
  if (message.length < 4 || message.length > 5000) {
    if (message.length < 4) {
      messageError.textContent = `The message ${message} is too short.`;
    }
    else if (message.length > 5000) {
      messageError.textContent = "The message is too long.";
    }
    messageError.classList.remove("d-none");
    messageValid = false;
    return messageValid;
  }
  else {
    messageError.classList.add("d-none");
    messageValid = true;
    return messageValid;
  }
};

addCustomValidation(document.querySelector("form"));
