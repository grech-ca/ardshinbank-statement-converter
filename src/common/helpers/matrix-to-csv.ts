import { Matrix } from 'common/types'

export const matrixToCsv = (matrix: Matrix): string => {
  return matrix.map(row => row.join(',')).join('\n')
}
