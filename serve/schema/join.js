const mongoose = require('mongoose')
const { Schema } = mongoose
/**
 * 纳新表
 */
const join = new Schema({

  /**
   * 学号
   * 姓名
   * 性别
   * 专业
   * 手机号
   * QQ
   * 电子邮箱
   * 意向小组
   * 意向部门
   * 简短文字描述
   * 面试进度
   * 面试场次
   */

  sId: {
    default: "",
    type: String
  },
  sName: {
    default: "",
    type: String
  },
  sex: {
    default: "male",
    type: String
  },
  sMajor: {
    default: "",
    type: String
  },
  sPhone: {
    default: "",
    type: String
  },
  sQQ: {
    default: "",
    type: String
  },
  sEmail: {
    default: "",
    type: String
  },
  sGroup: {
    default: "",
    type: String
  },
  sDepartment: {
    default: "",
    type: String
  },
  w3review: {
    default: "",
    type: String
  },
  status: {
    default: "",
    type: String
  },
  interview: {
    default: "2022",
    type: String
  }


})

const joinModel = mongoose.model('join', join)

module.exports = {
  joinModel
}