import { Control, FieldPath, FieldValues } from "react-hook-form";
import { FormField as BaseFormField } from "@/components/ui/form";

interface TypedFormFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> {
  control: Control<TFieldValues>;
  name: TName;
  render: ({ field }: { field: any }) => React.ReactElement;
}

export function TypedFormField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({ control, name, render }: TypedFormFieldProps<TFieldValues, TName>) {
  return (
    <BaseFormField
      control={control as any}
      name={name as any}
      render={render}
    />
  );
}