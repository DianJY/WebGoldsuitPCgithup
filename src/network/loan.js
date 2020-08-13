import ajaxRequest from './ajaxRequest'

// 查询借款申请
export function LoanList(obj) {
    return ajaxRequest({
        method: 'get',
        url: `api/Loan/GetLoanList`,
        params:{
            zt:obj.zt,
            pageIndex:obj.pageIndex,
            limit:obj.limit,
            UserName:obj.UserName
        }

    })
}

// 受理
export function UpdateState(lid) {
    return ajaxRequest({
        method: 'put',
        url: `api/Loan/ModifyState`,
        params:{
            lid
        }

    })
}


