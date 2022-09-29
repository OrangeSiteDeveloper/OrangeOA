<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
@import "http://icon.nosdn.127.net/08e8118b045492b809a050f3c85b1441.css";
* {
  /* border: solid black 1px; */
  margin: 0;
  padding: 0;
}
html,
body,
#app,
.el-container {
  height: 99.9%;
}
.el-header {
  background-color: #f7fafc;
  height: 90px !important;
  text-align: right; 
  line-height: 90px !important;
}
.el-main,
.el-footer {
  background-color: #f8f9fe;
}
.el-header {
  border-bottom: 1px solid #e9ecef !important;
}
.el-footer {
  border-top: 1px solid #e9ecef !important;
}
.el-header,
.el-footer {
  line-height: 60px;
}
.from-button {
  text-align: center;
}
.el-dialog, .el-card, .el-message-box {
  border-radius: 10px !important;
}
.el-input__inner {
  border-radius: 7px !important;
}
.box-card {
  margin-top: 10px;
}
</style>