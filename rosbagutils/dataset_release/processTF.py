import rosbag
import random
import pandas as pd
from .. import utils

def processTF(paths, targetTopic, pathOut, sendProgress):
    utils.mkdir(utils.getFilenameFromPath(pathOut))
    count = 0
    percentProgressPerBag = 1 / len(paths)
    tf_df = pd.DataFrame()
    tf_df.columns = ['timestamp','parent_frame','child_frame','trans_x','trans_y','trans_z','qx','qy','qz','qw']
    
    for path, pathIdx in zip(paths, range(len(paths))):
        if path.strip() == "":
            continue
        print("Processing " + path)
        basePercentage = pathIdx * percentProgressPerBag
        sendProgress(
            percentage=(basePercentage + 0.05 * percentProgressPerBag),
            details=("Loading " + utils.getFilenameFromPath(path)),
        )
        bagIn = rosbag.Bag(path)
        sendProgress(
            percentage=(basePercentage + 0.1 * percentProgressPerBag),
            details=("Processing " + str(count) + " odometry messages"),
        )
        topicsInfo = bagIn.get_type_and_topic_info().topics
        totalMessages = sum(
            [topicsInfo[topic].message_count if topic in topicsInfo else 0 for topic in [targetTopic]]
        )
        sendProgressEveryHowManyMessages = max(random.randint(77, 97), int(totalMessages / (100 / len(paths))))
        bagStartCount = count
    
        for topic, msg, t in bagIn.read_messages(topics=[targetTopic]):
            msg = msg[0]
            
            timestamp = float(msg.header.stamp)
            parent_frame = str(msg.header.frame_id)
            child_frame = str(msg.child_frame_id)
            
            trans_x = msg.transform.translation.x
            trans_y = msg.transform.translation.y
            trans_z = msg.transform.translation.z
            
            qx = msg.transform.rotation.x
            qy = msg.transform.rotation.y
            qz = msg.transform.rotation.z
            qw = msg.transform.rotation.w
            
            tf_df.loc[len(tf_df.index)] = [timestamp,parent_frame,child_frame,trans_x,trans_y,trans_z,qx,qy,qz,qw]
            
            count += 1
            if count % sendProgressEveryHowManyMessages == 0:
                sendProgress(
                    percentage=(
                        basePercentage
                        + ((count - bagStartCount) / totalMessages * 0.89 + 0.1) * percentProgressPerBag
                    ),
                    details=("Processing " + str(count) + " odometry messages"),
                )
    
    tf_df.to_csv(pathOut+'tf_data.csv')
    result = {
        "num_messages": count,
        "size": utils.getFolderSize(pathOut),
    }

    return result            