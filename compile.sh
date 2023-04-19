pip3 install black
black --line-length 120 .

cd client
npm i --legacy-peer-deps
npm run lint
npm run build