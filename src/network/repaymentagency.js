import ajaxRequest from './ajaxRequest'

//查询待还投资人信息
export function GetProjectList(obj) {
    return ajaxRequest({
        method: 'get',
        url: 'api/Repaymentagency/GetProjectList',
        params: {
            pageIndex: obj.pageIndex,
            limit: obj.limit,
            pName:obj.pName
        }
    })
}

//申请还款
export function ApplicationRepayment(pId) {
    return ajaxRequest({
        method: 'get',
        url: 'api/Repaymentagency/ApplicationRepayment?pId='+pId,
    })
}

//查询是否已申请还款

export function GetRepaymentInfo(pId) {
    return ajaxRequest({
        method: 'get',
        url: 'api/Repaymentagency/GetRepaymentInfo?pId='+pId,
    })
}
// 查询驳回信息

export function GetRepayRejectList(pId) {
    return ajaxRequest({
        method: 'get',
        url: 'api/Repaymentagency/GetRepayRejectList?pId='+pId,
    })
}

//查询还款审批审核表
export function GetRepayApprovalList(pId) {
    return ajaxRequest({
        method: 'get',
        url: 'api/Repaymentagency/GetRepayApprovalList?pId='+pId,
    })
}

