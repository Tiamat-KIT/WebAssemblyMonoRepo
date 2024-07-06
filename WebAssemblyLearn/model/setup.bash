curl -sSf https://rye-up.com/get | bash
source "$HOME/.rye/env"
# rye init
cd model 
rye pin 3.11
sudo apt-get install -y libgl1-mesa-dev
rye add ultralytics
rye add onnx
rye sync
