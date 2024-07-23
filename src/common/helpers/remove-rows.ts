import { Matrix } from 'common/types'

export const removeRows = (matrix: Matrix, ...rows: number[]): Matrix => {
  const rowKeys = Object.fromEntries(rows.map(row => [row, null]))
  return matrix.filter((_, index) => !(index in rowKeys))
}
