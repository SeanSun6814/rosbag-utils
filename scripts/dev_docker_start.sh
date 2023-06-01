{
    docker kill rosbag-util-dev || true
    docker rm rosbag-util-dev
} &> /dev/null

echo -e "\e[32mStarting rosbag-utils-dev...\e[0m"


docker run \
-it \
--name rosbag-util-dev \
-v $(readlink -f "./."):/root/rosbag-utils \
--privileged \
rosbag-utils-dev:latest
