pip3 install black > /dev/null
black --line-length 120 .

cd client
npm i --legacy-peer-deps > /dev/null
npm run lint
npm run build