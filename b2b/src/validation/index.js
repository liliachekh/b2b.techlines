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
    .matches(/^[A-Za-z\s\-/'.,]+$/, 'Must be a-z A-Z , . - /')
    .trim()
    .required("Required Field!"),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  telephone: Yup.string()
    .matches(/^\+\d{11,12}$/, "Invalid phone number format")
    .required("Required Field!"),
});

export const validationSchemaPassword = Yup.object({
  curPassword: Yup.string()
    .min(7, 'Must contain at least 7 letters')
    .max(30, 'Can be no more than 30 characters')
    .required("Required Field!"),
  password: Yup.string()
    .min(7, 'Must contain at least 7 letters')
    .max(30, 'Can be no more than 30 characters')
    .notOneOf([Yup.ref('curPassword'), null], 'New and current passwords must NOT match')
    .required("Required Field!"),
  confPassword: Yup.string()
    .min(7, 'Must contain at least 7 letters')
    .max(30, 'Can be no more than 30 characters')
    .oneOf([Yup.ref('password'), null], 'New and confirm passwords Must match')
    .required("Required Field!"),
});

export const validationSchemaOrderShipping = Yup.object({
  countryName: Yup.string()
    .min(2, 'Must contain at least 2 letters')
    .max(25, 'Can be no more than 25 characters')
    .matches(/^[A-Za-z\s\-/'.,]+$/, 'Must be a-z A-Z , . - /')
    .required("Required Field!"),
  index: Yup.string()
    .matches(/^\d+$/, 'Must contain only digits')
    .required("Required Field!"),
  region: Yup.string()
    .min(2, 'Must contain at least 2 letters')
    .max(30, 'Can be no more than 30 characters')
    .matches(/^[A-Za-z\s\-/'.,]+$/, 'Must be a-z A-Z , . - /')
    .required("Required Field!"),
  city: Yup.string()
    .min(2, 'Must contain at least 2 letters')
    .max(25, 'Can be no more than 25 characters')
    .matches(/^[A-Za-z\s\-/'.,]+$/, 'Must be a-z A-Z , . - /')
    .trim()
    .required("Required Field!"),
  street: Yup.string()
    .min(2, 'Must contain at least 2 letters')
    .max(30, 'Can be no more than 30 characters')
    .matches(/^[A-Za-z\s\-/'.,]+$/, 'Must be a-z A-Z , . - /')
    .required("Required Field!"),
  house: Yup.string()
    .min(1, 'Must contain at least 1 letters')
    .max(10, 'Can be no more than 10 characters')
    .trim()
    .required("Required Field!"),
  apartment: Yup.string()
    .min(1, 'Must contain at least 1 letters')
    .max(10, 'Can be no more than 10 characters')
    .required("Required Field!"),
  firstName: Yup.string()
    .min(2, 'Must contain at least 2 letters')
    .max(25, 'Can be no more than 25 characters')
    .matches(/^[A-Za-z\s\-/'.,]+$/, 'Must be a-z A-Z , . - /')
    .trim()
    .required("Required Field!"),
  lastName: Yup.string()
    .min(2, 'Must contain at least 2 letters')
    .max(25, 'Can be no more than 25 characters')
    .matches(/^[A-Za-z\s\-/'.,]+$/, 'Must be a-z A-Z , . - /')
    .trim()
    .required("Required Field!"),
  email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format')
    .required('Required Field!'),
  telephone: Yup.string()
    .matches(/^\+\d{11,12}$/, "Invalid phone number format")
    .required("Required Field!"),
  paymentInfo: Yup.string()
    .required("A payment option is required"),
})

export const validationSchemaProfileShipping = Yup.object({
  countryName: Yup.string()
    .min(2, 'Must contain at least 2 letters')
    .max(25, 'Can be no more than 25 characters')
    .matches(/^[A-Za-z\s\-/'.,]+$/, 'Must be a-z A-Z , . - /')
    .required("Required Field!"),
  index: Yup.string()
    .matches(/^\d+$/, 'Must contain only digits')
    .required("Required Field!"),
  region: Yup.string()
    .min(2, 'Must contain at least 2 letters')
    .max(30, 'Can be no more than 30 characters')
    .matches(/^[A-Za-z\s\-/'.,]+$/, 'Must be a-z A-Z , . - /')
    .required("Required Field!"),
  city: Yup.string()
    .min(2, 'Must contain at least 2 letters')
    .max(25, 'Can be no more than 25 characters')
    .matches(/^[A-Za-z\s\-/'.,]+$/, 'Must be a-z A-Z , . - /')
    .trim()
    .required("Required Field!"),
  street: Yup.string()
    .min(2, 'Must contain at least 2 letters')
    .max(30, 'Can be no more than 30 characters')
    .required("Required Field!"),
  house: Yup.string()
    .min(1, 'Must contain at least 1 letters')
    .max(10, 'Can be no more than 10 characters')
    .trim()
    .required("Required Field!"),
  apartment: Yup.string()
    .min(1, 'Must contain at least 1 letters')
    .max(10, 'Can be no more than 10 characters')
    .required("Required Field!"),
  firstName: Yup.string()
    .min(2, 'Must contain at least 2 letters')
    .max(25, 'Can be no more than 25 characters')
    .matches(/^[A-Za-z\s\-/'.,]+$/, 'Must be a-z A-Z , . - /')
    .trim()
    .required("Required Field!"),
  lastName: Yup.string()
    .min(2, 'Must contain at least 2 letters')
    .max(25, 'Can be no more than 25 characters')
    .matches(/^[A-Za-z\s\-/'.,]+$/, 'Must be a-z A-Z , . - /')
    .trim()
    .required("Required Field!"),
  email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format')
    .required('Required'),
  telephone: Yup.string()
    .matches(/^\+\d{11,12}$/, "Invalid phone number format")
    .required("Required Field!"),
})

export const validationSchemaNewPassword = Yup.object({
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