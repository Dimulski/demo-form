let usernameValid = false;
let emailValid = false;
let passwordValid = false;
let confirmPasswordValid = false;
let termsCheckboxValid = false;

isFormValid = () => {
  return (usernameValid && emailValid && passwordValid && confirmPasswordValid && termsCheckboxValid) == true;
}

checkSubmit = () => {
  document.getElementById("submit-button").disabled = !isFormValid();
}

addCustomValidation = (form) => {

  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const termsCheckbox = document.getElementById("termsCheckbox");

  // setInterval as alternative
  /*
  setTimeout(function repeatingFunc() {
      checkSubmit();
      setTimeout(repeatingFunc, 1000);
  }, 1000);
  */

  username.addEventListener("blur", () => {
    usernameValid = validateUsername(username.value);
    checkSubmit();
  });
  email.addEventListener("blur", () => {
    emailValid = validateEmail(email.value);
    checkSubmit();
  });
  password.addEventListener("blur", () => {
    passwordValid = validatePassword(password.value);
    checkSubmit();
  });
  confirmPassword.addEventListener("blur", () => {
    confirmPasswordValid = validateConfirmPassword(confirmPassword.value);
    checkSubmit();
  });
  termsCheckbox.addEventListener("change", () => {
    termsCheckboxValid = validateTermsCheckbox(termsCheckbox);
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
      document.getElementsByClassName("main-content")[0].style.display = "none";
      document.getElementById("registered-message").classList.remove("d-none");
      document.getElementById("registered-message").classList.add("animated", "fadeInUp");
      setTimeout(() => {
        document.getElementById("registered-message").classList.add("animated", "fadeOutUp");
      }, 2500);
    }
  });
}

validateUsername = (username) => {
  if (username.length < 4 || username.length > 20) {
    document.getElementById("username-error").classList.remove("d-none");
    usernameValid = false;
    return usernameValid;
  }
  else {
    document.getElementById("username-error").classList.add("d-none");
    usernameValid = true;
    return usernameValid;
  }
}

validateEmail = (email) => {
  const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  if (!emailRegex.test(email)) {
    document.getElementById("email-error").classList.remove("d-none");
    emailValid = false;
    return emailValid;
  }
  else {
    document.getElementById("email-error").classList.add("d-none");
    emailValid = true;
    return emailValid;
  }
}

validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    document.getElementById("password-error").classList.remove("d-none");
    passwordValid = false;
    return passwordValid;
  }
  else {
    document.getElementById("password-error").classList.add("d-none");
    passwordValid = true;
    return passwordValid
  }
}

validateConfirmPassword = (confirmPassword) => {
  if (confirmPassword != password.value) {
    document.getElementById("confirmPassword-error").classList.remove("d-none");
    confirmPasswordValid = false;
    return confirmPasswordValid;
  }
  else {
    document.getElementById("confirmPassword-error").classList.add("d-none");
    confirmPasswordValid = true;
    return confirmPasswordValid;
  }
}

validateTermsCheckbox = (termsCheckbox) => {
  if (!termsCheckbox.checked) {
    document.getElementById("terms-error").classList.remove("d-none");
    termsCheckboxValid = false;
    return termsCheckboxValid;
  }
  else {
    document.getElementById("terms-error").classList.add("d-none");
    termsCheckboxValid = true;
    return termsCheckboxValid;
  }
}

addCustomValidation(document.querySelector("form"));
