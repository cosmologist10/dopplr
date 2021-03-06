import Axios from 'axios'
import { QueryResult } from 'types/query'
import { SchemaResult } from 'types/schema'

const client = Axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL })

export async function runQuery({
  resource,
  query,
}: {
  resource: number
  query: string
}) {
  const { data } = await client.post<{ success: boolean; data: QueryResult }>(
    '/queries/run',
    {
      resource,
      query,
    },
  )
  return data.data
}

export async function fetchSchema(id: number) {
  const { data } = await client.get<{
    success: boolean
    data: SchemaResult[]
  }>(`/resources/schema/${id}`)
  return data.data
}

export async function fetchHistory() {
  const { data } = await client.get('/queries/history')
  return data.data.items
}

export async function fetchSampleData(resourceId: number, tableName: string) {
  const { data } = await client.get<{ success: boolean; data: QueryResult }>(
    `/resources/sample-data?resource=${resourceId}&tableName=${tableName}`,
  )
  return data.data
}

export async function deleteQuery(id: number) {
  const { data } = await client.delete(`/queries/${id}`)
  return data.data
}

export async function clearHistoryQuery() {
  const { data } = await client.delete<{
    success: boolean
    data: boolean
    message: string
  }>('/queries/history')
  return data
}

export async function fetchSavedQueries() {
  const { data } = await client.get('/queries/saved')
  return data.data.items
}

export async function saveQuery({
  resourceId,
  query,
  name,
}: {
  resourceId: number
  query: string
  name: string
}) {
  const { data } = await client.post('/queries/save', {
    resource: resourceId,
    query,
    name,
  })
  return data.data
}
