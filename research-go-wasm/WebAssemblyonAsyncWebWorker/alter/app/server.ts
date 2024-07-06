import { showRoutes } from 'hono/dev'
import { createApp } from 'honox/server'

type Operation = "+" | "-" | "×" | "÷"
type Operand = number

type BinaryExpression = `${Operand}${Operation}${Operand}`
type ConcatenatedExpression = `${BinaryExpression}${Operation}${Operand}`
type RecursiveExpression = ConcatenatedExpression | BinaryExpression;

type CalcHistory = {
    text: RecursiveExpression,
    result: number
}

const results: CalcHistory[] = [{
    text: "1+1",
    result: 2
},{
    text: "1×2",
    result: 2
},{
    text: "2÷2",
    result: 1
},{
    text: "1+2+3",
    result: 6
},{
    text: "1+2-3",
    result: 0
}]

const app = createApp()
app.post("/calc",async(c) => {
    const body = await c.req.json()
})

app.get("/history",(c) => {
    c.header('Content-Type', 'application/json')
    return c.json(results)
})

showRoutes(app)

export default app
