import ErrorComponent from "./error";

interface IInputComponent {
  label?: string;
  placeholder: string;
  type: "text";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}
const Input04 = (props: IInputComponent) => {
  return (
    <>
      <div className="w-full">
        <label className="mb-2">{props.label}</label>
        <input
          className="w-full max-w-[500px] px-3 py-2"
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          required
        />
        {props.error ? (
          <ErrorComponent error={props.error} />
        ) : (
          <div className="h-[20px]"></div>
        )}
      </div>
    </>
  );
};
export default Input04;
