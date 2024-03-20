import style from './addAdminParamsForm.module.scss';

export const addAdminParamsFormFields = [
    {
      tagType: 'regular',
      label: "Type",
      labelClass: style.form__label,
      inputClass: style.form__input,
      errorClass: style.form__error,
      id: "type",
      name: "type",
      type: "text",
      placeholder: "Enter type",
      readOnly: true,
    },
    {
      tagType: 'regular',
      label: "Name",
      labelClass: style.form__label,
      inputClass: style.form__input,
      errorClass: style.form__error,
      id: "name",
      name: "name",
      type: "text",
      placeholder: "Enter name",
    },
  ];