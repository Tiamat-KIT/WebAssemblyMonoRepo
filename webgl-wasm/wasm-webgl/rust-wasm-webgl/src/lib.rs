use wasm_bindgen::prelude::*;
extern crate nalgebra as na

#[wasm_bindgen]
pub fn draw() -> Result<(),JsValue> {
    let window = web_sys::window().unwrap();
    let document = window.document().unwrap();
    // 上記2行でDocumentオブジェクトを取得

    let canvas = document.get_element_by_id("canvas")
        .unwrap()
        .dyn_into::<web_sys::HtmlCanvasElement>()
        .unwrap();
    
    let webgl_context = canvas.get_context("webgl")
        .unwrap()
        .unwrap()
        .dyn_into::<web_sys::WebGlRenderingContext>()
        .unwrap();

    webgl_context.clear_color(0.0,0.0,0.0,1.0);
    webgl_context.clear(web_sys::WebGlRenderingContext::COLOR_BUFFER_BIT);

    Ok(())
}

