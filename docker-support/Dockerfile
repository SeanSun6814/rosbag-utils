FROM ros:noetic
EXPOSE 8000
EXPOSE 8001

RUN apt-get update && apt-get -y install software-properties-common && add-apt-repository universe && apt-get update

RUN apt-get install -y python3.9

# install pip
RUN apt-get install -y python3-pip python3-tk

# install python packages
RUN pip3 install laspy

# install ros packages
RUN apt install -y python3-rosdep python3-rosinstall python3-rosinstall-generator python3-wstool build-essential python3-catkin-tools python3-dev

# install cv_bridge
RUN apt-get install -y ros-noetic-cv-bridge

RUN apt-get install -y --no-install-recommends x11-apps

RUN mkdir datasets

RUN echo "cd /root/rosbag-utils && python3 app.py -n" >> start.sh

CMD ["sh", "start.sh"]


