package main

import "fmt"

func main() {
  fmt.Println("Hello, World!")
}

//export reverse_text
func reverse_text(input []byte) []byte {
	for i, j := 0, len(input)-1; i < j; i, j = i+1, j-1 {
		input[i], input[j] = input[j], input[i]
	}
	return input
}


