const STRICT_REQUIRED = 'Strict required';

export const loginValidation = {
  required: STRICT_REQUIRED,
  validate: (value: string) => {
    if (value.match(/[а-яА-Я]/)) {
      return 'Login should not consist any russian letters';
    }
    return true;
  },
};

export const passwordValidation = {
  required: STRICT_REQUIRED,
  validate: (value: string) => {
    if (value.length < 6) {
      return 'Password should be more than 6 symbols';
    }
    return true;
  },
};
