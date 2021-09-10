import validator from 'validator';

export const url = (value: string, helpers: { message: any }) => {
  if (!validator.isURL(value)) {
    return helpers.message('{{#label}} must be a valid url');
  }
  return value;
};
