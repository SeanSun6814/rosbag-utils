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

<p align="center" style="display: flex; justify-content: center;">
  <img src="https://github.com/SeanSun6814/rosbag-utils/actions/workflows/lint.yml/badge.svg" alt="Lint Status">
 <img src="https://github.com/SeanSun6814/rosbag-utils/actions/workflows/build.yml/badge.svg" alt="Build Status">
  <img src="https://github.com/SeanSun6814/rosbag-utils/actions/workflows/datasets.yml/badge.svg" alt="Datasets Status">
    
    
</p>


![1](https://user-images.githubusercontent.com/33432158/214935335-cd55eb9f-0621-4fe9-ad81-3fd05969c80a.png)
![2](https://user-images.githubusercontent.com/33432158/214935344-a193ef27-ee3a-4dfb-8118-df0a229f38c7.png)

# Rosbag-utils

## Get started

### Docker Installation

1. `git clone https://github.com/SeanSun6814/rosbag-utils.git`
2. `./docker_build.sh`
3. `./docker_wsl_start.sh` or `./docker_ubuntu_start.sh`

### Linux Installation

1. Install ROS Noetic
2. `sudo apt-get install libgtk-3-dev`
3. `pip3 install laspy tdigest websocket_server attrdict3 wxPython`
4. `git clone https://github.com/SeanSun6814/rosbag-utils.git`
5. `python3 app.py`
6. _Alternatively: `python3 app.py -n` to don't automatically launch browser_

:white_check_mark: _Tested on Ubuntu 20.04 with Python3, and ROS Noetic._

:white_check_mark: _Tested on Windows 11 WSL2 (Ubuntu 20.04) with Python3, and ROS Noetic._

:white_check_mark: _Tested on Microsoft Edge, and Firefox, and Google Chrome (requires latest update)_

:x: _Does **not** support M1 Macs_

### Tutorial

[https://superodometry.com/rosbagutils](https://superodometry.com/rosbagutils)

## Data Release API Tutorial 

In the rosbag-utils directory velodyne_packets_devel branch, the config.json file contains the information of the bag files to be processed: 

1. "datapath": a path to the folder that contains all the bag files to be processed 
2. "namespace"
3. "start_time"
4. "end_time": the end time to process the file, use -1 if there is no end_time limit

After adding bag information into the config.json file, run: 

`python3 ./data_release_api.py config.json`

If you are using Docker, run:

`python3 ./data_release_api.py --in_docker IN_DOCKER config.json`

## Contributing to rosbag-utils

We welcome contributions to the rosbag utils repository! Here are some guidelines to follow:

### Issues
If you find a bug or have a feature request, please create an issue on the [GitHub Issues](https://github.com/SeanSun6814/rosbag-utils/issues) page. Please include in your issue:
- A concise title that summarizes the issue or feature request.
- A detailed description of the issue or feature request, including steps to reproduce the issue and any relevant error messages.
- Any relevant system information, such as the operating system and version, browser and version, or device and version.
- Any relevant logs or screenshots or videos that can help diagnose the issue.
- A clear and concise summary of what you expect to happen.
- A clear and concise summary of what actually happens.
- Any relevant context or background information that can help understand the issue or feature request.
- Any relevant links or references to related issues or pull requests.

### Pull Requests
If you would like to contribute code to the repository, please follow these steps:

**All pull requests should be merged into the `develop` branch. Make sure your branch is based from our `develop` branch and _not_ `main`.**

1. Create a new fork for your changes (make sure to fork **_all_** branches).
2. Write the new feature
3. Compile and format your code* with `./compile.sh` before making a commit
4. Create a pull request with your changes, and confirm all GitHub Actions pass

_*Alteratively, build code with:_
```bash
pip3 install black && black .
cd client && npm i --legacy-peer-deps && npm run lint && npm run build
```

#### Pull Request Guide

Please include in your Pull Request:

- A clear and concise title that summarizes the changes made in the pull request.
- A detailed description of the changes made in the pull request, including any relevant context or background information.
- Any relevant links or references to related issues or pull requests.
- Any relevant screenshots or videos that can help demonstrate the changes made.
- Any relevant tests or test results that can help verify the changes made.
- Any relevant documentation or code comments that can help explain the changes made.

## Support & Warranty

lmao
