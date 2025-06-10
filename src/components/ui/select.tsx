interface Option {
  value: string;
  label: string;
}

interface SelectComponentProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}
const SelectComponent = ({ label, options, value, onChange }: SelectComponentProps) => {
  return (
    <div>
      <p className="mb-2">{label}</p>
      <select
        className="w-full px-3 py-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
export default SelectComponent;