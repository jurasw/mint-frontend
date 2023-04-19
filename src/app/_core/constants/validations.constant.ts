export const VALIDATORS = {
  phone: /^\+48[0-9]{9}$/,
  email:
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  login: /^[a-zA-Z0-9ąćęłńóśżźĄĆĘŁŃÓŚŻŹ]+$/,
  dateFormat: /^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/
};

export const VALIDATOR_EXAMPLES = {
  phone: '+48123123123',
  email: 'mail@mail.pl',
  login: 'nickName11',
  dateFormat: '12.12.1950'
};
