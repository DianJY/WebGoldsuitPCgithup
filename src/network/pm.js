import ajaxRequest from './ajaxRequest'

//查询项目状态数据
export function GetListDrafts(obj) {
    return ajaxRequest({
        method: 'get',
        url: 'api/PmManagement/GetListDrafts',
        params: {
            pageIndex: obj.pageIndex,
            limit: obj.limit,
            State: obj.State
        }
    })
}

//查询详细中的投资人
export function GetInvestmentList(obj) {
    return ajaxRequest({
        method: 'get',
        url: 'api/PmManagement/GetInvestmentList',
        params: {
            pId: obj.pId,
            pageIndex: obj.pageIndex,
            limit: obj.limit

        }
    })
}


//查询详细中的划账信息
export function GetRemitList(obj) {
    return ajaxRequest({
        method: 'get',
        url: 'api/PmManagement/GetRemitList',
        params: {
            pId: obj.pId,
            pageIndex: obj.pageIndex,
            limit: obj.limit

        }
    })
}
//还款信息
export function GetRepaymentInfo(obj) {
    return ajaxRequest({
        method: 'get',
        url: 'api/PmManagement/GetRepaymentInfo',
        params: {
            pId: obj.pId,
            pageIndex: obj.pageIndex,
            limit: obj.limit

        }
    })
}
//发布
export function PutProject(pId) {
    return ajaxRequest({
        method: 'put',
        url: 'api/PmManagement/PutProject',
        params: {pId}
    })
}


