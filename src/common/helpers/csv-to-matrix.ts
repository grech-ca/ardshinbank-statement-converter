import { Matrix } from 'common/types'

export const csvToMatrix = (csv: string): Matrix => {
  return csv.split('\n').map(row => row.split(','))
}
