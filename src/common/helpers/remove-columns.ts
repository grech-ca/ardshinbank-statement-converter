import { Matrix } from 'common/types'

export const removeColumns = (matrix: Matrix, ...columns: number[]): Matrix => {
  const columnKeys = Object.fromEntries(columns.map(column => [column, null]))
  return matrix.map(row => row.filter((_, index) => !(index in columnKeys)))
}
