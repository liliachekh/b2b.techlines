import { useField } from 'formik';
import { PatternFormat } from "react-number-format";
import { useMediaQuery } from 'react-responsive';

const InputMasked = ({ label, ...props }) => {
  const [field, meta] = useField(props);
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
      <PatternFormat
        className={props.inputClass}
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
        format={props.format}
        allowEmptyFormatting mask={props.mask}
        {...field} />
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
