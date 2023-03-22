pip3 install black
black .

cd client
npm i --legacy-peer-deps
npm run lint
npm run build