echo "\e[32mFormatting Python...\e[0m"

pip3 install black > /dev/null
black --line-length 120 /root/rosbag-utils

echo "\e[32mFormatting JavaScript...\e[0m"

echo "Node, NPM version: \e[33m"
node -v
npm -v
echo "\e[0m"

cd /root/rosbag-utils/client
npm i --legacy-peer-deps > /dev/null
npm run lint

echo "\e[32mBuilding client...\e[0m"
npm run build