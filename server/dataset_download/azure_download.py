import os
import sys
from server.dataset_download.read_datasets import readDatasets
from server.utils import joinPaths, mkdir, getFolderSize
import subprocess
import time
import re


def checkAzcopy():
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


def downloadTopic(datasetName, topicName, outPath, envInfo, sendProgress):
    sendProgress(percentage=0.1, details="Installing azcopy...")
    checkAzcopy()
    # ./azcopy copy https://tartanairv2.blob.core.windows.net/subtmrs/run_6/system ./downloads --recursive
    dataset = list(filter(lambda x: x["name"] == datasetName, readDatasets()))[0]
    topicTotalSize = dataset["topics"][topicName]["size"]
    link = joinPaths(dataset["link"], topicName)
    topicOutPath = joinPaths(outPath, joinPaths(datasetName, topicName))
    mkdir(topicOutPath)
    command = "./azcopy copy " + link + " " + topicOutPath + " --recursive"
    print("Executing", command)
    process = subprocess.Popen(command, shell=True)
    sendProgress(
        details="Downloading " + datasetName + "/" + topicName,
    )
    while process.poll() is None:
        # try:
        #     output = str(process.stdout.readline())
        #     percentage_match = re.search(r"(\d+\.\d+)\s+%", output)
        #     if percentage_match:
        #         percentage = float(percentage_match.group(1))
        #         print("PERCENT", percentage)
        # except Exception as e:
        #     print(e)
        #     pass
        time.sleep(2)

    if process.returncode != 0:
        raise Exception("Azcopy failed with error code " + str(process.returncode))
    sendProgress(percentage=1, details="Downloaded " + datasetName + "/" + topicName)
    return {"download": "done!"}
