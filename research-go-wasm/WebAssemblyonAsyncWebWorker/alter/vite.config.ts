import pages from '@hono/vite-cloudflare-pages'
import adapter from '@hono/vite-dev-server/cloudflare'
import honox from 'honox/vite'
import client from 'honox/vite/client'
import { defineConfig } from 'vite'
import { comlink } from 'vite-plugin-comlink'
import wasm from "vite-plugin-wasm";

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      build: {
        rollupOptions: {
          input: ['/app/style.css'],
          output: {
            assetFileNames: 'static/assets/[name].[ext]'
          }
        }
      },
      plugins: [client(),wasm(),comlink()],
      worker: {
        plugins: () => [comlink(),wasm()]
      }
    }
  } else {
    return {
      plugins: [
        honox({
          devServer: {
            adapter
          }
        }),
        pages(),
        wasm(),
        comlink()
      ],
      worker:{
        plugins: () => [wasm(),comlink()]
      },
      build: {
        assetsDir: "static",
        ssrEmitAssets: true
      }
    }
  }
})
