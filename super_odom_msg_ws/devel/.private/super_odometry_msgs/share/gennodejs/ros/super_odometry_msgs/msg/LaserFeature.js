// Auto-generated. Do not edit!

// (in-package super_odometry_msgs.msg)


"use strict";

const _serializer = _ros_msg_utils.Serialize;
const _arraySerializer = _serializer.Array;
const _deserializer = _ros_msg_utils.Deserialize;
const _arrayDeserializer = _deserializer.Array;
const _finder = _ros_msg_utils.Find;
const _getByteLength = _ros_msg_utils.getByteLength;
let sensor_msgs = _finder('sensor_msgs');
let std_msgs = _finder('std_msgs');

//-----------------------------------------------------------

class LaserFeature {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.header = null;
      this.sensor = null;
      this.imuAvailable = null;
      this.odomAvailable = null;
      this.imuQuaternionX = null;
      this.imuQuaternionY = null;
      this.imuQuaternionZ = null;
      this.imuQuaternionW = null;
      this.initialPoseX = null;
      this.initialPoseY = null;
      this.initialPoseZ = null;
      this.initialQuaternionX = null;
      this.initialQuaternionY = null;
      this.initialQuaternionZ = null;
      this.initialQuaternionW = null;
      this.imuPreintegrationResetId = null;
      this.cloud_nodistortion = null;
      this.cloud_corner = null;
      this.cloud_surface = null;
      this.cloud_realsense = null;
    }
    else {
      if (initObj.hasOwnProperty('header')) {
        this.header = initObj.header
      }
      else {
        this.header = new std_msgs.msg.Header();
      }
      if (initObj.hasOwnProperty('sensor')) {
        this.sensor = initObj.sensor
      }
      else {
        this.sensor = 0;
      }
      if (initObj.hasOwnProperty('imuAvailable')) {
        this.imuAvailable = initObj.imuAvailable
      }
      else {
        this.imuAvailable = 0;
      }
      if (initObj.hasOwnProperty('odomAvailable')) {
        this.odomAvailable = initObj.odomAvailable
      }
      else {
        this.odomAvailable = 0;
      }
      if (initObj.hasOwnProperty('imuQuaternionX')) {
        this.imuQuaternionX = initObj.imuQuaternionX
      }
      else {
        this.imuQuaternionX = 0.0;
      }
      if (initObj.hasOwnProperty('imuQuaternionY')) {
        this.imuQuaternionY = initObj.imuQuaternionY
      }
      else {
        this.imuQuaternionY = 0.0;
      }
      if (initObj.hasOwnProperty('imuQuaternionZ')) {
        this.imuQuaternionZ = initObj.imuQuaternionZ
      }
      else {
        this.imuQuaternionZ = 0.0;
      }
      if (initObj.hasOwnProperty('imuQuaternionW')) {
        this.imuQuaternionW = initObj.imuQuaternionW
      }
      else {
        this.imuQuaternionW = 0.0;
      }
      if (initObj.hasOwnProperty('initialPoseX')) {
        this.initialPoseX = initObj.initialPoseX
      }
      else {
        this.initialPoseX = 0.0;
      }
      if (initObj.hasOwnProperty('initialPoseY')) {
        this.initialPoseY = initObj.initialPoseY
      }
      else {
        this.initialPoseY = 0.0;
      }
      if (initObj.hasOwnProperty('initialPoseZ')) {
        this.initialPoseZ = initObj.initialPoseZ
      }
      else {
        this.initialPoseZ = 0.0;
      }
      if (initObj.hasOwnProperty('initialQuaternionX')) {
        this.initialQuaternionX = initObj.initialQuaternionX
      }
      else {
        this.initialQuaternionX = 0.0;
      }
      if (initObj.hasOwnProperty('initialQuaternionY')) {
        this.initialQuaternionY = initObj.initialQuaternionY
      }
      else {
        this.initialQuaternionY = 0.0;
      }
      if (initObj.hasOwnProperty('initialQuaternionZ')) {
        this.initialQuaternionZ = initObj.initialQuaternionZ
      }
      else {
        this.initialQuaternionZ = 0.0;
      }
      if (initObj.hasOwnProperty('initialQuaternionW')) {
        this.initialQuaternionW = initObj.initialQuaternionW
      }
      else {
        this.initialQuaternionW = 0.0;
      }
      if (initObj.hasOwnProperty('imuPreintegrationResetId')) {
        this.imuPreintegrationResetId = initObj.imuPreintegrationResetId
      }
      else {
        this.imuPreintegrationResetId = 0;
      }
      if (initObj.hasOwnProperty('cloud_nodistortion')) {
        this.cloud_nodistortion = initObj.cloud_nodistortion
      }
      else {
        this.cloud_nodistortion = new sensor_msgs.msg.PointCloud2();
      }
      if (initObj.hasOwnProperty('cloud_corner')) {
        this.cloud_corner = initObj.cloud_corner
      }
      else {
        this.cloud_corner = new sensor_msgs.msg.PointCloud2();
      }
      if (initObj.hasOwnProperty('cloud_surface')) {
        this.cloud_surface = initObj.cloud_surface
      }
      else {
        this.cloud_surface = new sensor_msgs.msg.PointCloud2();
      }
      if (initObj.hasOwnProperty('cloud_realsense')) {
        this.cloud_realsense = initObj.cloud_realsense
      }
      else {
        this.cloud_realsense = new sensor_msgs.msg.PointCloud2();
      }
    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type LaserFeature
    // Serialize message field [header]
    bufferOffset = std_msgs.msg.Header.serialize(obj.header, buffer, bufferOffset);
    // Serialize message field [sensor]
    bufferOffset = _serializer.int64(obj.sensor, buffer, bufferOffset);
    // Serialize message field [imuAvailable]
    bufferOffset = _serializer.int64(obj.imuAvailable, buffer, bufferOffset);
    // Serialize message field [odomAvailable]
    bufferOffset = _serializer.int64(obj.odomAvailable, buffer, bufferOffset);
    // Serialize message field [imuQuaternionX]
    bufferOffset = _serializer.float64(obj.imuQuaternionX, buffer, bufferOffset);
    // Serialize message field [imuQuaternionY]
    bufferOffset = _serializer.float64(obj.imuQuaternionY, buffer, bufferOffset);
    // Serialize message field [imuQuaternionZ]
    bufferOffset = _serializer.float64(obj.imuQuaternionZ, buffer, bufferOffset);
    // Serialize message field [imuQuaternionW]
    bufferOffset = _serializer.float64(obj.imuQuaternionW, buffer, bufferOffset);
    // Serialize message field [initialPoseX]
    bufferOffset = _serializer.float64(obj.initialPoseX, buffer, bufferOffset);
    // Serialize message field [initialPoseY]
    bufferOffset = _serializer.float64(obj.initialPoseY, buffer, bufferOffset);
    // Serialize message field [initialPoseZ]
    bufferOffset = _serializer.float64(obj.initialPoseZ, buffer, bufferOffset);
    // Serialize message field [initialQuaternionX]
    bufferOffset = _serializer.float64(obj.initialQuaternionX, buffer, bufferOffset);
    // Serialize message field [initialQuaternionY]
    bufferOffset = _serializer.float64(obj.initialQuaternionY, buffer, bufferOffset);
    // Serialize message field [initialQuaternionZ]
    bufferOffset = _serializer.float64(obj.initialQuaternionZ, buffer, bufferOffset);
    // Serialize message field [initialQuaternionW]
    bufferOffset = _serializer.float64(obj.initialQuaternionW, buffer, bufferOffset);
    // Serialize message field [imuPreintegrationResetId]
    bufferOffset = _serializer.int64(obj.imuPreintegrationResetId, buffer, bufferOffset);
    // Serialize message field [cloud_nodistortion]
    bufferOffset = sensor_msgs.msg.PointCloud2.serialize(obj.cloud_nodistortion, buffer, bufferOffset);
    // Serialize message field [cloud_corner]
    bufferOffset = sensor_msgs.msg.PointCloud2.serialize(obj.cloud_corner, buffer, bufferOffset);
    // Serialize message field [cloud_surface]
    bufferOffset = sensor_msgs.msg.PointCloud2.serialize(obj.cloud_surface, buffer, bufferOffset);
    // Serialize message field [cloud_realsense]
    bufferOffset = sensor_msgs.msg.PointCloud2.serialize(obj.cloud_realsense, buffer, bufferOffset);
    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    //deserializes a message object of type LaserFeature
    let len;
    let data = new LaserFeature(null);
    // Deserialize message field [header]
    data.header = std_msgs.msg.Header.deserialize(buffer, bufferOffset);
    // Deserialize message field [sensor]
    data.sensor = _deserializer.int64(buffer, bufferOffset);
    // Deserialize message field [imuAvailable]
    data.imuAvailable = _deserializer.int64(buffer, bufferOffset);
    // Deserialize message field [odomAvailable]
    data.odomAvailable = _deserializer.int64(buffer, bufferOffset);
    // Deserialize message field [imuQuaternionX]
    data.imuQuaternionX = _deserializer.float64(buffer, bufferOffset);
    // Deserialize message field [imuQuaternionY]
    data.imuQuaternionY = _deserializer.float64(buffer, bufferOffset);
    // Deserialize message field [imuQuaternionZ]
    data.imuQuaternionZ = _deserializer.float64(buffer, bufferOffset);
    // Deserialize message field [imuQuaternionW]
    data.imuQuaternionW = _deserializer.float64(buffer, bufferOffset);
    // Deserialize message field [initialPoseX]
    data.initialPoseX = _deserializer.float64(buffer, bufferOffset);
    // Deserialize message field [initialPoseY]
    data.initialPoseY = _deserializer.float64(buffer, bufferOffset);
    // Deserialize message field [initialPoseZ]
    data.initialPoseZ = _deserializer.float64(buffer, bufferOffset);
    // Deserialize message field [initialQuaternionX]
    data.initialQuaternionX = _deserializer.float64(buffer, bufferOffset);
    // Deserialize message field [initialQuaternionY]
    data.initialQuaternionY = _deserializer.float64(buffer, bufferOffset);
    // Deserialize message field [initialQuaternionZ]
    data.initialQuaternionZ = _deserializer.float64(buffer, bufferOffset);
    // Deserialize message field [initialQuaternionW]
    data.initialQuaternionW = _deserializer.float64(buffer, bufferOffset);
    // Deserialize message field [imuPreintegrationResetId]
    data.imuPreintegrationResetId = _deserializer.int64(buffer, bufferOffset);
    // Deserialize message field [cloud_nodistortion]
    data.cloud_nodistortion = sensor_msgs.msg.PointCloud2.deserialize(buffer, bufferOffset);
    // Deserialize message field [cloud_corner]
    data.cloud_corner = sensor_msgs.msg.PointCloud2.deserialize(buffer, bufferOffset);
    // Deserialize message field [cloud_surface]
    data.cloud_surface = sensor_msgs.msg.PointCloud2.deserialize(buffer, bufferOffset);
    // Deserialize message field [cloud_realsense]
    data.cloud_realsense = sensor_msgs.msg.PointCloud2.deserialize(buffer, bufferOffset);
    return data;
  }

  static getMessageSize(object) {
    let length = 0;
    length += std_msgs.msg.Header.getMessageSize(object.header);
    length += sensor_msgs.msg.PointCloud2.getMessageSize(object.cloud_nodistortion);
    length += sensor_msgs.msg.PointCloud2.getMessageSize(object.cloud_corner);
    length += sensor_msgs.msg.PointCloud2.getMessageSize(object.cloud_surface);
    length += sensor_msgs.msg.PointCloud2.getMessageSize(object.cloud_realsense);
    return length + 120;
  }

  static datatype() {
    // Returns string type for a message object
    return 'super_odometry_msgs/LaserFeature';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '4df4873a8473f99d913205e932f77f89';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    # feature Info
    Header header 
    
    int64 sensor
    
    int64 imuAvailable
    int64 odomAvailable
    
    # IMU initial guess for laser mapping
    float64 imuQuaternionX
    float64 imuQuaternionY
    float64 imuQuaternionZ
    float64 imuQuaternionW
    
    # Odometry initial guess for laser mapping
    float64 initialPoseX
    float64 initialPoseY
    float64 initialPoseZ
    float64 initialQuaternionX
    float64 initialQuaternionY
    float64 initialQuaternionZ
    float64 initialQuaternionW 
    
    # Preintegration reset ID
    int64 imuPreintegrationResetId
    
    # Point cloud messages
    sensor_msgs/PointCloud2 cloud_nodistortion  # original cloud remove distortion
    sensor_msgs/PointCloud2 cloud_corner    # extracted corner feature
    sensor_msgs/PointCloud2 cloud_surface   # extracted surface feature
    sensor_msgs/PointCloud2 cloud_realsense   # extracted surface feature from realsense
    ================================================================================
    MSG: std_msgs/Header
    # Standard metadata for higher-level stamped data types.
    # This is generally used to communicate timestamped data 
    # in a particular coordinate frame.
    # 
    # sequence ID: consecutively increasing ID 
    uint32 seq
    #Two-integer timestamp that is expressed as:
    # * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')
    # * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')
    # time-handling sugar is provided by the client library
    time stamp
    #Frame this data is associated with
    string frame_id
    
    ================================================================================
    MSG: sensor_msgs/PointCloud2
    # This message holds a collection of N-dimensional points, which may
    # contain additional information such as normals, intensity, etc. The
    # point data is stored as a binary blob, its layout described by the
    # contents of the "fields" array.
    
    # The point cloud data may be organized 2d (image-like) or 1d
    # (unordered). Point clouds organized as 2d images may be produced by
    # camera depth sensors such as stereo or time-of-flight.
    
    # Time of sensor data acquisition, and the coordinate frame ID (for 3d
    # points).
    Header header
    
    # 2D structure of the point cloud. If the cloud is unordered, height is
    # 1 and width is the length of the point cloud.
    uint32 height
    uint32 width
    
    # Describes the channels and their layout in the binary data blob.
    PointField[] fields
    
    bool    is_bigendian # Is this data bigendian?
    uint32  point_step   # Length of a point in bytes
    uint32  row_step     # Length of a row in bytes
    uint8[] data         # Actual point data, size is (row_step*height)
    
    bool is_dense        # True if there are no invalid points
    
    ================================================================================
    MSG: sensor_msgs/PointField
    # This message holds the description of one point entry in the
    # PointCloud2 message format.
    uint8 INT8    = 1
    uint8 UINT8   = 2
    uint8 INT16   = 3
    uint8 UINT16  = 4
    uint8 INT32   = 5
    uint8 UINT32  = 6
    uint8 FLOAT32 = 7
    uint8 FLOAT64 = 8
    
    string name      # Name of field
    uint32 offset    # Offset from start of point struct
    uint8  datatype  # Datatype enumeration, see above
    uint32 count     # How many elements in the field
    
    `;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new LaserFeature(null);
    if (msg.header !== undefined) {
      resolved.header = std_msgs.msg.Header.Resolve(msg.header)
    }
    else {
      resolved.header = new std_msgs.msg.Header()
    }

    if (msg.sensor !== undefined) {
      resolved.sensor = msg.sensor;
    }
    else {
      resolved.sensor = 0
    }

    if (msg.imuAvailable !== undefined) {
      resolved.imuAvailable = msg.imuAvailable;
    }
    else {
      resolved.imuAvailable = 0
    }

    if (msg.odomAvailable !== undefined) {
      resolved.odomAvailable = msg.odomAvailable;
    }
    else {
      resolved.odomAvailable = 0
    }

    if (msg.imuQuaternionX !== undefined) {
      resolved.imuQuaternionX = msg.imuQuaternionX;
    }
    else {
      resolved.imuQuaternionX = 0.0
    }

    if (msg.imuQuaternionY !== undefined) {
      resolved.imuQuaternionY = msg.imuQuaternionY;
    }
    else {
      resolved.imuQuaternionY = 0.0
    }

    if (msg.imuQuaternionZ !== undefined) {
      resolved.imuQuaternionZ = msg.imuQuaternionZ;
    }
    else {
      resolved.imuQuaternionZ = 0.0
    }

    if (msg.imuQuaternionW !== undefined) {
      resolved.imuQuaternionW = msg.imuQuaternionW;
    }
    else {
      resolved.imuQuaternionW = 0.0
    }

    if (msg.initialPoseX !== undefined) {
      resolved.initialPoseX = msg.initialPoseX;
    }
    else {
      resolved.initialPoseX = 0.0
    }

    if (msg.initialPoseY !== undefined) {
      resolved.initialPoseY = msg.initialPoseY;
    }
    else {
      resolved.initialPoseY = 0.0
    }

    if (msg.initialPoseZ !== undefined) {
      resolved.initialPoseZ = msg.initialPoseZ;
    }
    else {
      resolved.initialPoseZ = 0.0
    }

    if (msg.initialQuaternionX !== undefined) {
      resolved.initialQuaternionX = msg.initialQuaternionX;
    }
    else {
      resolved.initialQuaternionX = 0.0
    }

    if (msg.initialQuaternionY !== undefined) {
      resolved.initialQuaternionY = msg.initialQuaternionY;
    }
    else {
      resolved.initialQuaternionY = 0.0
    }

    if (msg.initialQuaternionZ !== undefined) {
      resolved.initialQuaternionZ = msg.initialQuaternionZ;
    }
    else {
      resolved.initialQuaternionZ = 0.0
    }

    if (msg.initialQuaternionW !== undefined) {
      resolved.initialQuaternionW = msg.initialQuaternionW;
    }
    else {
      resolved.initialQuaternionW = 0.0
    }

    if (msg.imuPreintegrationResetId !== undefined) {
      resolved.imuPreintegrationResetId = msg.imuPreintegrationResetId;
    }
    else {
      resolved.imuPreintegrationResetId = 0
    }

    if (msg.cloud_nodistortion !== undefined) {
      resolved.cloud_nodistortion = sensor_msgs.msg.PointCloud2.Resolve(msg.cloud_nodistortion)
    }
    else {
      resolved.cloud_nodistortion = new sensor_msgs.msg.PointCloud2()
    }

    if (msg.cloud_corner !== undefined) {
      resolved.cloud_corner = sensor_msgs.msg.PointCloud2.Resolve(msg.cloud_corner)
    }
    else {
      resolved.cloud_corner = new sensor_msgs.msg.PointCloud2()
    }

    if (msg.cloud_surface !== undefined) {
      resolved.cloud_surface = sensor_msgs.msg.PointCloud2.Resolve(msg.cloud_surface)
    }
    else {
      resolved.cloud_surface = new sensor_msgs.msg.PointCloud2()
    }

    if (msg.cloud_realsense !== undefined) {
      resolved.cloud_realsense = sensor_msgs.msg.PointCloud2.Resolve(msg.cloud_realsense)
    }
    else {
      resolved.cloud_realsense = new sensor_msgs.msg.PointCloud2()
    }

    return resolved;
    }
};

module.exports = LaserFeature;
