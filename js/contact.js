const form = document.getElementById("contact-form");
const successBox = document.getElementById("form-success");

// Keep the HTML validation attributes, but let JavaScript show the messages
form.noValidate = true;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function setError(input, message) {
  const error = document.getElementById(input.id + "-error");
  if (message) {
    error.textContent = message;
    error.hidden = false;
    input.setAttribute("aria-invalid", "true");
  } else {
    error.textContent = "";
    error.hidden = true;
    input.removeAttribute("aria-invalid");
  }
  return message === "";
}

const checks = {
  name: function (el) {
    return el.value.trim().length >= 3 ? "" : "Enter your name (at least 3 characters).";
  },
  email: function (el) {
    return emailPattern.test(el.value.trim()) ? "" : "Enter a valid email address, like name@example.com.";
  },
  subject: function (el) {
    return el.value !== "" ? "" : "Choose a subject.";
  },
  message: function (el) {
    return el.value.trim().length >= 20 ? "" : "Write at least 20 characters so I can help you.";
  },
  consent: function (el) {
    return el.checked ? "" : "Tick the box to agree to be contacted.";
  }
};

function validateField(id) {
  const input = document.getElementById(id);
  return setError(input, checks[id](input));
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  successBox.hidden = true;

  // Run every check (no early exit) so all errors show at once
  const results = Object.keys(checks).map(validateField);
  const isValid = results.every(Boolean);

  if (!isValid) {
    const firstInvalid = form.querySelector('[aria-invalid="true"]');
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  successBox.hidden = false;
  form.reset();
});

// Clear an error as soon as the user fixes the field
Object.keys(checks).forEach(function (id) {
  const input = document.getElementById(id);
  const eventName = input.type === "checkbox" || input.tagName === "SELECT" ? "change" : "input";
  input.addEventListener(eventName, function () {
    if (input.getAttribute("aria-invalid") === "true") validateField(id);
  });
});
