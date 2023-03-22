FROM ros:noetic

EXPOSE 8000
EXPOSE 8001

RUN apt-get update && apt-get -y install software-properties-common && add-apt-repository universe && apt-get update

RUN apt-get install -y python3.9 python3-pip python3-tk

RUN apt install -y python3-rosdep python3-rosinstall python3-rosinstall-generator python3-wstool build-essential python3-catkin-tools python3-dev ros-noetic-cv-bridge

RUN apt-get install -y --no-install-recommends x11-apps

RUN pip3 install laspy tdigest websocket_server

RUN mkdir data

RUN echo "cd /root/rosbag-utils && python3 app.py" >> start.sh

CMD ["sh", "start.sh"]
