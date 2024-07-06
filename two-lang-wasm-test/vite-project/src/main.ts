import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import wasmUrl from "/output.wasm?url"

const WasmBoot = async () => {
  const go = new Go()
  const FetchWasm = await fetch(wasmUrl)
  const memory = new WebAssembly.Memory({
    initial: 10,
    maximum: 100,
    // shared: true
  })

  const NewImportObject = {
    ...go.importObject,
  }
  // let i32Array = new Uint32Array(memory.buffer)
  const {instance,module} = await WebAssembly.instantiateStreaming(FetchWasm,go.importObject)
  go.run(instance)
  
  /**
   * Part one: Write in Wasm, Read in JS
   */
  console.log("Write in Wasm, Read in JS, Index 0:");

  // First, let's have wasm write to our buffer
  instance.exports.storeValueInWasmMemoryBufferIndexZero(24);

  // Next, let's create a Uint8Array of our wasm memory
  let wasmMemory = new Uint8Array(instance.exports.memory.buffer);

  // Then, let's get the pointer to our buffer that is within wasmMemory
  let bufferPointer = instance.exports.getWasmMemoryBufferPointer();

  // Then, let's read the written value at index zero of the buffer,
  // by accessing the index of wasmMemory[bufferPointer + bufferIndex]
  console.log(wasmMemory[bufferPointer + 0]); // Should log "24"

  /**
   * Part two: Write in JS, Read in Wasm
   */
  console.log("Write in JS, Read in Wasm, Index 1:");

  // First, let's write to index one of our buffer
  wasmMemory[bufferPointer + 1] = 15;

  // Then, let's have wasm read index one of the buffer,
  // and return the result
  console.log(
    instance.exports.readWasmMemoryBufferAndReturnIndexOne()
  ); // Should log "15"

  /**
   * NOTE: if we were to continue reading and writing memory,
   * depending on how the memory is grown by rust, you may have
   * to re-create the Uint8Array since memory layout could change.
   * For example, `let wasmMemory = new Uint8Array(rustWasm.memory.buffer);`
   * In this example, we did not, but be aware this may happen :)
   */

}

WasmBoot().then(() => {
  console.log('dev...')
})

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`
