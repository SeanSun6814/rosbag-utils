import argparse
import subprocess

# Define the dictionary that maps arguments to bash script filenames
SCRIPTS = {
    "dev": {
        "run": "./scripts/compile.sh",
        "stop_docker": "./scripts/dev_docker_stop.sh",
        "ubuntu_docker": "./scripts/dev_docker_start.sh",
        "wsl_docker": "./scripts/dev_docker_start.sh",
        "build_docker": "./scripts/dev_docker_build.sh",
    },
    "prod": {
        "run": "./scripts/run.sh",
        "stop_docker": "./scripts/prod_docker_stop.sh",
        "ubuntu_docker": "./scripts/prod_docker_ubuntu_start.sh",
        "wsl_docker": "./scripts/prod_docker_wsl_start.sh",
        "build_docker": "./scripts/prod_docker_build.sh",
    },
}

parser = argparse.ArgumentParser(description="Run Docker scripts.")
parser.add_argument("mode_or_action", nargs="*", help="Mode and action.")
args, script_args = parser.parse_known_args()
# print(args, script_args)

mode = "prod"
action = "run"

for arg in args.mode_or_action:
    if arg in SCRIPTS.keys():
        mode = arg
    else:
        action = arg

subprocess.run(["bash", SCRIPTS[mode][action]] + script_args)
