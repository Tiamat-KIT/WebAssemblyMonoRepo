package routine

import (
	"sync"
	um "utakata_matrix/matrix"
)

// ルーチンとして扱う複数の処理を生成
func CreateRoutineFunctions[T int | float64](routine_num int,do_func func([] T,[] T) []T) (functions []func([]T,[]T) []T){
	for i := 0; i < routine_num; i++ {
		functions = append(functions,do_func)
	}
	return functions
}

func GoRoutine[T int|float64](funcList []func([]T,[]T) []T,p um.MatrixProp[T]) um.Matrix[T] {
	println("started.")


	// 実行待機している関数のグループ
	var waitGroup sync.WaitGroup

	for idx,function := range funcList{
		waitGroup.Add(1)
		go func(f func([]T,[]T) []T){
			defer waitGroup.Done()
			result = append(result,f(p.A.M[idx],p.B.M[idx]))
		}(function)
	}

	waitGroup.Wait()
	println("all finished")
	return nil
}