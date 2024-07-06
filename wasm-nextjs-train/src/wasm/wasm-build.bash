DATE=`date '+%Y-%m-%d'`
FOLDER=dist-$DATE
mkdir $FOLDER
cp "$(tinygo env TINYGOROOT)/targets/wasm_exec.js" ./$FOLDER/wasm_exec.js
tinygo build -o ./$FOLDER/output.wasm -target wasm ./main.go