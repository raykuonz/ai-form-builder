"use client";

import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface SelectOptionProps {
  label?: string | null;
  value: number;
}

interface FormPickerProps {
  options: SelectOptionProps[];
}

const FormPicker = ({
  options,
}: FormPickerProps) => {

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const formId = searchParams.get('formId') || options[0].value.toString();

  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  }, [searchParams]);

  return (
    <div
      className='flex gap-2 items-center'
    >
      <Label
        className='font-bold'
      >
        Select a form
      </Label>
      <Select
        value={formId}
        onValueChange={(value) => {
          const queryString = createQueryString(
            'formId',
            value.toString()
          );
          router.push(pathname + '?' + queryString);
        }}
      >
        <SelectTrigger
          className='w-[180px]'
        >
          <SelectValue
            placeholder={options[0].label}
          />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value.toString()}
              className='cursor-pointer'
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default FormPicker