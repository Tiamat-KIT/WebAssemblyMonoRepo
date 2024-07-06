package main

import (
    "strconv"
    "strings"
)

// 演算子の優先順位を定義するマップ
var operatorPrecedence = map[string]int{
    "+": 1,
    "-": 1,
    "*": 2,
    "÷": 2,
}

// 数値と演算子をスライスに格納する関数
func tokenize(expression string) []string {
    tokens := []string{}
    currentNumber := ""
    for _, char := range expression {
        if isDigit(char) {
            currentNumber += string(char)
        } else if isOperator(char) {
            if currentNumber != "" {
                tokens = append(tokens, currentNumber)
            }
            tokens = append(tokens, string(char))
            currentNumber = ""
        } else if char == '(' || char == ')' {
            tokens = append(tokens, string(char))
        }
    }
    if currentNumber != "" {
        tokens = append(tokens, currentNumber)
    }
    return tokens
}

// 文字が数字かどうか判定する関数
func isDigit(char rune) bool {
    return char >= '0' && char <= '9'
}

// 文字が演算子かどうか判定する関数
func isOperator(char rune) bool {
    return strings.ContainsRune("+-*÷", char)
}

// 逆ポーランド記法に変換する関数
func toRPN(tokens []string) []string {
    rpnStack := []string{}
    rpnQueue := []string{}
    for _, token := range tokens {
        if isDigit(rune(token[0])) {
            rpnQueue = append(rpnQueue, token)
        } else if token == "(" {
            rpnStack = append(rpnStack, token)
        } else if token == ")" {
            for rpnStack[len(rpnStack)-1] != "(" {
                rpnQueue = append(rpnQueue, rpnStack[len(rpnStack)-1])
                rpnStack = rpnStack[:len(rpnStack)-1]
            }
            rpnStack = rpnStack[:len(rpnStack)-1]
        } else {
            for len(rpnStack) > 0 && operatorPrecedence[rpnStack[len(rpnStack)-1]] >= operatorPrecedence[token] {
                rpnQueue = append(rpnQueue, rpnStack[len(rpnStack)-1])
                rpnStack = rpnStack[:len(rpnStack)-1]
            }
            rpnStack = append(rpnStack, token)
        }
    }
    for len(rpnStack) > 0 {
        rpnQueue = append(rpnQueue, rpnStack[len(rpnStack)-1])
        rpnStack = rpnStack[:len(rpnStack)-1]
    }
    return rpnQueue
}

// 逆ポーランド記法を評価する関数
func evaluateRPN(tokens []string) int {
    evaluationStack := []int{}
    for _, token := range tokens {
        if isDigit(rune(token[0])) {
            num, _ := strconv.Atoi(token)
            evaluationStack = append(evaluationStack, num)
        } else {
            num2 := evaluationStack[len(evaluationStack)-1]
            evaluationStack = evaluationStack[:len(evaluationStack)-1]
            num1 := evaluationStack[len(evaluationStack)-1]
            evaluationStack = evaluationStack[:len(evaluationStack)-1]
            var result int
            switch token {
            case "+":
                result = num1 + num2
            case "-":
                result = num1 - num2
            case "*":
                result = num1 * num2
            case "÷":
                result = num1 / num2
            }
            evaluationStack = append(evaluationStack, result)
        }
    }
    return evaluationStack[0]
}

//export calc
func calc(expression string) int {
    tokens := tokenize(expression)
    rpnTokens := toRPN(tokens)
    result := evaluateRPN(rpnTokens)
    return result
}

func main() {
    
}
