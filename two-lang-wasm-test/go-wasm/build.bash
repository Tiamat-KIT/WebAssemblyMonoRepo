cp "$(tinygo env TINYGOROOT)/targets/wasm_exec.js" ./wasm_exec.js
tinygo build -o output.wasm -target wasm ./main.go