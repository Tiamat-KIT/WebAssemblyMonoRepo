"use client"

import Script from "next/script";
import { useEffect, useRef } from "react";

export default function Home() {
  const wasmRef = useRef<WebAssembly.Instance | null>(null)
  useEffect(() => {
    const go = new Go()
    const wasmUrl = "output.wasm" 
    async function WasmInstanceGetter() {
      if("instantiateStreaming" in WebAssembly){
        const streaming = await WebAssembly.instantiateStreaming(fetch(wasmUrl),go.importObject)
        go.run(streaming.instance)
        return streaming.instance
      }else {
        const bytes = await fetch(wasmUrl).then(r => r.arrayBuffer())
        const instance = await WebAssembly.instantiate(bytes, go.importObject)
        go.run(instance.instance)
        return instance.instance
      }
    }
    WasmInstanceGetter().then(
      (instance) => {
        wasmRef.current = instance
      }
    )
  },[])
  return (
    <main>
      {/**
       * https://zenn.dev/ru/scraps/640234393bb24f
       */}
      <Script strategy="beforeInteractive" src="wasm_exec.js" />
      <output>{wasmRef.current !== null ? wasmRef.current.exports.reverse_text("Hello, World!") : "Loading..."}</output>

    </main>
  );
}
