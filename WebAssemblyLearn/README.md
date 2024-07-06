# WebAssemblyLearn
WebAssemblyを学ぶ

## WebAssemblyってなんだ？
- スタックベース仮想計算機のバイナリ命令フォーマット
- プログラミング言語のポータブルなコンパイルターゲットとして設計されている
- クライアントおよびサーバアプリケーションのWeb上のデプロイを可能にする。

### 要するに
他の言語をコンパイルするターゲットとなるバイナリフォーマット
Wasmはバイトコードになっているので、
- ダウンロードサイズは小さく
- 実行時のパースやコンパイルのステップがなくなる
だから性能の向上が図れる。

### Rust → Wasm
- wask-pack:Rustから生成されたWasmのコードをビルドするツール。
- wasm-bindgen:WasmでDOMにアクセスできるようにするもの
- web-sys:wasm-bindgenで生成したWeb上で使用する多数のバインディングで構成されているもの。
これを使って、CanvasやrequestAnimationFrameなどのブラウザAPIを呼び出す。

```bash
npm init rust-webpack
```

```toml
# You must change these to your own details.
[package]
name = "rust-webpack-template"
description = "My super awesome Rust, WebAssembly, and Webpack project!"
version = "0.1.0"
authors = ["You <you@example.com>"]
categories = ["wasm"]
readme = "README.md"
edition = "2021" # 2018→2021

[lib]
crate-type = ["cdylib"]

[profile.release]
# This makes the compiled code faster and smaller, but it makes compiling slower,
# so it's only enabled in release mode.
lto = true

[features]
# If you uncomment this line, it will enable `wee_alloc`:
#default = ["wee_alloc"]

# 依存関係の更新
[dependencies]
# The `wasm-bindgen` crate provides the bare minimum functionality needed
# to interact with JavaScript.

# 0.2.45 to 0.2.78
wasm-bindgen = "0.2.78"
console_error_panic_hook="0.1.5"

# `wee_alloc` is a tiny allocator for wasm that is only ~1K in code size
# compared to the default allocator's ~10K. However, it is slower than the default
# allocator, so it's not enabled by default.
wee_alloc = { version = "0.4.2", optional = true }

# The `web-sys` crate allows you to interact with the various browser APIs,
# like the DOM.
[dependencies.web-sys]
version = "0.3.55" # 0.3.22→0.3.55
features = ["console","Window","Document","HtmlCanvasElement","CanvasRenderingContext2d","Element"]

# The `console_error_panic_hook` crate provides better debugging of panics by
# logging them with `console.error`. This is great for development, but requires
# all the `std::fmt` and `std::panicking` infrastructure, so it's only enabled
# in debug mode.
# [target."cfg(debug_assertions)".dependencies]
# console_error_panic_hook = "0.1.5"

# These crates are used for running unit tests.
[dev-dependencies]
wasm-bindgen-test = "0.3.28" #0.2.45→0.3.28 
futures = "0.3.18" #0.1.27→0.3.18
js-sys = "0.3.55" # 0.3.22→0.3.55
wasm-bindgen-futures = "0.4.28" # 0.3.22→0.4.28
```