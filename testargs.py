import argparse

parser = argparse.ArgumentParser(description="Rosbag Utils")
parser.add_argument("-n", "--no_browswer", action='store_true', help="Don't open browser by default.")
parser.add_argument("-p", "--ports", nargs="*", default=[8000], help="Start multiple servers at different ports.")
args = parser.parse_args()

print(args)