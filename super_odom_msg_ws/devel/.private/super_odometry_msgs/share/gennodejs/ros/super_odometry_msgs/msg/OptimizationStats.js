// Auto-generated. Do not edit!

// (in-package super_odometry_msgs.msg)


"use strict";

const _serializer = _ros_msg_utils.Serialize;
const _arraySerializer = _serializer.Array;
const _deserializer = _ros_msg_utils.Deserialize;
const _arrayDeserializer = _deserializer.Array;
const _finder = _ros_msg_utils.Find;
const _getByteLength = _ros_msg_utils.getByteLength;
let IterationStats = require('./IterationStats.js');
let std_msgs = _finder('std_msgs');

//-----------------------------------------------------------

class OptimizationStats {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.header = null;
      this.laserCloudSurfFromMapNum = null;
      this.laserCloudCornerFromMapNum = null;
      this.laserCloudSurfStackNum = null;
      this.laserCloudCornerStackNum = null;
      this.total_translation = null;
      this.total_rotation = null;
      this.translation_from_last = null;
      this.rotation_from_last = null;
      this.time_elapsed = null;
      this.latency = null;
      this.n_iterations = null;
      this.average_distance = null;
      this.uncertainty_x = null;
      this.uncertainty_y = null;
      this.uncertainty_z = null;
      this.uncertainty_roll = null;
      this.uncertainty_pitch = null;
      this.uncertainty_yaw = null;
      this.meanSquareDistEdgeInlierNum = null;
      this.meanSquareDistEdgeOutlierNum = null;
      this.fitQualityCoeffEdgeInlierNum = null;
      this.fitQualityCoeffEdgeOutlierNum = null;
      this.meanSquareDistPlaneInlierNum = null;
      this.meanSquareDistPlaneOutlierNum = null;
      this.fitQualityCoeffPlaneInlierNum = null;
      this.fitQualityCoeffPlaneOutlierNum = null;
      this.PlaneMatchSuccess = null;
      this.PlaneNoEnoughNeighbor = null;
      this.PlaneNeighborTooFar = null;
      this.PlaneBADPCAStructure = null;
      this.PlaneInvalidNumerical = null;
      this.PlaneMSETOOLARGE = null;
      this.PlaneUnknown = null;
      this.PredictionSource = null;
      this.iterations = null;
    }
    else {
      if (initObj.hasOwnProperty('header')) {
        this.header = initObj.header
      }
      else {
        this.header = new std_msgs.msg.Header();
      }
      if (initObj.hasOwnProperty('laserCloudSurfFromMapNum')) {
        this.laserCloudSurfFromMapNum = initObj.laserCloudSurfFromMapNum
      }
      else {
        this.laserCloudSurfFromMapNum = 0;
      }
      if (initObj.hasOwnProperty('laserCloudCornerFromMapNum')) {
        this.laserCloudCornerFromMapNum = initObj.laserCloudCornerFromMapNum
      }
      else {
        this.laserCloudCornerFromMapNum = 0;
      }
      if (initObj.hasOwnProperty('laserCloudSurfStackNum')) {
        this.laserCloudSurfStackNum = initObj.laserCloudSurfStackNum
      }
      else {
        this.laserCloudSurfStackNum = 0;
      }
      if (initObj.hasOwnProperty('laserCloudCornerStackNum')) {
        this.laserCloudCornerStackNum = initObj.laserCloudCornerStackNum
      }
      else {
        this.laserCloudCornerStackNum = 0;
      }
      if (initObj.hasOwnProperty('total_translation')) {
        this.total_translation = initObj.total_translation
      }
      else {
        this.total_translation = 0.0;
      }
      if (initObj.hasOwnProperty('total_rotation')) {
        this.total_rotation = initObj.total_rotation
      }
      else {
        this.total_rotation = 0.0;
      }
      if (initObj.hasOwnProperty('translation_from_last')) {
        this.translation_from_last = initObj.translation_from_last
      }
      else {
        this.translation_from_last = 0.0;
      }
      if (initObj.hasOwnProperty('rotation_from_last')) {
        this.rotation_from_last = initObj.rotation_from_last
      }
      else {
        this.rotation_from_last = 0.0;
      }
      if (initObj.hasOwnProperty('time_elapsed')) {
        this.time_elapsed = initObj.time_elapsed
      }
      else {
        this.time_elapsed = 0.0;
      }
      if (initObj.hasOwnProperty('latency')) {
        this.latency = initObj.latency
      }
      else {
        this.latency = 0.0;
      }
      if (initObj.hasOwnProperty('n_iterations')) {
        this.n_iterations = initObj.n_iterations
      }
      else {
        this.n_iterations = 0;
      }
      if (initObj.hasOwnProperty('average_distance')) {
        this.average_distance = initObj.average_distance
      }
      else {
        this.average_distance = 0.0;
      }
      if (initObj.hasOwnProperty('uncertainty_x')) {
        this.uncertainty_x = initObj.uncertainty_x
      }
      else {
        this.uncertainty_x = 0.0;
      }
      if (initObj.hasOwnProperty('uncertainty_y')) {
        this.uncertainty_y = initObj.uncertainty_y
      }
      else {
        this.uncertainty_y = 0.0;
      }
      if (initObj.hasOwnProperty('uncertainty_z')) {
        this.uncertainty_z = initObj.uncertainty_z
      }
      else {
        this.uncertainty_z = 0.0;
      }
      if (initObj.hasOwnProperty('uncertainty_roll')) {
        this.uncertainty_roll = initObj.uncertainty_roll
      }
      else {
        this.uncertainty_roll = 0.0;
      }
      if (initObj.hasOwnProperty('uncertainty_pitch')) {
        this.uncertainty_pitch = initObj.uncertainty_pitch
      }
      else {
        this.uncertainty_pitch = 0.0;
      }
      if (initObj.hasOwnProperty('uncertainty_yaw')) {
        this.uncertainty_yaw = initObj.uncertainty_yaw
      }
      else {
        this.uncertainty_yaw = 0.0;
      }
      if (initObj.hasOwnProperty('meanSquareDistEdgeInlierNum')) {
        this.meanSquareDistEdgeInlierNum = initObj.meanSquareDistEdgeInlierNum
      }
      else {
        this.meanSquareDistEdgeInlierNum = 0;
      }
      if (initObj.hasOwnProperty('meanSquareDistEdgeOutlierNum')) {
        this.meanSquareDistEdgeOutlierNum = initObj.meanSquareDistEdgeOutlierNum
      }
      else {
        this.meanSquareDistEdgeOutlierNum = 0;
      }
      if (initObj.hasOwnProperty('fitQualityCoeffEdgeInlierNum')) {
        this.fitQualityCoeffEdgeInlierNum = initObj.fitQualityCoeffEdgeInlierNum
      }
      else {
        this.fitQualityCoeffEdgeInlierNum = 0;
      }
      if (initObj.hasOwnProperty('fitQualityCoeffEdgeOutlierNum')) {
        this.fitQualityCoeffEdgeOutlierNum = initObj.fitQualityCoeffEdgeOutlierNum
      }
      else {
        this.fitQualityCoeffEdgeOutlierNum = 0;
      }
      if (initObj.hasOwnProperty('meanSquareDistPlaneInlierNum')) {
        this.meanSquareDistPlaneInlierNum = initObj.meanSquareDistPlaneInlierNum
      }
      else {
        this.meanSquareDistPlaneInlierNum = 0;
      }
      if (initObj.hasOwnProperty('meanSquareDistPlaneOutlierNum')) {
        this.meanSquareDistPlaneOutlierNum = initObj.meanSquareDistPlaneOutlierNum
      }
      else {
        this.meanSquareDistPlaneOutlierNum = 0;
      }
      if (initObj.hasOwnProperty('fitQualityCoeffPlaneInlierNum')) {
        this.fitQualityCoeffPlaneInlierNum = initObj.fitQualityCoeffPlaneInlierNum
      }
      else {
        this.fitQualityCoeffPlaneInlierNum = 0;
      }
      if (initObj.hasOwnProperty('fitQualityCoeffPlaneOutlierNum')) {
        this.fitQualityCoeffPlaneOutlierNum = initObj.fitQualityCoeffPlaneOutlierNum
      }
      else {
        this.fitQualityCoeffPlaneOutlierNum = 0;
      }
      if (initObj.hasOwnProperty('PlaneMatchSuccess')) {
        this.PlaneMatchSuccess = initObj.PlaneMatchSuccess
      }
      else {
        this.PlaneMatchSuccess = 0;
      }
      if (initObj.hasOwnProperty('PlaneNoEnoughNeighbor')) {
        this.PlaneNoEnoughNeighbor = initObj.PlaneNoEnoughNeighbor
      }
      else {
        this.PlaneNoEnoughNeighbor = 0;
      }
      if (initObj.hasOwnProperty('PlaneNeighborTooFar')) {
        this.PlaneNeighborTooFar = initObj.PlaneNeighborTooFar
      }
      else {
        this.PlaneNeighborTooFar = 0;
      }
      if (initObj.hasOwnProperty('PlaneBADPCAStructure')) {
        this.PlaneBADPCAStructure = initObj.PlaneBADPCAStructure
      }
      else {
        this.PlaneBADPCAStructure = 0;
      }
      if (initObj.hasOwnProperty('PlaneInvalidNumerical')) {
        this.PlaneInvalidNumerical = initObj.PlaneInvalidNumerical
      }
      else {
        this.PlaneInvalidNumerical = 0;
      }
      if (initObj.hasOwnProperty('PlaneMSETOOLARGE')) {
        this.PlaneMSETOOLARGE = initObj.PlaneMSETOOLARGE
      }
      else {
        this.PlaneMSETOOLARGE = 0;
      }
      if (initObj.hasOwnProperty('PlaneUnknown')) {
        this.PlaneUnknown = initObj.PlaneUnknown
      }
      else {
        this.PlaneUnknown = 0;
      }
      if (initObj.hasOwnProperty('PredictionSource')) {
        this.PredictionSource = initObj.PredictionSource
      }
      else {
        this.PredictionSource = 0;
      }
      if (initObj.hasOwnProperty('iterations')) {
        this.iterations = initObj.iterations
      }
      else {
        this.iterations = [];
      }
    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type OptimizationStats
    // Serialize message field [header]
    bufferOffset = std_msgs.msg.Header.serialize(obj.header, buffer, bufferOffset);
    // Serialize message field [laserCloudSurfFromMapNum]
    bufferOffset = _serializer.int32(obj.laserCloudSurfFromMapNum, buffer, bufferOffset);
    // Serialize message field [laserCloudCornerFromMapNum]
    bufferOffset = _serializer.int32(obj.laserCloudCornerFromMapNum, buffer, bufferOffset);
    // Serialize message field [laserCloudSurfStackNum]
    bufferOffset = _serializer.int32(obj.laserCloudSurfStackNum, buffer, bufferOffset);
    // Serialize message field [laserCloudCornerStackNum]
    bufferOffset = _serializer.int32(obj.laserCloudCornerStackNum, buffer, bufferOffset);
    // Serialize message field [total_translation]
    bufferOffset = _serializer.float64(obj.total_translation, buffer, bufferOffset);
    // Serialize message field [total_rotation]
    bufferOffset = _serializer.float64(obj.total_rotation, buffer, bufferOffset);
    // Serialize message field [translation_from_last]
    bufferOffset = _serializer.float64(obj.translation_from_last, buffer, bufferOffset);
    // Serialize message field [rotation_from_last]
    bufferOffset = _serializer.float64(obj.rotation_from_last, buffer, bufferOffset);
    // Serialize message field [time_elapsed]
    bufferOffset = _serializer.float64(obj.time_elapsed, buffer, bufferOffset);
    // Serialize message field [latency]
    bufferOffset = _serializer.float64(obj.latency, buffer, bufferOffset);
    // Serialize message field [n_iterations]
    bufferOffset = _serializer.int32(obj.n_iterations, buffer, bufferOffset);
    // Serialize message field [average_distance]
    bufferOffset = _serializer.float64(obj.average_distance, buffer, bufferOffset);
    // Serialize message field [uncertainty_x]
    bufferOffset = _serializer.float64(obj.uncertainty_x, buffer, bufferOffset);
    // Serialize message field [uncertainty_y]
    bufferOffset = _serializer.float64(obj.uncertainty_y, buffer, bufferOffset);
    // Serialize message field [uncertainty_z]
    bufferOffset = _serializer.float64(obj.uncertainty_z, buffer, bufferOffset);
    // Serialize message field [uncertainty_roll]
    bufferOffset = _serializer.float64(obj.uncertainty_roll, buffer, bufferOffset);
    // Serialize message field [uncertainty_pitch]
    bufferOffset = _serializer.float64(obj.uncertainty_pitch, buffer, bufferOffset);
    // Serialize message field [uncertainty_yaw]
    bufferOffset = _serializer.float64(obj.uncertainty_yaw, buffer, bufferOffset);
    // Serialize message field [meanSquareDistEdgeInlierNum]
    bufferOffset = _serializer.int32(obj.meanSquareDistEdgeInlierNum, buffer, bufferOffset);
    // Serialize message field [meanSquareDistEdgeOutlierNum]
    bufferOffset = _serializer.int32(obj.meanSquareDistEdgeOutlierNum, buffer, bufferOffset);
    // Serialize message field [fitQualityCoeffEdgeInlierNum]
    bufferOffset = _serializer.int32(obj.fitQualityCoeffEdgeInlierNum, buffer, bufferOffset);
    // Serialize message field [fitQualityCoeffEdgeOutlierNum]
    bufferOffset = _serializer.int32(obj.fitQualityCoeffEdgeOutlierNum, buffer, bufferOffset);
    // Serialize message field [meanSquareDistPlaneInlierNum]
    bufferOffset = _serializer.int32(obj.meanSquareDistPlaneInlierNum, buffer, bufferOffset);
    // Serialize message field [meanSquareDistPlaneOutlierNum]
    bufferOffset = _serializer.int32(obj.meanSquareDistPlaneOutlierNum, buffer, bufferOffset);
    // Serialize message field [fitQualityCoeffPlaneInlierNum]
    bufferOffset = _serializer.int32(obj.fitQualityCoeffPlaneInlierNum, buffer, bufferOffset);
    // Serialize message field [fitQualityCoeffPlaneOutlierNum]
    bufferOffset = _serializer.int32(obj.fitQualityCoeffPlaneOutlierNum, buffer, bufferOffset);
    // Serialize message field [PlaneMatchSuccess]
    bufferOffset = _serializer.int32(obj.PlaneMatchSuccess, buffer, bufferOffset);
    // Serialize message field [PlaneNoEnoughNeighbor]
    bufferOffset = _serializer.int32(obj.PlaneNoEnoughNeighbor, buffer, bufferOffset);
    // Serialize message field [PlaneNeighborTooFar]
    bufferOffset = _serializer.int32(obj.PlaneNeighborTooFar, buffer, bufferOffset);
    // Serialize message field [PlaneBADPCAStructure]
    bufferOffset = _serializer.int32(obj.PlaneBADPCAStructure, buffer, bufferOffset);
    // Serialize message field [PlaneInvalidNumerical]
    bufferOffset = _serializer.int32(obj.PlaneInvalidNumerical, buffer, bufferOffset);
    // Serialize message field [PlaneMSETOOLARGE]
    bufferOffset = _serializer.int32(obj.PlaneMSETOOLARGE, buffer, bufferOffset);
    // Serialize message field [PlaneUnknown]
    bufferOffset = _serializer.int32(obj.PlaneUnknown, buffer, bufferOffset);
    // Serialize message field [PredictionSource]
    bufferOffset = _serializer.int32(obj.PredictionSource, buffer, bufferOffset);
    // Serialize message field [iterations]
    // Serialize the length for message field [iterations]
    bufferOffset = _serializer.uint32(obj.iterations.length, buffer, bufferOffset);
    obj.iterations.forEach((val) => {
      bufferOffset = IterationStats.serialize(val, buffer, bufferOffset);
    });
    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    //deserializes a message object of type OptimizationStats
    let len;
    let data = new OptimizationStats(null);
    // Deserialize message field [header]
    data.header = std_msgs.msg.Header.deserialize(buffer, bufferOffset);
    // Deserialize message field [laserCloudSurfFromMapNum]
    data.laserCloudSurfFromMapNum = _deserializer.int32(buffer, bufferOffset);
    // Deserialize message field [laserCloudCornerFromMapNum]
    data.laserCloudCornerFromMapNum = _deserializer.int32(buffer, bufferOffset);
    // Deserialize message field [laserCloudSurfStackNum]
    data.laserCloudSurfStackNum = _deserializer.int32(buffer, bufferOffset);
    // Deserialize message field [laserCloudCornerStackNum]
    data.laserCloudCornerStackNum = _deserializer.int32(buffer, bufferOffset);
    // Deserialize message field [total_translation]
    data.total_translation = _deserializer.float64(buffer, bufferOffset);
    // Deserialize message field [total_rotation]
    data.total_rotation = _deserializer.float64(buffer, bufferOffset);
    // Deserialize message field [translation_from_last]
    data.translation_from_last = _deserializer.float64(buffer, bufferOffset);
    // Deserialize message field [rotation_from_last]
    data.rotation_from_last = _deserializer.float64(buffer, bufferOffset);
    // Deserialize message field [time_elapsed]
    data.time_elapsed = _deserializer.float64(buffer, bufferOffset);
    // Deserialize message field [latency]
    data.latency = _deserializer.float64(buffer, bufferOffset);
    // Deserialize message field [n_iterations]
    data.n_iterations = _deserializer.int32(buffer, bufferOffset);
    // Deserialize message field [average_distance]
    data.average_distance = _deserializer.float64(buffer, bufferOffset);
    // Deserialize message field [uncertainty_x]
    data.uncertainty_x = _deserializer.float64(buffer, bufferOffset);
    // Deserialize message field [uncertainty_y]
    data.uncertainty_y = _deserializer.float64(buffer, bufferOffset);
    // Deserialize message field [uncertainty_z]
    data.uncertainty_z = _deserializer.float64(buffer, bufferOffset);
    // Deserialize message field [uncertainty_roll]
    data.uncertainty_roll = _deserializer.float64(buffer, bufferOffset);
    // Deserialize message field [uncertainty_pitch]
    data.uncertainty_pitch = _deserializer.float64(buffer, bufferOffset);
    // Deserialize message field [uncertainty_yaw]
    data.uncertainty_yaw = _deserializer.float64(buffer, bufferOffset);
    // Deserialize message field [meanSquareDistEdgeInlierNum]
    data.meanSquareDistEdgeInlierNum = _deserializer.int32(buffer, bufferOffset);
    // Deserialize message field [meanSquareDistEdgeOutlierNum]
    data.meanSquareDistEdgeOutlierNum = _deserializer.int32(buffer, bufferOffset);
    // Deserialize message field [fitQualityCoeffEdgeInlierNum]
    data.fitQualityCoeffEdgeInlierNum = _deserializer.int32(buffer, bufferOffset);
    // Deserialize message field [fitQualityCoeffEdgeOutlierNum]
    data.fitQualityCoeffEdgeOutlierNum = _deserializer.int32(buffer, bufferOffset);
    // Deserialize message field [meanSquareDistPlaneInlierNum]
    data.meanSquareDistPlaneInlierNum = _deserializer.int32(buffer, bufferOffset);
    // Deserialize message field [meanSquareDistPlaneOutlierNum]
    data.meanSquareDistPlaneOutlierNum = _deserializer.int32(buffer, bufferOffset);
    // Deserialize message field [fitQualityCoeffPlaneInlierNum]
    data.fitQualityCoeffPlaneInlierNum = _deserializer.int32(buffer, bufferOffset);
    // Deserialize message field [fitQualityCoeffPlaneOutlierNum]
    data.fitQualityCoeffPlaneOutlierNum = _deserializer.int32(buffer, bufferOffset);
    // Deserialize message field [PlaneMatchSuccess]
    data.PlaneMatchSuccess = _deserializer.int32(buffer, bufferOffset);
    // Deserialize message field [PlaneNoEnoughNeighbor]
    data.PlaneNoEnoughNeighbor = _deserializer.int32(buffer, bufferOffset);
    // Deserialize message field [PlaneNeighborTooFar]
    data.PlaneNeighborTooFar = _deserializer.int32(buffer, bufferOffset);
    // Deserialize message field [PlaneBADPCAStructure]
    data.PlaneBADPCAStructure = _deserializer.int32(buffer, bufferOffset);
    // Deserialize message field [PlaneInvalidNumerical]
    data.PlaneInvalidNumerical = _deserializer.int32(buffer, bufferOffset);
    // Deserialize message field [PlaneMSETOOLARGE]
    data.PlaneMSETOOLARGE = _deserializer.int32(buffer, bufferOffset);
    // Deserialize message field [PlaneUnknown]
    data.PlaneUnknown = _deserializer.int32(buffer, bufferOffset);
    // Deserialize message field [PredictionSource]
    data.PredictionSource = _deserializer.int32(buffer, bufferOffset);
    // Deserialize message field [iterations]
    // Deserialize array length for message field [iterations]
    len = _deserializer.uint32(buffer, bufferOffset);
    data.iterations = new Array(len);
    for (let i = 0; i < len; ++i) {
      data.iterations[i] = IterationStats.deserialize(buffer, bufferOffset)
    }
    return data;
  }

  static getMessageSize(object) {
    let length = 0;
    length += std_msgs.msg.Header.getMessageSize(object.header);
    length += 32 * object.iterations.length;
    return length + 192;
  }

  static datatype() {
    // Returns string type for a message object
    return 'super_odometry_msgs/OptimizationStats';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return 'db5910f4dcadf7d411c357fed874db59';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    Header header
    int32 laserCloudSurfFromMapNum
    int32 laserCloudCornerFromMapNum
    int32 laserCloudSurfStackNum
    int32 laserCloudCornerStackNum
    float64 total_translation
    float64 total_rotation
    float64 translation_from_last
    float64 rotation_from_last
    float64 time_elapsed
    float64 latency
    int32 n_iterations 
    float64 average_distance 
    float64 uncertainty_x
    float64 uncertainty_y
    float64 uncertainty_z
    float64 uncertainty_roll
    float64 uncertainty_pitch
    float64 uncertainty_yaw
    int32 meanSquareDistEdgeInlierNum
    int32 meanSquareDistEdgeOutlierNum
    int32 fitQualityCoeffEdgeInlierNum
    int32 fitQualityCoeffEdgeOutlierNum
    int32 meanSquareDistPlaneInlierNum
    int32 meanSquareDistPlaneOutlierNum
    int32 fitQualityCoeffPlaneInlierNum
    int32 fitQualityCoeffPlaneOutlierNum
    int32  PlaneMatchSuccess
    int32  PlaneNoEnoughNeighbor
    int32  PlaneNeighborTooFar 
    int32  PlaneBADPCAStructure
    int32  PlaneInvalidNumerical
    int32  PlaneMSETOOLARGE
    int32  PlaneUnknown
    int32  PredictionSource 
    super_odometry_msgs/IterationStats[] iterations
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
    MSG: super_odometry_msgs/IterationStats
    # float64 time_elapsed
    float64 translation_norm
    float64 rotation_norm
    float64 num_surf_from_scan
    float64 num_corner_from_scan
    
    `;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new OptimizationStats(null);
    if (msg.header !== undefined) {
      resolved.header = std_msgs.msg.Header.Resolve(msg.header)
    }
    else {
      resolved.header = new std_msgs.msg.Header()
    }

    if (msg.laserCloudSurfFromMapNum !== undefined) {
      resolved.laserCloudSurfFromMapNum = msg.laserCloudSurfFromMapNum;
    }
    else {
      resolved.laserCloudSurfFromMapNum = 0
    }

    if (msg.laserCloudCornerFromMapNum !== undefined) {
      resolved.laserCloudCornerFromMapNum = msg.laserCloudCornerFromMapNum;
    }
    else {
      resolved.laserCloudCornerFromMapNum = 0
    }

    if (msg.laserCloudSurfStackNum !== undefined) {
      resolved.laserCloudSurfStackNum = msg.laserCloudSurfStackNum;
    }
    else {
      resolved.laserCloudSurfStackNum = 0
    }

    if (msg.laserCloudCornerStackNum !== undefined) {
      resolved.laserCloudCornerStackNum = msg.laserCloudCornerStackNum;
    }
    else {
      resolved.laserCloudCornerStackNum = 0
    }

    if (msg.total_translation !== undefined) {
      resolved.total_translation = msg.total_translation;
    }
    else {
      resolved.total_translation = 0.0
    }

    if (msg.total_rotation !== undefined) {
      resolved.total_rotation = msg.total_rotation;
    }
    else {
      resolved.total_rotation = 0.0
    }

    if (msg.translation_from_last !== undefined) {
      resolved.translation_from_last = msg.translation_from_last;
    }
    else {
      resolved.translation_from_last = 0.0
    }

    if (msg.rotation_from_last !== undefined) {
      resolved.rotation_from_last = msg.rotation_from_last;
    }
    else {
      resolved.rotation_from_last = 0.0
    }

    if (msg.time_elapsed !== undefined) {
      resolved.time_elapsed = msg.time_elapsed;
    }
    else {
      resolved.time_elapsed = 0.0
    }

    if (msg.latency !== undefined) {
      resolved.latency = msg.latency;
    }
    else {
      resolved.latency = 0.0
    }

    if (msg.n_iterations !== undefined) {
      resolved.n_iterations = msg.n_iterations;
    }
    else {
      resolved.n_iterations = 0
    }

    if (msg.average_distance !== undefined) {
      resolved.average_distance = msg.average_distance;
    }
    else {
      resolved.average_distance = 0.0
    }

    if (msg.uncertainty_x !== undefined) {
      resolved.uncertainty_x = msg.uncertainty_x;
    }
    else {
      resolved.uncertainty_x = 0.0
    }

    if (msg.uncertainty_y !== undefined) {
      resolved.uncertainty_y = msg.uncertainty_y;
    }
    else {
      resolved.uncertainty_y = 0.0
    }

    if (msg.uncertainty_z !== undefined) {
      resolved.uncertainty_z = msg.uncertainty_z;
    }
    else {
      resolved.uncertainty_z = 0.0
    }

    if (msg.uncertainty_roll !== undefined) {
      resolved.uncertainty_roll = msg.uncertainty_roll;
    }
    else {
      resolved.uncertainty_roll = 0.0
    }

    if (msg.uncertainty_pitch !== undefined) {
      resolved.uncertainty_pitch = msg.uncertainty_pitch;
    }
    else {
      resolved.uncertainty_pitch = 0.0
    }

    if (msg.uncertainty_yaw !== undefined) {
      resolved.uncertainty_yaw = msg.uncertainty_yaw;
    }
    else {
      resolved.uncertainty_yaw = 0.0
    }

    if (msg.meanSquareDistEdgeInlierNum !== undefined) {
      resolved.meanSquareDistEdgeInlierNum = msg.meanSquareDistEdgeInlierNum;
    }
    else {
      resolved.meanSquareDistEdgeInlierNum = 0
    }

    if (msg.meanSquareDistEdgeOutlierNum !== undefined) {
      resolved.meanSquareDistEdgeOutlierNum = msg.meanSquareDistEdgeOutlierNum;
    }
    else {
      resolved.meanSquareDistEdgeOutlierNum = 0
    }

    if (msg.fitQualityCoeffEdgeInlierNum !== undefined) {
      resolved.fitQualityCoeffEdgeInlierNum = msg.fitQualityCoeffEdgeInlierNum;
    }
    else {
      resolved.fitQualityCoeffEdgeInlierNum = 0
    }

    if (msg.fitQualityCoeffEdgeOutlierNum !== undefined) {
      resolved.fitQualityCoeffEdgeOutlierNum = msg.fitQualityCoeffEdgeOutlierNum;
    }
    else {
      resolved.fitQualityCoeffEdgeOutlierNum = 0
    }

    if (msg.meanSquareDistPlaneInlierNum !== undefined) {
      resolved.meanSquareDistPlaneInlierNum = msg.meanSquareDistPlaneInlierNum;
    }
    else {
      resolved.meanSquareDistPlaneInlierNum = 0
    }

    if (msg.meanSquareDistPlaneOutlierNum !== undefined) {
      resolved.meanSquareDistPlaneOutlierNum = msg.meanSquareDistPlaneOutlierNum;
    }
    else {
      resolved.meanSquareDistPlaneOutlierNum = 0
    }

    if (msg.fitQualityCoeffPlaneInlierNum !== undefined) {
      resolved.fitQualityCoeffPlaneInlierNum = msg.fitQualityCoeffPlaneInlierNum;
    }
    else {
      resolved.fitQualityCoeffPlaneInlierNum = 0
    }

    if (msg.fitQualityCoeffPlaneOutlierNum !== undefined) {
      resolved.fitQualityCoeffPlaneOutlierNum = msg.fitQualityCoeffPlaneOutlierNum;
    }
    else {
      resolved.fitQualityCoeffPlaneOutlierNum = 0
    }

    if (msg.PlaneMatchSuccess !== undefined) {
      resolved.PlaneMatchSuccess = msg.PlaneMatchSuccess;
    }
    else {
      resolved.PlaneMatchSuccess = 0
    }

    if (msg.PlaneNoEnoughNeighbor !== undefined) {
      resolved.PlaneNoEnoughNeighbor = msg.PlaneNoEnoughNeighbor;
    }
    else {
      resolved.PlaneNoEnoughNeighbor = 0
    }

    if (msg.PlaneNeighborTooFar !== undefined) {
      resolved.PlaneNeighborTooFar = msg.PlaneNeighborTooFar;
    }
    else {
      resolved.PlaneNeighborTooFar = 0
    }

    if (msg.PlaneBADPCAStructure !== undefined) {
      resolved.PlaneBADPCAStructure = msg.PlaneBADPCAStructure;
    }
    else {
      resolved.PlaneBADPCAStructure = 0
    }

    if (msg.PlaneInvalidNumerical !== undefined) {
      resolved.PlaneInvalidNumerical = msg.PlaneInvalidNumerical;
    }
    else {
      resolved.PlaneInvalidNumerical = 0
    }

    if (msg.PlaneMSETOOLARGE !== undefined) {
      resolved.PlaneMSETOOLARGE = msg.PlaneMSETOOLARGE;
    }
    else {
      resolved.PlaneMSETOOLARGE = 0
    }

    if (msg.PlaneUnknown !== undefined) {
      resolved.PlaneUnknown = msg.PlaneUnknown;
    }
    else {
      resolved.PlaneUnknown = 0
    }

    if (msg.PredictionSource !== undefined) {
      resolved.PredictionSource = msg.PredictionSource;
    }
    else {
      resolved.PredictionSource = 0
    }

    if (msg.iterations !== undefined) {
      resolved.iterations = new Array(msg.iterations.length);
      for (let i = 0; i < resolved.iterations.length; ++i) {
        resolved.iterations[i] = IterationStats.Resolve(msg.iterations[i]);
      }
    }
    else {
      resolved.iterations = []
    }

    return resolved;
    }
};

module.exports = OptimizationStats;
