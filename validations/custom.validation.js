const passwordValidation = (value, helpers) => {
  if (value.length < 8 || value.length > 15) {
    return helpers.message("password must be between 8 and 15 characters");
  }
  if (
    !value.match(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[\d])(?=.*?[#?!@$%^&*-]).{8,}$/
    )
  ) {
    return helpers.message(
      "password must contain At least one upper case, one lower case, one special character and 1 numeric"
    );
  }
  return value;
};

const alphaOnly = (value, helpers) => {
  if (value.length > 30) {
    return helpers.message(
      "First Name / Last Name cannot be more than 30 characters"
    );
  }
  if (!value.match(/^[A-Z]+$/)) {
    return helpers.message(
      "first name / last name should be uppeer case alphabet only"
    );
  }
  return value;
};

const alphaNumeric = (value, helpers) => {
  if (!value.match(/^[A-Za-z0-9]+$/)) {
    return helpers.message("should be alphaNumeric");
  }
  return value;
};

const validEmail = function (value) {
  return {
    "string.base": value + " should be a type of String",
    "string.empty": value + " cannot be an empty field",
    "string.min": value + " should have a minimum length of 3",
    "any.required": value + " is a required field",
    "string.email": value + " should be a valid email",
  };
};

function validString(value) {
  return {
    "string.base": value + " should be a type of String",
    "string.empty": value + " cannot be an empty field",
    "string.min": value + " should have a minimum length of 3",
    "any.required": value + " is a required field",
  };
}

function validNumber(value) {
  return {
    "number.base": value + " should be a type of number",
    "number.min": value + " should have a minimum length of 10 digits",
    "number.max": value + " should have a maximum length of 10 digits",
    "any.required": value + " is a required field",
  };
}

module.exports = {
  passwordValidation,
  alphaOnly,
  alphaNumeric,
  validEmail,
  validString,
  validNumber,
};
