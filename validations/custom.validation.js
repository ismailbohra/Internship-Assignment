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

const validEmail = function (value) {
  return {
    "string.base": value + " should be a type of String",
    "string.empty": value + " cannot be an empty field",
    "string.min": value + " should have a minimum length of 3",
    "any.required": value + " is a required field",
    "string.email": value + " should be a valid email",
  };
};




module.exports = {
  passwordValidation,
  validEmail,
};
