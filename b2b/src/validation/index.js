import * as Yup from 'yup';
 
export const validationSchemaLogin = Yup.object({
  loginOrEmail: Yup.string()
    .required("Required Field!")
    .min(4, 'Must contain at least 4 characters')
    .matches(/@/, 'Email must contain "@" symbol'),
  password: Yup.string()
    .min(7, 'Must contain at least 7 letters')
    .max(30, 'Can be no more than 30 characters')
    .required("Required Field!"),
});

export const validationSchemaRegisteredEmail = Yup.object({
  registeredEmail: Yup.string()
    .required("Required Field!")
    .email('Invalid email'),
});

export const validationSchemaAccount = Yup.object({
  contactPerson: Yup.string()
    .min(2, 'Must contain at least 2 letters')
    .max(25, 'Can be no more than 25 characters')
    .matches(/^[a-zA-Zа-яА-Я]+( [a-zA-Zа-яА-Я]+)*$/, 'Must be a-z A-Z а-я А-Я with optional space between words')
    .trim()
    .required("Required Field!"),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  telephone: Yup.string()
    .matches(/^\+\d{2}\d{10}$/, "Invalid phone number format")
    .required("Required Field!"),
});

export const validationSchemaPassword = Yup.object({
  curPassword: Yup.string()
    .min(7, 'Must contain at least 7 letters')
    .max(30, 'Can be no more than 30 characters')
    .matches(/^[a-zA-Z0-9]+$/, 'Must be a-z A-Z 0-9')
    .trim()
    .required("Required Field!"),
  password: Yup.string()
    .min(7, 'Must contain at least 7 letters')
    .max(30, 'Can be no more than 30 characters')
    .matches(/^[a-zA-Z0-9]+$/, 'Must be a-z A-Z 0-9')
    .trim()
    .notOneOf([Yup.ref('curPassword'), null], 'New and current passwords must NOT match')
    .required("Required Field!"),
  confPassword: Yup.string()
    .min(7, 'Must contain at least 7 letters')
    .max(30, 'Can be no more than 30 characters')
    .matches(/^[a-zA-Z0-9]+$/, 'Must be a-z A-Z 0-9')
    .trim()
    .oneOf([Yup.ref('password'), null], 'New and confirm passwords Must match')
    .required("Required Field!"),
});

export const validationSchemaOrderShipping = Yup.object({
  countryName: Yup.string()
    .min(2, 'Must contain at least 2 letters')
    .max(25, 'Can be no more than 25 characters')
    .matches(/^[a-zA-Zа-яА-Яіїє']+$/, 'Must be a-z A-Z а-я А-Я')
    .required("Required Field!"),
  index: Yup.string()
    // .matches(/^\d{13}$/, 'Must contain exactly 13 digits')
    .required("Required Field!"),
  region: Yup.string()
    .min(2, 'Must contain at least 2 letters')
    .max(30, 'Can be no more than 30 characters')
    .required("Required Field!"),
  city: Yup.string()
    .min(2, 'Must contain at least 2 letters')
    .max(25, 'Can be no more than 25 characters')
    .trim()
    .required("Required Field!"),
  street: Yup.string()
    .min(2, 'Must contain at least 2 letters')
    .max(30, 'Can be no more than 30 characters')
    .required("Required Field!"),
  house: Yup.string()
    .min(2, 'Must contain at least 2 letters')
    .max(10, 'Can be no more than 10 characters')
    .trim()
    .required("Required Field!"),
  apartment: Yup.string()
    .min(2, 'Must contain at least 2 letters')
    .max(10, 'Can be no more than 10 characters')
    .required("Required Field!"),
  firstName: Yup.string()
    .min(2, 'Must contain at least 2 letters')
    .max(25, 'Can be no more than 25 characters')
    .matches(/^[a-zA-Zа-яА-ЯіїєІЇЄ]+( [a-zA-Zа-яА-ЯіїєІЇЄ']+)*$/, 'Must be a-z A-Z а-я А-Я with optional space between words')
    .trim()
    .required("Required Field!"),
  lastName: Yup.string()
    .min(2, 'Must contain at least 2 letters')
    .max(25, 'Can be no more than 25 characters')
    .matches(/^[a-zA-Zа-яА-ЯіїєІЇЄ]+( [a-zA-Zа-яА-ЯіїєІЇЄ']+)*$/, 'Must be a-z A-Z а-я А-Я with optional space between words')
    .trim()
    .required("Required Field!"),
  email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format')
    .required('Required'),
  telephone: Yup.string()
    .matches(/^\+\d{11,12}$/, "Invalid phone number format")
    .required("Required Field!"),
})
