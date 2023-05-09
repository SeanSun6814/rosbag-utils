import os
import sys
from server.dataset_download.read_datasets import readDatasets
from server.utils import joinPaths, mkdir

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


def downloadTopic(datasetName, topicName, outPath, sendProgress):
    # ./azcopy copy https://tartanairv2.blob.core.windows.net/subtmrs/run_6/system ./downloads --recursive
    dataset = filter(lambda x: x["name"] == datasetName, readDatasets())[0]
    link = joinPaths(dataset["link"], topicName)
    command = "./azcopy copy " + link + " " + outPath + " --recursive"
    mkdir(outPath)
    os.system(command)