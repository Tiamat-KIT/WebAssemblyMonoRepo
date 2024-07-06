use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn draw() -> Result<(),JsValue> {
    let window = web_sys::window().unwrap();
    // web_sys::window()はOption<Window>を返すのでunwrap()で取り出す
    let document = window.document().unwrap();
    //　window.document()はOption<Document>を返すのでunwrap()で取り出す


    let canvas_el_unwrap = document.get_element_by_id("canvas").unwrap();
    // document.get_element_by_id()はOption<Element>を返すのでunwrap()で取り出す
    let canvas: web_sys::HtmlCanvasElement = canvas_el_unwrap.dyn_into::<web_sys::HtmlCanvasElement>().unwrap();
    // dyn_into()で型変換を行う

    let context_unwrap = canvas.get_context("2d").unwrap().unwrap();
    // canvas.get_context()はOption<Result<CanvasRenderingContext2d, JsValue>>を返すのでunwrap()で取り出す
    let context: web_sys::CanvasRenderingContext2d = context_unwrap.dyn_into::<web_sys::CanvasRenderingContext2d>().unwrap();

    context.move_to(300.0, 0.0);
    context.begin_path();
    context.line_to(0.0, 600.0);
    context.line_to(600.0, 600.0);
    context.line_to(300.0, 0.0);
    context.close_path();   
    context.stroke();
    context.fill();
    Ok(())
}   