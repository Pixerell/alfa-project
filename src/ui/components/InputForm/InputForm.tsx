import React from "react";
import "./InputForm.css";

type FormInputProps = {
  id?: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  textarea?: boolean;
  step?: string;
  error?: string;
};

export const FormInput: React.FC<FormInputProps> = React.memo(
  ({
    id,
    label,
    type = "text",
    value,
    onChange,
    required = true,
    textarea,
    step,
    error,
  }) => {
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => onChange(e.target.value);

    return (
      <div className='form-input-wrapper'>
        <div className='form-input-label-row'>
          <label htmlFor={id} className='form-input-label'>
            {label}:
          </label>
          {error && <span className='form-input-error'>{error}</span>}
        </div>

        {textarea ? (
          <textarea
            id={id}
            value={value}
            onChange={handleChange}
            required={required}
            className='form-textarea'
          />
        ) : (
          <input
            id={id}
            className='form-input'
            type={type}
            value={value}
            onChange={handleChange}
            required={required}
            step={step}
          />
        )}
      </div>
    );
  }
);

export default FormInput;
