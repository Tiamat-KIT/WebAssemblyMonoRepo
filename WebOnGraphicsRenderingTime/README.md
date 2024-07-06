# WebOnGraphicsRenderingTime
Web上でグラフィックを生成する時間でどれが一番早いか計測するで！



### WebGL2でまず三角形をクルクルする
本とか[サンプルサイト](https://webglsamples.org/WebGL2Samples/#fbo_rtt_texture_array)を参考にして三角形をクルクルする
- 基礎
https://webgl2fundamentals.org/webgl/lessons/ja/webgl-fundamentals.html

- 三角形の表示
https://any-programming.hatenablog.com/entry/2017/12/14/012232

- わかりやすそうな解説
https://sbfl.net/blog/2017/06/23/webgl2-2d-graphics/

- とんでも量の制御
https://techblog.kayac.com/webgl-gpu-instancing-transform-feedback

- 奥行き表現
https://qiita.com/aa_debdeb/items/128ccb6fa245b6f618b3

- アンチエイリアス
https://ics.media/web3d-maniacs/webgl2_renderbufferstoragemultisample/

- 回転の参考になりそうなリンク
https://webgl2fundamentals.org/webgl/lessons/webgl-2d-rotation.html

- 一個上の旧バージョン
https://webglfundamentals.org/webgl/lessons/ja/webgl-2d-rotation.html

### WebGPUで三角形をクルクルする
[サンプルサイト](https://webgpu.github.io/webgpu-samples/?sample=helloTriangle)とか色々みてクルクルさせる
- 型定義
https://www.npmjs.com/package/@webgpu/types

- 三角形の表示
https://zenn.dev/emadurandal/books/cb6818fd3a1b2e/viewer/hello_triangle

- Rustで書いてみてる人
https://qiita.com/ciscorn/items/c8c18fbcb60475cb4491

### WebAssemblyでWebGLを使って三角形をクルクルする
最初に書いたやつを移植する

### WebAssemblyでWebGPUを使って三角形をクルクルする
そもそもクレートが対応してるんかな、調べる

### なんかようわからんの見つけた
https://bevyengine.org/examples/
