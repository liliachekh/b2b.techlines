import { useField } from 'formik';

const Select = ( {items, options, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label
        htmlFor={props.id}
        className={props.labelClass}>
        {props.label}
      </label>
      <select
        className={props.inputClass}
        type={props.type}
        placeholder={props.placeholder}
        id={props.id}
        {...field}
        value={field.value || ''}
        multiple={props.multiple}>
        <option value="" disabled>
          Choose from the list
        </option>
        {/* {props.options.map((option) => {
          if (option !== 'mint' || !props.isInAccount) return (
            <option key={option} value={option}>
              {option}
            </option>)
        })} */}
        {/* {items?.map(({ name, type }) => (
            <option key={type} value={name}>
            {name}
          </option>
        ))} */}
        {options
          ? options.map((option) => (
              // Ваш код для options
              <option key={option} value={option}>
                {option}
              </option>
            ))
          : items?.map(({ name, type }) => (
              // Ваш код для items
              <option key={name} value={name}>
                {name}
              </option>
            ))}
      </select>
      {meta.touched && meta.error ? (
        <div className={props.errorClass}>{meta.error}</div>
      ) : null}
    </>
  );
};

export default Select;