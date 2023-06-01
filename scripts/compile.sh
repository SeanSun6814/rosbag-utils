echo -e "\e[32mFormatting Python...\e[0m"

pip3 install black > /dev/null
black --line-length 120 .

echo -e "\e[32mFormatting JavaScript...\e[0m"
cd client
npm i --legacy-peer-deps > /dev/null
npm run lint

echo -e "\e[32mBuilding client...\e[0m"
npm run build