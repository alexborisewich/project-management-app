import { STRICT_REQUIRED } from 'constants/validation';

export const loginValidation = {
  required: STRICT_REQUIRED,
  validate: (value: string) => (value.match(/[а-яА-Я]/) ? 'Login should not consist any russian letters' : true),
};

export const passwordValidation = {
  required: STRICT_REQUIRED,
  validate: (value: string) => (value.length < 6 ? 'Password should be more than 6 symbols' : true),
};

export const titleValidation = {
  required: STRICT_REQUIRED,
  validate: (value: string) => (value.length < 1 ? false : true),
};
