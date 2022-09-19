import { Matrix } from './entities/Matrix'
import { Vector } from './entities/Vector'
import { LinearAlgebra } from './LinearAlgebra'

// matrix
const matrix = new Matrix({
  rows: 3,
  columns: 3,
  elements: [[1, 2, 3], [3, 2, 1], [1, 2, 3]]
})

// vector
const vector = new Vector({
  dimension: 3,
  elements: [1, 2, 3]
})

const algebra = new LinearAlgebra()

// sum
const sum = algebra.sum(matrix, matrix)
console.log('sum', sum)

// dot
const dot = algebra.dot(matrix, matrix)
console.log('dot', dot)

// transpose
const transpose = algebra.transpose(matrix)
console.log('transpose', transpose)

// times
const times = algebra.times(4, matrix)
console.log('times', times)

// gauss
const gauss = algebra.gauss(matrix)
console.log('gauss', gauss)

// solver
const matrixSolve = new Matrix({
  rows: 3,
  columns: 3,
  elements: [[1, 3, 5, 3], [3, 1, 3, 2], [2, 0, 5, 4]]
})
const solver = algebra.solver(matrixSolve)
console.log('solver', solver)
