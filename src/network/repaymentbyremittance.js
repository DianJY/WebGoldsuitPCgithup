import ajaxRequest from './ajaxRequest'

//查询需要审批的还款项目
export function GetProjectList(obj) {
    return ajaxRequest({
        method: 'get',
        url: 'api/Transferrepayment/GetProjectList',
        params: {
            pageIndex: obj.pageIndex,
            limit: obj.limit,
        }
    })
}

//划账还款
export function SaveProject(pId) {
    return ajaxRequest({
        method: 'get',
        url: 'api/Transferrepayment/SaveProject',
        params: {
            pId:pId
        }
    })
}