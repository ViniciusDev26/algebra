interface MatrixParams {
  rows: number
  columns: number
  elements: number[][]
}

export class Matrix {
  private readonly rows: number
  private readonly columns: number
  private readonly elements: number[][]

  constructor ({ rows, columns, elements }: MatrixParams) {
    this.rows = rows
    this.columns = columns
    this.elements = elements
  }

  public getCell (row: number, column: number): number {
    return this.elements[row - 1][column - 1]
  }

  public setCell (row: number, column: number, value: number): void {
    this.elements[row - 1][column - 1] = value
  }

  get elementsData (): number[][] {
    return this.elements
  }

  get getRows (): number {
    return this.rows
  }

  get getColumns (): number {
    return this.columns
  }
}
