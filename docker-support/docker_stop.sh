{
    docker kill rosbag-util || true
    docker rm rosbag-util
} &> /dev/null

echo -e "\e[32mDocker stopped.\e[0m"
