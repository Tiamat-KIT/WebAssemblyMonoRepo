# install wasm-pack
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
# install cargo-generate 
cargo install cargo-generate
# setup rust project
cargo generate --git https://github.com/rustwasm/wasm-pack-template
