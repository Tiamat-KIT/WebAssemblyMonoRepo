import { Event, useEffect,useLayoutEffect,useRef,useState } from "hono/jsx"
import type { Remote } from "comlink"
import GoWasmRef from "../Ref/WasmRef"
import workerRef from "../Ref/WorkerRef"


export default function Calcer(){
    const [TypingText,setTypingText] = useState<string>("")

    async function WasmAsyncWorker(event: Event){
        event.preventDefault()
        console.log("Press Enter")
        const worker = await workerRef.current
        if(worker !== null && GoWasmRef.current !== null){
            const result = await worker.send(TypingText,GoWasmRef.current)
            setTypingText(result.toString())
        }else {
            console.error("Not Boot Worker")
        }
    }

    const ClickNumbersList = Array.from(Array(9).keys()).map(num => String(num + 1))
    ClickNumbersList.push(...["0","00","."])

    const KeyboardEvents = (e: KeyboardEvent) => {
        e.preventDefault()
        const PushKeySetIdElement = document.getElementById(e.key)
        if(PushKeySetIdElement){
            PushKeySetIdElement.classList.replace("bg-white","bg-slate-400")
            setTimeout(() => {
                PushKeySetIdElement.classList.replace("bg-slate-400","bg-white")
            }, 300);
        }

        const OperatorKey: string[] = ["+","-","×","÷"]
        if(ClickNumbersList.includes(e.key) || OperatorKey.includes(e.key)){
            
           if(OperatorKey.includes(e.key)){
                const LastString = TypingText.slice(-1)
                if(!OperatorKey.includes(LastString)){
                    setTypingText((val) => val + e.key)
                }
           }else {
                setTypingText((val) => val + e.key)
           }
        } else if(e.key === "Enter"){
            document.getElementById("submit")!.click()
        } else if(e.key === "Backspace"){
            setTypingText((val) => val.slice(0,-1))
        }
    } 
    
    useEffect(() => {
        if(GoWasmRef.current === null){
            const go = new Go();
            const wasm_url = "/wasm/output.wasm";

            (async() => {
                if("instantiateStreaming" in WebAssembly){
                    const streaming = await WebAssembly.instantiateStreaming(fetch(wasm_url),go.importObject)
                    go.run(streaming.instance)
                    GoWasmRef.current = streaming.instance
                } else {
                    const normal = await fetch(wasm_url).then((resp => resp.arrayBuffer()))
                    const normal_wasm = await WebAssembly.instantiate(normal,go.importObject)
                    go.run(normal_wasm)
                    GoWasmRef.current = normal_wasm
                }
            })()
        }
        if(workerRef.current === null){
            workerRef.current = new ComlinkWorker<typeof import("../worker/send")>(
                new URL("../worker/send",import.meta.url)
            )
        }
    },[])

    useLayoutEffect(() => {
        const bodyEl = document.body
        bodyEl.addEventListener("keydown", KeyboardEvents)
    },[])

    return (
    <form id="form" class='bg-slate-200 border rounded-xl p-3 object-contain w-96'>
        <h3 class="h-10 w-full text-2xl text-left bg-white">{TypingText}</h3>
        <div class="flex flex-row gap-2">
            <div class="flex flex-col">
                <div class='grid grid-cols-3 gap-2 bg-slate-300 p-3 rounded-xl'>
                    {ClickNumbersList.map(data => {
                        return <button id={data} class="bg-white h-10 w-10 rounded-xl" onClick={() => setTypingText(TypingText + `${data}`)}>{data}</button>
                    })}
                </div>
            </div>
            <div class="flex flex-row gap-2 p-3">
                <div class="gap-2 grid grid-cols-2">
                    {
                        ["+","-","×","÷"].map(data => {
                            return <button id={data} class="bg-white rounded-lg p-2 text-center" onClick={() => setTypingText((s) => s + data)}>{data}</button>
                        })
                    }
                    {/* <button class="bg-white col-span-2 rounded-lg p-2 text-center" onClick={() => setTypingText((s) => s + "=")}>=</button> */}
                </div>
                <div class="gap-2 flex flex-col">
                    <button id="Backspace" class="bg-white rounded-lg p-2 text-center" onClick={() => setTypingText(TypingText.slice(0,-1))}>Back</button>
                    <button class="bg-white rounded-lg p-2 text-center" onClick={() => setTypingText("")}>Clear</button>
                </div>
            </div>
        </div>
        <input type="submit" value="送信" hidden id="submit" onClick={WasmAsyncWorker}></input>
    </form>
    )
}