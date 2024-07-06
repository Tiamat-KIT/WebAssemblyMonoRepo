import './style.css'
import init,{draw} from "../rust-wasm-webgl/pkg/rust_wasm_webgl"

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <canvas id="canvas" width="640" height="480"></canvas>
  </div>
`
init().then(() => {draw()})