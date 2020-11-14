import React, { useMemo, useState } from 'react'
import Axios from 'axios'
import { matchSorter } from 'match-sorter'
import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { useQuery } from 'react-query'
import { range } from 'lodash-es'
import Scrollbars from 'react-custom-scrollbars'

export default function SchemaTab({ resourceId }: { resourceId: number }) {
  async function fetchSchema(id: number) {
    const { data } = await Axios.post(
      `http://localhost:3001/resources/schema/${id}`,
    )
    return data.data
  }

  const { isLoading, data: schema } = useQuery(['schema', resourceId], () =>
    fetchSchema(resourceId),
  )

  const [input, setInput] = useState('')

  const filteredSchema = useMemo(() => {
    if (schema) {
      return matchSorter(schema, input, {
        keys: [(table: any) => table.columns.map((i: any) => i.column_name)],
      })
    }
  }, [input, schema])

  return (
    <div className="flex flex-col h-full">
      <div className="mx-3 mb-4">
        <Input
          placeholder="Search Tables and Columns"
          prefix={<SearchOutlined />}
          value={input}
          onChange={({ target: { value } }) => {
            setInput(value)
          }}
        />
      </div>
      <Scrollbars className="h-full">
        <div className="px-3 space-y-4">
          {isLoading
            ? range(10).map((val) => (
                <div
                  key={val}
                  className="w-full h-4 bg-gray-200 rounded animate-pulse"
                  style={{ opacity: 1 - val / 10 }}
                />
              ))
            : filteredSchema?.map((table: any) => (
                <div key={table.table}>
                  <div className="mb-1 font-mono text-xs font-bold text-blue-500 truncate">
                    {table.table}
                  </div>
                  <ul>
                    {table.columns.map((column: any) => (
                      <li
                        key={column.column_name}
                        className="grid grid-cols-3 font-mono text-xs space-y-0.5"
                      >
                        <span className="col-span-2 text-gray-800 truncate">
                          {column.column_name}
                        </span>
                        <span className="col-span-1 truncate">
                          {column.data_type}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
        </div>
      </Scrollbars>
    </div>
  )
}
