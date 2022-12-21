FOLDER="${1:-/home}"
echo -e "Starting rosbag-utils with /data folder: \e[32m${FOLDER}\e[0m"
echo -e "To change dataset folder, run \e[33m./wsl_docker_start.sh /your/folder/here\e[0m"

docker run \
-it \
--name rosbag-util \
-v $(readlink -f "../."):/root/rosbag-utils \
-v "$FOLDER:/data" \
-p 8000-8010:8000-8010 \
-e "DISPLAY" \
-e "QT_X11_NO_MITSHM=1" \
-v "/tmp/.X11-unix:/tmp/.X11-unix:rw" \
--privileged \
airlab/rosbag-utils:latest \
/bin/bash -c "cd /root/rosbag-utils && python3 app.py -n"