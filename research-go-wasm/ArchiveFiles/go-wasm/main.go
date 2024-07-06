package main


func main(){}

//export add
func add(a int,b int) int{
	return a+b
}

//export multiply
func multiply(a int,b int) int{
	return a*b 
}

//export divide
func divide(a int,b int) int{
	return a/b
}

//export subtract
func subtract(a int,b int) int{
	return a-b
}

//export square
func square(a int) int{
	return a*a
}
