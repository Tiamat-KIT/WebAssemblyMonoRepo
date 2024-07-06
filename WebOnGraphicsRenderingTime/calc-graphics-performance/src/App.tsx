import { CSSProperties } from 'react'
import './App.css'
import /* drawRedTriangle, */{drawRotatingWhiteTriangle} from './graphics/webgl'
import WebGPUDraw from './graphics/webgpu'

function App() {

  type CardProps = {
    name: string,
    WorkFunc: () => void,
    id: string
  }

  const WorkWebGL = () => {
    // ここに通常のWebGLを扱う処理を書く。
    // drawRedTriangle('WebGL')
    drawRotatingWhiteTriangle('WebGL')
  }

  const WasmWorkWebGL = () => {
    // ここで、WASMを呼び出す。
    // WASMでWebGLを扱う処理を書く。
  }

  const WorkWebGPU = () => {
    // ここに通常のWebGPUを扱う処理を書く。
    WebGPUDraw('WebGPU')
  }

  const WasmWorkWebGPU = () => {
    // ここで、WASMを呼び出す。
    // WASMでWebGPUを扱う処理を書く。
  }

  const Cards: Array<CardProps> = [
    {
      name: "通常のWebGLを扱う",
      WorkFunc: WorkWebGL,
      id: 'WebGL'
    },
    {
      name: "WebAssemblyでWebGLを扱う",
      WorkFunc: WasmWorkWebGL,
      id: 'WasmWebGL'
    },
    {
      name: "WebGPUを扱う",
      WorkFunc: WorkWebGPU ,
      id: 'WebGPU'
    },
    {
      name: "WebAssemblyでWebGPUを扱う",
      WorkFunc: WasmWorkWebGPU,
      id: 'WasmWebGPU'
    }
  ]

  const CardStyle:CSSProperties = {
    border: "1px solid black",
    borderRadius: '30px',
    padding: '8px'
  }

  return (
    <>
      <h2>Web Graphics Performance Time</h2>
      <div style={{
        display: "grid",
        gap: "23px",
        gridTemplateColumns: "1fr 1fr"
      }}>
        {Cards.map(data => {
        return (
          <article style={CardStyle} key={data.id}>
            <h4>
              {data.name}
            </h4>
            <div style={{display: "flex",flexDirection: "column-reverse",padding:'6px'}}>
              <button onClick={data.WorkFunc}>{data.id}</button>
              <canvas style={{
                border: "1px solid black",
                borderRadius: "8px",
                padding: "3px"
              }} id={data.id} width={300} height={300}></canvas>
            </div>
        </article>
        )
      })}
      </div>
    </>
  )
}

export default App
