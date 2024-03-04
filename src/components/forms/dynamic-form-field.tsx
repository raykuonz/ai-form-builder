import { FieldOptionSelectModel, QuestionSelectModel } from '@/types/form-types';
import { FormControl, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

interface DynamicFormFieldProps {
  question: QuestionSelectModel & { fieldOptions: FieldOptionSelectModel[] };
  value: string;
  onChange: (value?: string | React.ChangeEvent<HTMLInputElement>) => void;
}

const DynamicFormField = ({
  question,
  value,
  onChange,
}: DynamicFormFieldProps) => {

  const components = {
    Input: () => <Input type="text" onChange={onChange} />,
    Switch: () => <Switch  />,
    Textarea: () => <Textarea />,
    Select: () => (
      <Select
        onValueChange={onChange}
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue
              placeholder="Select an option"
            />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {question.fieldOptions.map((option) => (
            <SelectItem
              key={`${option.label} ${option.value}`}
              value={`${option.id}`}
              className='cursor-pointer'
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ),
    RadioGroup: () => (
      <RadioGroup
        onValueChange={onChange}
      >
        {question.fieldOptions.map((option) => (
          <FormItem
            key={`${option.label} ${option.value}`}
            className='flex items-center space-x-3 space-y-0'
          >
            <FormControl>
              <RadioGroupItem
                id={`${option.id}`}
                value={`${option.id}`}
              />
            </FormControl>
            <Label
              htmlFor={`${option.id}`}
              className='text-base'
            >
              {option.label}
            </Label>
          </FormItem>
        ))}
      </RadioGroup>
    )

  }

  return (question.fieldType && components[question.fieldType])
    ? components[question.fieldType]()
    : null;
}

export default DynamicFormField;