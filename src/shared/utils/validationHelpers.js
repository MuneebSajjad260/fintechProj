const bottomSheetEmailValidator = (email) => {
  console.log('email-----',email);
  const re = /\S+@\S+\.\S+/;
  if (!email) return "Email can't be empty.";
  if (!re.test(email)) return 'Ooops! We need a valid email address.';
  return '';
};


const validatePhoneNumber = phoneNumber => {
  const regex = /^[0-9+\-\s]{6,}$/;
  if (!regex.test(phoneNumber)) {
    return 'Please enter a valid phone number';
  }
  return '';
};

const emailValidator = loginError => {
  if (loginError) return 'Your username or password is incorrect';
  // if (!re.test(email)) return 'Your username or password is incorrect'
  return '';
};
const passwordValidator = loginError => {
  if (loginError) return 'Your username or password is incorrect';
  // if (!re.test(password)) return 'Your username or password is incorrect'
};

const setPasswordValidator = (password) => {
  const minChar = /.{8,}/;
  const upperCase = /[A-Z]/;
  const numeric = /[0-9]/;
  const specialSymbol = /[! £ $ % ^ & \\ - * # : @ ? > <]/;
  

  if (!password) {
    return { error: 'password is empty', id: [{ id: -1 }] };
  } else if (!minChar.test(password)) {
    return { error: 'Must be a minimum of 8 characters long', id: [{ id: 1 }] };
  } else if (!upperCase.test(password)) {
    return { error: 'Must contain an uppercase letter', id: [{ id: 2 }] };
  } else if (!numeric.test(password)) {
    return { error: 'Must contain a number', id: [{ id: 3 }] };
  } else if (!specialSymbol.test(password)) {
    return { error: 'Must contain a special symbol', id: [{ id: 9 }] };
  } else {
    return { error: 'no error', id: [{ id: 4 }] };
  }
};

const confirmPasswordValidator = (password, confirmPassword) => {
  if (confirmPassword && password !== confirmPassword) {
    return {error: "Password don't match", id: -1, status: false};
  } else {
    return {error: 'password match', id: 0, status: true};
  }
};
export {
  emailValidator,
  validatePhoneNumber,
  passwordValidator,
  bottomSheetEmailValidator,
  confirmPasswordValidator,
  setPasswordValidator,
};


// HTML Parser
const extractPlainText = (htmlString) => {
  // Remove HTML tags using a regular expression
  // const plainText = htmlString.replace(/<[^>]+>/g, '');

  // // Replace <br> tags with line breaks using another regular expression
  // const formattedText = plainText.replace(/<br\s*[/]?>/gi, '\n');

  // return formattedText;
};
