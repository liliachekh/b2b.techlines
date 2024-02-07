import { useField, useFormikContext } from 'formik';
import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();

  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });

  useEffect(() => {
    if (props.name === 'imageUrls' && props.value !== field.value) {
      setFieldValue(props.name, props.value || '');
    }
  }, [props.name, props.value, field.value, setFieldValue]);
  return (
    <>
      <label
        htmlFor={props.id}
        className={props.labelClass}>
        {label}
        {meta.touched && meta.error && isDesktop
          ? <div
            className={props.errorClass}>
            {meta.error}
          </div>
          : null}
      </label>
      <input
        className={props.inputClass}
        type={props.type}
        placeholder={props.placeholder}
        id={props.id}
        {...field}
        value={field.value || ''}
        readOnly={props.name === '_id'}
        multiple={props.multiple} 
        onWheel={(e) => e.target.blur()} 
        />
      {meta.touched && meta.error && !isDesktop
        ? <div
          className={props.errorClass}>
          {meta.error}
        </div>
        : null}
    </>
  )
}

export default Input;
