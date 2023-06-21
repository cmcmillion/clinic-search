const validateName = (value) => {
  if (!/^[a-zA-Z\s]+$/.test(value)) {
    throw new Error(
      "Invalid query parameter: name parameter must be at least 1 character, only alphabet letters and spaces, case sensitive"
    );
  }
  return value;
};

const validateState = (value) => {
  if (!/^[a-zA-Z\s]+$/.test(value)) {
    throw new Error(
      "Invalid query parameter: state parameter must be at least 1 character, only alphabet letters and spaces, case sensitive"
    );
  }
  return value;
};

const validateTime = (value) => {
  if (!/^([01]\d|2[0-4]):([0-5]\d)$/.test(value)) {
    throw new Error(
      "Invalid query parameter: to and from parameters must be in the format HH:MM, where HH is from 00 to 24 and MM is from 00 to 59"
    );
  }
  return value;
};

export { validateName, validateState, validateTime };
