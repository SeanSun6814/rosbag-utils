{
    docker kill rosbag-util-dev || true
    docker rm rosbag-util-dev
} &> /dev/null

echo -e "\e[32mRosbag-utils-dev stopped.\e[0m"
