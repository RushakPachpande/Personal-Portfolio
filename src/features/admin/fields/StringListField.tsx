import { useState, type KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field } from './Field';

type StringListFieldProps = {
  label: string;
  hint: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
};

export function StringListField({
  label,
  hint,
  values,
  onChange,
  placeholder = 'Add item and press Enter',
}: StringListFieldProps) {
  const [draft, setDraft] = useState('');

  function addValue() {
    const next = draft.trim();
    if (!next || values.includes(next)) {
      setDraft('');
      return;
    }
    onChange([...values, next]);
    setDraft('');
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
      addValue();
    }
  }

  return (
    <Field label={label} hint={hint}>
      <div className="flex flex-wrap gap-1.5">
        {values.map((value) => (
          <Badge key={value} variant="secondary" className="gap-1 pr-1">
            {value}
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              title={`Remove “${value}” from this list. The rest of the items stay.`}
              aria-label={`Remove ${value}`}
              onClick={() => onChange(values.filter((item) => item !== value))}
            >
              <X data-icon="inline-start" />
            </Button>
          </Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          aria-label={`Add to ${label}`}
        />
        <Button
          type="button"
          variant="outline"
          title="Append the typed value to this list. Duplicate values are ignored."
          onClick={addValue}
        >
          Add
        </Button>
      </div>
    </Field>
  );
}
