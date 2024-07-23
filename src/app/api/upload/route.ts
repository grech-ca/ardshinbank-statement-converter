import { csvToMatrix, fixDate, matrixToCsv, removeColumns, removeRows } from 'common/helpers';
import fs from 'fs'
import { NextRequest, NextResponse } from 'next/server';
import Papa from 'papaparse'

export const POST = async (request: NextRequest) => {
  const data = await request.formData()
  const file = data.get('file') as File

  const csv = await file.text()

  let {data: matrix} = Papa.parse<(string | undefined)[]>(csv, {
    beforeFirstChunk: (chunk) => {
      return chunk.replace(/"(\d{1,3})(,\d{3})*\.\d{2}"/gm, value => value.replace(/"|,/g, ''))
    }
  })

  matrix = removeRows(matrix, 0, 1, 2, 3, 4, 5, 6)
  matrix = removeColumns(matrix, 0, 1, 2, 5, 7, 8, 9, 11, 12, 13)

  // NOTE: Remove summary rows
  matrix = matrix.filter(row => row[3])

  // NOTE: Fix dates
  matrix = matrix.slice(0, 1).concat(matrix.slice(1).map(row => row.map((cell, index) => {
    switch (index) {
      case 0:
        return cell && fixDate(cell)
      case 3:
        return cell?.replace(/[^\\]*\\/, '')
      default:
        return cell
    }
  })))

  const result = matrixToCsv(matrix)
  const buffer = Buffer.from(result, 'utf8')

  return new Response(buffer, {
    headers: {
      'Content-Type': 'text/csv'
    }
  })
}
