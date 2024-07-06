interface ExtendExportValueFunctions extends WebAssembly.Exports {
    "calc": (str: string) => number
    [x: string]: WebAssembly.ExportValue;
  }
export function send(text: string,wasm: WebAssembly.Instance){
    console.log("Worker Start")
    let result = 0
    console.log("WebAssembly Read Complete")
    result = (wasm.exports as ExtendExportValueFunctions).calc(text)
    console.log("Calc Complete")
    return result 
}