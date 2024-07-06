package matrix


type Matrix[T int|float64] struct {
	M [][]T
	RowLength int
	ColLength int
}

type MatrixProp[T int | float64] struct {
	A Matrix[T]
	B Matrix[T]
}

type MatrixInterface[T int|float64] interface {
	Get(i int, j int) T
	New(arr [][]T) *Matrix[T]
}

func (m *Matrix[T]) Get(i int, j int) T {
	return m.M[i][j]
}

func (m *Matrix[T]) New(arr [][]T) *Matrix[T] {
	m.M = arr
	m.RowLength = len(m.M)
	m.ColLength = len(m.M[0])
	return m
}

func OneRowAdd[T int | float64](M_Row []T,N_Row []T) []T {
	var result []T
	for i := 0; i < len(M_Row); i++ {
		result = append(result, (M_Row)[i] + (N_Row)[i])
	}
	return result
}
