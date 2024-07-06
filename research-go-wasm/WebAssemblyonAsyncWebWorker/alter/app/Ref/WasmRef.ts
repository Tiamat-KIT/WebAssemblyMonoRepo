import { useRef } from "hono/jsx"

const GoWasmRef  = useRef<WebAssembly.Instance | null>(null)
export default GoWasmRef