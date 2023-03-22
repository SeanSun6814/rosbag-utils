FOLDER="${1:-/}"
echo -e "Starting rosbag-utils with /data folder: \e[32m${FOLDER}\e[0m"
echo -e "To change dataset folder, run \e[33m./mac_docker_start.sh /your/folder/here\e[0m"


docker run \
-it \
--name rosbag-utils \
--volume $(pwd)/../:/root/rosbag-utils \
-v "$FOLDER:/data" \
-p 8000-8001:8000-8001 \
--env DISPLAY=host.docker.internal:0 \
--volume /tmp/.X11-unix:/tmp/.X11-unix \
--privileged \
rosbag-utils:latest \
/bin/bash -c "cd /root/rosbag-utils && python3 app.py -n"
