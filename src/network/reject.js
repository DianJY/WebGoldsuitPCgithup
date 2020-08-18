import ajaxRequest from './ajaxRequest'

// 驳回信息
export function RejectProjectInfo(obj) {
    return ajaxRequest({
        method: 'post',
        url: `api/Drafts/RejectProjectInfo`,
        data: JSON.stringify(obj)
    })
}

//查询驳回信息

export function GetRejEctList(pId) {
    return ajaxRequest({
        method: 'get',
        url: `api/Drafts/GetRejEctList`,
        params: { pId: pId }
    })
}
//查询审批审核日志
export function GetApprovalList(pId) {
    console.log(pId);
    return ajaxRequest({
        method: 'get',
        url: `api/Drafts/GetApprovalList`,
        params: { pId: pId }
    })
}

//项目审核
export function ApprovalapproveProject(obj) {
    return ajaxRequest({
        method: 'get',
        url: `api/Drafts/ApprovalapproveProject`,
        params: {
            pId: obj.pId,
            pState: obj.pState,
            eId:obj.eId,
            aOperation:obj.aOperation
        }
    })
}