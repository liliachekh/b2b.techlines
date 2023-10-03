import { useField } from 'formik';
import { useMediaQuery } from 'react-responsive';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const InputMasked = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });

  return (
    <>
      <label
        htmlFor={props.id || props.name}
        className={props.labelClass}>
        {label}
        {meta.touched && meta.error && isDesktop
          ? <div
            className={props.errorClass}>
            {meta.error}
          </div>
          : null}
      </label>
      <PhoneInput
        id={props.id}
        name={props.name}
        international
        defaultCountry="ES"
        countryCallingCodeEditable={false}
        value={field.value}
        onChange={(value) => {
          helpers.setValue(value);
        }}
      />
      {meta.touched && meta.error && !isDesktop
        ? <div
          className={props.errorClass}>
          Complete the field in the given format
        </div>
        : null}
    </>
  )
}

export default InputMasked;
