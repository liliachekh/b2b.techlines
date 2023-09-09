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
    .required("Required Field!"),
  confPassword: Yup.string()
    .min(7, 'Must contain at least 7 letters')
    .max(30, 'Can be no more than 30 characters')
    .matches(/^[a-zA-Z0-9]+$/, 'Must be a-z A-Z 0-9')
    .trim()
    .oneOf([Yup.ref('password'), null], 'New and confirm passwords must match')
    .required("Required Field!"),
});