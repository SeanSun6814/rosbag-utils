// Auto-generated. Do not edit!

// (in-package super_odometry_msgs.msg)


"use strict";

const _serializer = _ros_msg_utils.Serialize;
const _arraySerializer = _serializer.Array;
const _deserializer = _ros_msg_utils.Deserialize;
const _arrayDeserializer = _deserializer.Array;
const _finder = _ros_msg_utils.Find;
const _getByteLength = _ros_msg_utils.getByteLength;

//-----------------------------------------------------------

class IterationStats {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.translation_norm = null;
      this.rotation_norm = null;
      this.num_surf_from_scan = null;
      this.num_corner_from_scan = null;
    }
    else {
      if (initObj.hasOwnProperty('translation_norm')) {
        this.translation_norm = initObj.translation_norm
      }
      else {
        this.translation_norm = 0.0;
      }
      if (initObj.hasOwnProperty('rotation_norm')) {
        this.rotation_norm = initObj.rotation_norm
      }
      else {
        this.rotation_norm = 0.0;
      }
      if (initObj.hasOwnProperty('num_surf_from_scan')) {
        this.num_surf_from_scan = initObj.num_surf_from_scan
      }
      else {
        this.num_surf_from_scan = 0.0;
      }
      if (initObj.hasOwnProperty('num_corner_from_scan')) {
        this.num_corner_from_scan = initObj.num_corner_from_scan
      }
      else {
        this.num_corner_from_scan = 0.0;
      }
    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type IterationStats
    // Serialize message field [translation_norm]
    bufferOffset = _serializer.float64(obj.translation_norm, buffer, bufferOffset);
    // Serialize message field [rotation_norm]
    bufferOffset = _serializer.float64(obj.rotation_norm, buffer, bufferOffset);
    // Serialize message field [num_surf_from_scan]
    bufferOffset = _serializer.float64(obj.num_surf_from_scan, buffer, bufferOffset);
    // Serialize message field [num_corner_from_scan]
    bufferOffset = _serializer.float64(obj.num_corner_from_scan, buffer, bufferOffset);
    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    //deserializes a message object of type IterationStats
    let len;
    let data = new IterationStats(null);
    // Deserialize message field [translation_norm]
    data.translation_norm = _deserializer.float64(buffer, bufferOffset);
    // Deserialize message field [rotation_norm]
    data.rotation_norm = _deserializer.float64(buffer, bufferOffset);
    // Deserialize message field [num_surf_from_scan]
    data.num_surf_from_scan = _deserializer.float64(buffer, bufferOffset);
    // Deserialize message field [num_corner_from_scan]
    data.num_corner_from_scan = _deserializer.float64(buffer, bufferOffset);
    return data;
  }

  static getMessageSize(object) {
    return 32;
  }

  static datatype() {
    // Returns string type for a message object
    return 'super_odometry_msgs/IterationStats';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '90f71769f61c5a37fe60b3deb9b24f06';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
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
    const resolved = new IterationStats(null);
    if (msg.translation_norm !== undefined) {
      resolved.translation_norm = msg.translation_norm;
    }
    else {
      resolved.translation_norm = 0.0
    }

    if (msg.rotation_norm !== undefined) {
      resolved.rotation_norm = msg.rotation_norm;
    }
    else {
      resolved.rotation_norm = 0.0
    }

    if (msg.num_surf_from_scan !== undefined) {
      resolved.num_surf_from_scan = msg.num_surf_from_scan;
    }
    else {
      resolved.num_surf_from_scan = 0.0
    }

    if (msg.num_corner_from_scan !== undefined) {
      resolved.num_corner_from_scan = msg.num_corner_from_scan;
    }
    else {
      resolved.num_corner_from_scan = 0.0
    }

    return resolved;
    }
};

module.exports = IterationStats;
