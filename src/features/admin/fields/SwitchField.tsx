import { Switch } from '@/components/ui/switch';
import { Field } from './Field';

type SwitchFieldProps = {
  label: string;
  hint: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function SwitchField({
  label,
  hint,
  checked,
  onChange,
}: SwitchFieldProps) {
  return (
    <Field label={label} hint={hint}>
      <div className="flex h-8 items-center">
        <Switch
          checked={checked}
          onCheckedChange={onChange}
          aria-label={label}
        />
      </div>
    </Field>
  );
}
