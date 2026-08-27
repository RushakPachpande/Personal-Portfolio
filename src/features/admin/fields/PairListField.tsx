import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Field } from './Field';
import { moveItem } from './reorder';

export type PairFieldConfig<T> = {
  key: keyof T & string;
  label: string;
  multiline?: boolean;
};

type PairListFieldProps<T> = {
  label: string;
  hint?: string;
  items: T[];
  fields: PairFieldConfig<T>[];
  createItem: () => T;
  onChange: (items: T[]) => void;
};

export function PairListField<T>({
  label,
  hint,
  items,
  fields,
  createItem,
  onChange,
}: PairListFieldProps<T>) {
  function updateItem(index: number, key: keyof T, value: string) {
    onChange(
      items.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [key]: value } : item
      )
    );
  }

  return (
    <Field label={label} hint={hint}>
      <div className="flex flex-col gap-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 rounded-xl border border-border/80 bg-card/40 p-4"
          >
            <div className="flex justify-end gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Move up"
                disabled={index === 0}
                onClick={() => onChange(moveItem(items, index, index - 1))}
              >
                <ArrowUp />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Move down"
                disabled={index === items.length - 1}
                onClick={() => onChange(moveItem(items, index, index + 1))}
              >
                <ArrowDown />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Remove"
                onClick={() =>
                  onChange(items.filter((_, itemIndex) => itemIndex !== index))
                }
              >
                <Trash2 />
              </Button>
            </div>
            {fields.map((field) => (
              <Field key={field.key} label={field.label}>
                {field.multiline ? (
                  <Textarea
                    rows={3}
                    value={String(item[field.key] ?? '')}
                    onChange={(event) =>
                      updateItem(index, field.key, event.target.value)
                    }
                  />
                ) : (
                  <Input
                    value={String(item[field.key] ?? '')}
                    onChange={(event) =>
                      updateItem(index, field.key, event.target.value)
                    }
                  />
                )}
              </Field>
            ))}
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => onChange([...items, createItem()])}
        >
          <Plus data-icon="inline-start" />
          Add {label.toLowerCase()}
        </Button>
      </div>
    </Field>
  );
}
