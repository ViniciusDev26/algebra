interface VectorParams {
  dimension: number
  elements: number[]
}

export class Vector {
  private readonly dimension: number
  private readonly elements: number[]

  constructor ({ dimension, elements }: VectorParams) {
    this.dimension = dimension
    this.elements = elements
  }

  public getCell (index: number): number {
    return this.elements[index - 1]
  }

  public setCell (index: number, value: number): void {
    this.elements[index - 1] = value
  }

  get getDimension (): number {
    return this.dimension
  }

  get getElements (): number[] {
    return this.elements
  }
}
