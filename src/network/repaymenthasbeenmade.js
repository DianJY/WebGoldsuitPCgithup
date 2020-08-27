import ajaxRequest from './ajaxRequest'

//查询需要审批的还款项目
export function GetRepaymentList(obj) {
    return ajaxRequest({
        method: 'get',
        url: 'api/Repaymentagency/GetRepaymentList',
        params: {
            pageIndex: obj.pageIndex,
            limit: obj.limit,
            i:obj.i,
        }
    })
}


//审批
export function ApprovalRepayment(obj) {
    return ajaxRequest({
        method: 'get',
        url: 'api/Repaymentagency/ApprovalRepayment',
        params: {
            rId: obj.rId,
            eId: obj.eId,
        }
    })
}


//驳回
export function RejectRepayment(repInfo) {
    return ajaxRequest({
        method: 'post',
        url: 'api/Repaymentagency/RejectRepayment',
       data:JSON.stringify(repInfo)
    })
}

//还款
export function Repayment(obj) {
    return ajaxRequest({
        method: 'get',
        url: `api/Repaymentagency/Repayment`,
        params: {
            rId:obj.rId,
            pId:obj.pId,
            eId:obj.eId
        }
    })
}
