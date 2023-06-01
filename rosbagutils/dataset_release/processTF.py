import rosbag
import rostopic
import random
from .. import utils
from tqdm import tqdm


def processTF(paths, targetTopic, pathOut, sendProgress):
    utils.mkdir(utils.getFolderFromPath(pathOut))
    count = 0
    percentProgressPerBag = 1 / len(paths)
    
    with open(pathOut + "/tf_data.csv" , 'w') as f:
        f.write('timestamp,parent_frame,child_frame,trans_x,trans_y,trans_z,qx,qy,qz,qw\n')
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
                details=("Processing " + str(count) + " TF messages"),
            )
            topicsInfo = bagIn.get_type_and_topic_info().topics
            totalMessages = sum(
                [topicsInfo[topic].message_count if topic in topicsInfo else 0 for topic in [targetTopic]]
            )
            sendProgressEveryHowManyMessages = max(random.randint(77, 97), int(totalMessages / (100 / len(paths))))
            bagStartCount = count
        
            for topic, _msg, t in tqdm(bagIn.read_messages(topics=[targetTopic]) , total=totalMessages):
                for msg in _msg.transforms:          
                    timestamp = msg.header.stamp
                    parent_frame = str(msg.header.frame_id)
                    child_frame = str(msg.child_frame_id)
                    
                    trans_x = msg.transform.translation.x
                    trans_y = msg.transform.translation.y
                    trans_z = msg.transform.translation.z
                    
                    qx = msg.transform.rotation.x
                    qy = msg.transform.rotation.y
                    qz = msg.transform.rotation.z
                    qw = msg.transform.rotation.w
                    
                    f.write(str(timestamp)+','+str(parent_frame)+','+str(child_frame)+','+str(trans_x)+','+str(trans_y)+','+str(trans_z)+','+str(qx)+','+str(qy)+','+str(qz)+','+str(qw)+'\n')
                    
                    count += 1
                    if count % sendProgressEveryHowManyMessages == 0:
                        sendProgress(
                            percentage=(
                                basePercentage
                                + ((count - bagStartCount) / totalMessages * 0.89 + 0.1) * percentProgressPerBag
                            ),
                            details=("Processing " + str(count) + " TF messages"),
                        )
                        
    result = {
        "num_messages": count,
        "size": utils.getFolderSize(pathOut),
    }

    return result
