FROM ros:noetic

EXPOSE 8000
EXPOSE 8001

RUN apt-get update && apt-get -y install software-properties-common && add-apt-repository universe && apt-get update

RUN apt-get install -y python3-pip

RUN apt install -y python3-rosdep python3-rosinstall python3-rosinstall-generator python3-wstool build-essential python3-catkin-tools python3-dev ros-noetic-cv-bridge

RUN apt-get install -y --no-install-recommends x11-apps

RUN pip3 install laspy tdigest websocket_server

# Install Firefox

RUN add-apt-repository ppa:mozillateam/ppa

RUN echo $' \n\
Package: * \n\
Pin: release o=LP-PPA-mozillateam \n\
Pin-Priority: 1001 \n\
 \n\
Package: firefox \n\
Pin: version 1:1snap1-0ubuntu2 \n\
Pin-Priority: -1 \n\
' | tee /etc/apt/preferences.d/mozilla-firefox

RUN apt-get install firefox -y

# Install wxPython

RUN pip3 install attrdict3

RUN apt-get install libgtk-3-dev wget -y

RUN wget https://extras.wxpython.org/wxPython4/extras/linux/gtk3/ubuntu-20.04/wxPython-4.2.0-cp38-cp38-linux_x86_64.whl -O /root/wxPython-4.2.0-cp38-cp38-linux_x86_64.whl

RUN pip3 install /root/wxPython-4.2.0-cp38-cp38-linux_x86_64.whl

RUN DEBIAN_FRONTEND=noninteractive apt-get install libnotify4 libsdl2-2.0 -y

RUN export LD_LIBRARY_PATH=/path/to/libnotify.so.4:$LD_LIBRARY_PATH

RUN export LD_LIBRARY_PATH=/path/to/libSDL2-2.0.so.0:$LD_LIBRARY_PATH

RUN mkdir data

RUN echo "(xdg-open http://127.0.0.1:8000 > /dev/null 2>&1) & cd /root/rosbag-utils && python3 app.py" >> start.sh

CMD ["sh", "start.sh"]
