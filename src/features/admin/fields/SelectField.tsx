import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Field } from './Field';

type SelectOption = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
};

export function SelectField({
  label,
  hint,
  value,
  onChange,
  options,
  placeholder = 'Select…',
}: SelectFieldProps) {
  return (
    <Field label={label} hint={hint}>
      <Select value={value || undefined} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  );
}
