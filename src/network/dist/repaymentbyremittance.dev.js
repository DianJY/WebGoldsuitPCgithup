"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetProjectList = GetProjectList;
exports.SaveProject = SaveProject;

var _ajaxRequest = _interopRequireDefault(require("./ajaxRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//查询需要审批的还款项目
function GetProjectList(obj) {
  return (0, _ajaxRequest["default"])({
    method: 'get',
    url: 'api/Transferrepayment/GetProjectList',
    params: {
      pageIndex: obj.pageIndex,
      limit: obj.limit
    }
  });
} //划账还款


function SaveProject(pId) {
  return (0, _ajaxRequest["default"])({
    method: 'get',
    url: 'api/Transferrepayment/SaveProject',
    params: {
      pId: pId
    }
  });
}