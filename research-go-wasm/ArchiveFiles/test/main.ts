import './style.css'

const go = new Go()
const wasm_url = "/wasm/output.wasm";
let wasm: WebAssembly.Instance


async function BootWasm(){
  if("instantiateStreaming" in WebAssembly) {
    const streaming_wasm = await WebAssembly.instantiateStreaming(fetch(wasm_url), go.importObject)
    go.run(streaming_wasm.instance)
    return streaming_wasm.instance.exports
  } else {
      const normal_wasm_buffer = await fetch(wasm_url).then(resp =>resp.arrayBuffer())
      const normal_wasm = await WebAssembly.instantiate(normal_wasm_buffer, go.importObject)
      go.run(normal_wasm.instance)
      return normal_wasm.instance.exports
    }
}

BootWasm().then(i => console.log(i,(i as unknown as ExtendExportValueFunctions).add(1,2)))


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>test</h1>
  </div>
`

interface ExtendExportValueFunctions extends WebAssembly.Exports {
  "add": (a: number, b: number) => number
  "multiply": (a: number, b: number) => number,
  "divide": (a: number, b: number) => number,
  "subtract": (a: number, b: number) => number,
  [x: string]: WebAssembly.ExportValue;
}