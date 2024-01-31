import { ChangeEvent } from 'react';

interface FormInputProps {
  type: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export const FormInput = ({
  type,
  label,
  placeholder,
  onChange,
  value
}: FormInputProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  return (
    <div className="mb-4">
      <label className="block text-white text-sm uppercase mb-2 text-left" htmlFor={label}>
        {label}
      </label>
      <input
        className="w-full border rounded-md py-2 px-3 bg-transparent focus:bg-transparent"
        type={type}
        id={label}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormInput;
