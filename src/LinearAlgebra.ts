import { Matrix } from './entities/Matrix'
import { Vector } from './entities/Vector'

export class LinearAlgebra {
  public transpose (objectToTranspose: Matrix | Vector): Matrix | Vector {
    if (objectToTranspose instanceof Matrix) {
      const matrixTransposed: number[][] = []

      for (let i = 0; i < objectToTranspose.getRows; i++) {
        const row = objectToTranspose.elementsData[i]

        matrixTransposed[i] = []
        for (let j = 0; j < row.length; j++) {
          matrixTransposed[i][j] = objectToTranspose.elementsData[j][i]
        }
      }

      return new Matrix({
        rows: objectToTranspose.getRows,
        columns: objectToTranspose.getColumns,
        elements: matrixTransposed
      })
    } else {
      return objectToTranspose
    }
  }

  sum (objectA: Matrix | Vector, objectB: Matrix | Vector): Matrix | Vector {
    if (objectA instanceof Matrix && objectB instanceof Matrix) {
      if (objectA.getRows !== objectB.getRows || objectA.getColumns !== objectB.getColumns) throw new Error('matrix must be equal')
      const sumMatrix: number[][] = []

      for (let i = 0; i < objectA.getRows; i++) {
        sumMatrix[i] = []
        for (let j = 0; j < objectA.getColumns; j++) {
          sumMatrix[i][j] = objectA.elementsData[i][j] + objectB.elementsData[i][j]
        }
      }

      return new Matrix({
        rows: objectA.getRows,
        columns: objectA.getColumns,
        elements: sumMatrix
      })
    } else if (objectA instanceof Vector && objectB instanceof Vector) {
      const newVector = []
      for (let i = 0; i < objectA.getElements.length; i++) {
        newVector.push(objectA.getElements[i] + objectB.getElements[i])
      }

      return new Vector({
        dimension: objectA.getDimension,
        elements: newVector
      })
    } else {
      return objectA
    }
  }

  public times (a: number | Matrix | Vector, b: Matrix | Vector): Matrix | Vector {
    if (typeof a === 'number' && b instanceof Matrix) {
      const matrixTimes: number[][] = []
      for (let i = 0; i < b.getRows; i++) {
        matrixTimes[i] = []
        for (let j = 0; j < b.getColumns; j++) {
          matrixTimes[i][j] = a * b.elementsData[i][j]
        }
      }

      return new Matrix({
        rows: b.getRows,
        columns: b.getColumns,
        elements: matrixTimes
      })
    } else if (a instanceof Matrix && b instanceof Matrix) {
      let total = 0
      const matrixTimes: number[][] = []
      for (let i = 0; i < a.getRows; i++) {
        matrixTimes[i] = []
        for (let j = 0; j < b.getColumns; j++) {
          for (let k = 0; i < b.getRows; k++) {
            total += a.elementsData[i][k] * b.elementsData[k][j]
          }
          matrixTimes[i][j] = total
          total = 0
        }
      }

      return new Matrix({
        rows: b.getRows,
        columns: b.getColumns,
        elements: matrixTimes
      })
    }

    return b
  }

  dot (a: Matrix, b: Matrix): Matrix {
    let sum = 0
    const matrixDot: number[][] = []
    for (let m = 0; m < a.getRows; m++) {
      matrixDot[m] = []
      for (let p = 0; p < b.getColumns; p++) {
        for (let i = 0; i < b.getRows; i++) {
          sum += a.elementsData[m][i] * b.elementsData[i][p]
        }
        matrixDot[m][p] = sum
        sum = 0
      }
    }

    return new Matrix({
      rows: a.getRows,
      columns: a.getColumns,
      elements: matrixDot
    })
  }

  permutarLinhas (a: Matrix): Matrix {
    let aux = []
    for (let i = 0; i < (a.getRows - 1); i++) {
      if (a.elementsData[i][i] === 0) {
        aux = a.elementsData[i]
        a.elementsData[i] = a.elementsData[i + 1]
        a.elementsData[i + 1] = aux
      }
    }
    return a
  }

  gauss (a: Matrix): Matrix {
    this.permutarLinhas(a)
    for (let i = 0; i < (a.getRows - 1); i++) {
      const pivo = a.elementsData[i][i]
      for (let j = i + 1; j < a.getRows; j++) {
        const k = -1 * a.elementsData[j][i] / pivo
        for (let l = 0; l < a.getColumns; l++) {
          a.elementsData[j][l] += k * a.elementsData[i][l]
        }
      }
    }

    return a
  }

  solver (a: Matrix): Matrix {
    this.gauss(a)
    for (let i = a.getRows - 1; i >= 0; i--) {
      const pivot = a.elementsData[i][i]
      for (let j = i; j < a.getColumns; j++) {
        a.elementsData[i][j] = a.elementsData[i][j] / pivot
      }
    }

    for (let i = a.getRows - 1; i > 0; i--) {
      const pivot = a.elementsData[i][i]
      for (let j = i - 1; j >= 0; j--) {
        const k = -a.elementsData[j][i] / pivot
        for (let l = 0; l < a.getColumns; l++) {
          a.elementsData[j][l] += k * a.elementsData[i][l]
        }
      }
    }

    return a
  }
}
