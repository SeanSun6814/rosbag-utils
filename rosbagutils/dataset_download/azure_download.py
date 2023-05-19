import os
import sys
from ..dataset_download.read_datasets import readDatasets
from ..utils import joinPaths, mkdir, getFolderSize
import subprocess
import time
import re
from subprocess import Popen, PIPE, CalledProcessError
from typing import Dict, List, Tuple, Union, Optional, Any, Callable


def checkAzcopy() -> None:
    """
    Checks if Azcopy is installed and installs it if not.

    Returns:
        None
    """
    if not os.path.exists("./azcopy"):
        print("Azcopy not found. Installing Azcopy...")
        if os.name == "posix" and sys.platform == "linux":
            os.system("wget https://aka.ms/downloadazcopy-v10-linux")
            os.system("tar -xvf downloadazcopy-v10-linux")
            os.system("mv azcopy_linux_amd64*/azcopy .")

            os.system("rm downloadazcopy-v10-linux* -r")
            os.system("rm -r azcopy_linux*")
            os.system("chmod +x azcopy")
        else:
            raise Exception("Unsupported OS")
    print("Azcopy found, ready to download.")


def downloadTopic(datasetName: str, topicName: str, outPath: str, envInfo: dict, sendProgress: Callable) -> Dict:
    """
    Downloads a topic from a dataset.

    Args:
        datasetName (str): The name of the dataset.
        topicName (str): The name of the topic.
        outPath (str): The path to save the downloaded topic.
        envInfo (dict): The environment information.
        sendProgress (callable): A function to send progress updates.

    Returns:
        dict: A dictionary indicating that the download is done.
    """
    sendProgress(percentage=0.05, details="Installing azcopy...")
    checkAzcopy()
    # Example: "./azcopy copy https://tartanairv2.blob.core.windows.net/subtmrs/run_6/system ./downloads --recursive"
    dataset = list(filter(lambda x: x["name"] == datasetName, readDatasets()))[0]
    link = joinPaths(dataset["link"], topicName)
    datasetOutPath = joinPaths(outPath, datasetName)
    mkdir(datasetOutPath)
    command = "./azcopy copy " + link + " " + datasetOutPath + " --recursive"
    print("Executing", command)
    sendProgress(percentage=0.1, details="Downloading " + datasetName + "/" + topicName)
    with Popen(command, shell=True, stdout=PIPE, bufsize=1, universal_newlines=True) as p:
        for line in p.stdout:
            print("Downloading", line, end="")  # process line here
            progress = re.findall(r"(\d+\.\d+)\s%", line)
            if progress:
                percentage = float(progress[0]) / 100
                sendProgress(
                    percentage=percentage * 0.9 + 0.1,
                    details="Downloading " + datasetName + "/" + topicName + " [" + str(round(percentage * 100)) + "%]",
                )
    return {"download": "done!"}
