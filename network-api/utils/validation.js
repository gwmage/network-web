import validator from 'validator';

export function validateEmail(email) {
  if (!email || !validator.isEmail(email)) {
    return 'Invalid email format';
  }
  return null;
}

export function validatePassword(password) {
  if (!password) {
    return 'Password is required';
  }
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  if (!passwordRegex.test(password)) {
    return 'Password must contain at least one letter, one number, and one special character';
  }
  return null;
}

export function validateContact(contact) {
  if (!contact || !validator.isMobilePhone(contact.toString())) {
    return 'Invalid contact number format';
  }
  return null;
}

export function validateName(name) {
  if (!name || name.trim().length === 0) {
    return 'Name is required';
  }
  return null;
}