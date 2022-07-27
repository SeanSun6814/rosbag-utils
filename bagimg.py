


def exportVideo(paths, pathOut, topic, dt):
    bagIn = rosbag.Bag(pathIn)
    for topic, msg, t in bagIn.read_messages(topics=[topic]):
        if "16UC1" in msg.encoding or "mono16" in msg.encoding:
            cv_img = np.array(bridge.imgmsg_to_cv2(msg))
            cv_img = (cv_img / 256).astype("uint8")
        elif "8UC1" in msg.encoding or "mono8" in msg.encoding:
            cv_img = np.array(bridge.imgmsg_to_cv2(msg, desired_encoding="mono8"))
        elif "8UC3" in msg.encoding or "rgb8" in msg.encoding:
            cv_img = np.array(bridge.imgmsg_to_cv2(msg))
            cv_img = cv2.cvtColor(cv_img, cv2.COLOR_BGR2GRAY)