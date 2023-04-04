```
   _____              _                          _    _  _    _  _
  |  __ \            | |                        | |  | || |  (_)| |
  | |__) | ___   ___ | |__    __ _   __ _       | |  | || |_  _ | | ___
  |  _  / / _ \ / __|| '_ \  / _` | / _` |      | |  | || __|| || |/ __|
  | | \ \| (_) |\__ \| |_) || (_| || (_| |      | |__| || |_ | || |\__ \
  |_|  \_\\___/ |___/|_.__/  \__,_| \__, |       \____/  \__||_||_||___/
                                     __/ |
                                    |___/
```

![1 (1)](https://user-images.githubusercontent.com/33432158/214935335-cd55eb9f-0621-4fe9-ad81-3fd05969c80a.png)
![2 (1)](https://user-images.githubusercontent.com/33432158/214935344-a193ef27-ee3a-4dfb-8118-df0a229f38c7.png)

# Rosbag-utils

## Get started

### Docker Installation

1. `git clone https://github.com/SeanSun6814/rosbag-utils.git`
2. `./docker_build.sh`
3. `./docker_wsl_start.sh` or `./docker_ubuntu_start.sh` or `./docker_mac_start.sh`

### Linux Installation

1. Install ROS
2. `sudo apt-get install libgtk-3-dev`
3. `pip3 install laspy tdigest websocket_server attrdict3 wxPython`
4. `git clone https://github.com/SeanSun6814/rosbag-utils.git`
5. `python3 app.py`
6. _Alternatively: `python3 app.py -n` to don't automatically launch browser_

_Tested on Ubuntu 20.04 with Python3, ROS Noetic, and Google Chrome._

_Tested on Windows 11 WSL2 (Ubuntu 20.04) with Python3, ROS Noetic, and Google Chrome._

### Tutorial

[https://superodometry.com/rosbagutils](https://superodometry.com/rosbagutils)

### Contribute

-   Create issue, make new branch for changes
-   Format code: `pip3 install black && black . && cd client && npm i --legacy-peer-deps && npm run lint`
-   Build client: `cd client && npm i --legacy-peer-deps && npm run build`
-   Create PR and confirm lint passes

## Support & Warranty

lmao
