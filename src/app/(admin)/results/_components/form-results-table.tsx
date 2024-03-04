"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  AnswerSelectModal,
  FieldOptionSelectModel,
  FormSubmissionSelectModal,
  QuestionSelectModel
} from '@/types/form-types';

type Answer = AnswerSelectModal & {
  fieldOption: FieldOptionSelectModel | null
}

type FormSubmission = FormSubmissionSelectModal & {
  answers: Answer[]
};

interface FormResultsTableProps {
  data: FormSubmission[];
  columns: Array<QuestionSelectModel & {
    fieldOptions: FieldOptionSelectModel[];
  }>;
}

const columnHelper = createColumnHelper<FormSubmission>();

const FormResultsTable = ({
  data,
  columns: questions,
}: FormResultsTableProps) => {

  const columns = [
    columnHelper.accessor('id', {
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('formId', {
      cell: info => info.getValue(),
    }),
    ...questions.map((question) => {
      return columnHelper.accessor((row) => {
        let answer = row.answers
          .find((answer) => answer.questionId === question.id);

        if (!answer) return '';

        return answer.fieldOption ? answer.fieldOption.label : answer.value;
      }, {
        header: () => question.label,
        id: question.id.toString(),
        cell: info => info.renderValue(),
      });
    })
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="p-2 mt-4">
      <div
        className='shadow overflow-hidden border border-gray-200 sm:rounded-lg'
      >
        <table>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr
                key={headerGroup.id}
                className='border-b'
              >
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className='text-left p-3'
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            className='divide-y divide-gray-200'
          >
            {table.getRowModel().rows.map(row => (
              <tr
                key={row.id}
                className='py-2'
              >
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className='p-3'
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FormResultsTable;