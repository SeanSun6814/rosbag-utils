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

![image](https://user-images.githubusercontent.com/33432158/177209138-464c6e66-9022-4b29-a144-82997ce2c797.png)

# Rosbag-utils

## Get started

### Installation

1. Clone this repo
2. `pip3 install pylas`
3. `python3 app.py`
4. _Alternatively:_ `python3 app.py -n -p 8000 8001 8002` to open three instances of rosbag utils and don't automatically launch browser

_Tested on Ubuntu 20.04 with Python3, ROS Noetic, and Google Chrome._

### Tutorial

[video](https://drive.google.com/file/d/1CQdt6Wb7p-Y6IWatlXA0cpNmh8SU0kE1/view?usp=sharing)

## Features

-   Filter topics from rosbags

-   Batch processing

-   Calculate trajectory length

-   Auto crop blank space at the beginning of rosbags

## Change log

### 1.1.0

-   Added more output file information
-   Added non-continuous input file detection

### 1.2.0

-   Importing bag files is now much, _much_ faster

### 1.3.0

-   Supports manually specifying cropping timestamps


### 1.4.0

- Auto cropping defaults to include entire bag if topic is not found
- Exports will be in a new, separate directory.
- Cropping bug fixed: corner case of if the auto cropping topic is not found, it will display a negative start time
- Cropping bug fixed: corner case of user manually changes cropping time of skipped bag
- Bug fixed where empty bags will break the info api call and cause internal error

### 1.4.1

- Minor UI bugs fixed which are related to `Treat as one run` and the completion of step 3 
