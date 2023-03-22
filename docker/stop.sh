{
    docker kill rosbag-util || true
    docker rm rosbag-util
} &> /dev/null

echo -e "\e[32mRosbag-utils stopped.\e[0m"
