FROM ros:noetic

RUN apt-get update && apt-get -y install software-properties-common && add-apt-repository universe && apt-get update

RUN apt-get install -y python3-pip curl

RUN pip3 install black

RUN apt-get remove --purge nodejs npm

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && apt update && apt install -y nodejs yarn

CMD ["sh", "/root/rosbag-utils/scripts/compile_in_docker.sh"]
