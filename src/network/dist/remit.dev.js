"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetListRemit = GetListRemit;
exports.GetRemitInfo = GetRemitInfo;
exports.SaveRemit = SaveRemit;
exports.GetRemitList = GetRemitList;
exports.RejectRemit = RejectRemit;
exports.GetRemitRejectList = GetRemitRejectList;
exports.GetRemitjournalList = GetRemitjournalList;
exports.SubmitRemit = SubmitRemit;
exports.GetProjectInfo = GetProjectInfo;
exports.TransferProject = TransferProject;

var _ajaxRequest = _interopRequireDefault(require("./ajaxRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//查询项目状态数据
function GetListRemit(obj) {
  return (0, _ajaxRequest["default"])({
    method: 'get',
    url: 'api/Depositmanagement/GetListRemit',
    params: {
      pageIndex: obj.pageIndex,
      limit: obj.limit,
      State: obj.State
    }
  });
} //查询项目状态数据


function GetRemitInfo(pId) {
  return (0, _ajaxRequest["default"])({
    method: 'get',
    url: 'api/Depositmanagement/GetRemitInfo?pId=' + pId
  });
} //查询项目状态数据


function SaveRemit(reInfo) {
  return (0, _ajaxRequest["default"])({
    method: 'post',
    url: 'api/Depositmanagement/SaveRemit',
    data: JSON.stringify(reInfo)
  });
} //查询划账


function GetRemitList(obj) {
  return (0, _ajaxRequest["default"])({
    method: 'get',
    url: 'api/Depositmanagement/GetRemitList',
    params: {
      pageIndex: obj.pageIndex,
      limit: obj.limit
    }
  });
} //驳回


function RejectRemit(RejApp) {
  return (0, _ajaxRequest["default"])({
    method: 'post',
    url: 'api/Depositmanagement/RejectRemit',
    data: JSON.stringify(RejApp)
  });
} //查询驳回信息


function GetRemitRejectList(pId) {
  return (0, _ajaxRequest["default"])({
    method: 'get',
    url: 'api/Depositmanagement/GetRemitRejectList?pId=' + pId
  });
} //查询审核日志


function GetRemitjournalList(pId) {
  return (0, _ajaxRequest["default"])({
    method: 'get',
    url: 'api/Depositmanagement/GetRemitjournalList?pId=' + pId
  });
} //审批


function SubmitRemit(rId, eId) {
  return (0, _ajaxRequest["default"])({
    method: 'get',
    url: "api/Depositmanagement/SubmitRemit?rId=".concat(rId, "&eId=").concat(eId)
  });
} //查询划账一些基本信息


function GetProjectInfo(pId) {
  return (0, _ajaxRequest["default"])({
    method: 'get',
    url: 'api/Depositmanagement/GetProjectInfo?pId=' + pId
  });
} //划账


function TransferProject(obj) {
  return (0, _ajaxRequest["default"])({
    method: 'get',
    url: "api/Depositmanagement/TransferProject?rId=".concat(obj.rId, "&&eId=").concat(obj.eId)
  });
}