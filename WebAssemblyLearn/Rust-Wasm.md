# RustでWasmやるときに入れるもの
- wasm-pack

```bash
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
```

- wasm-bindgen
```toml
[lib]
crate-type=["cdylib"]

[dependencies]
wasm-bindgen="0.2"
```