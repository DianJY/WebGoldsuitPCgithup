import ajaxRequest from './ajaxRequest'

//查询项目状态数据
export function GetListRemit(obj) {
    return ajaxRequest({
        method: 'get',
        url: 'api/Depositmanagement/GetListRemit',
        params: {
            pageIndex: obj.pageIndex,
            limit: obj.limit,
            State: obj.State
        }
    })
}

//查询项目状态数据
export function GetRemitInfo(pId) {
    return ajaxRequest({
        method: 'get',
        url: 'api/Depositmanagement/GetRemitInfo?pId='+pId,
    })
}
//查询项目状态数据
export function SaveRemit(reInfo) {
    return ajaxRequest({
        method: 'post',
        url: 'api/Depositmanagement/SaveRemit',
        data:JSON.stringify(reInfo)
    })
}
//查询划账
export function GetRemitList(obj) {
    return ajaxRequest({
        method: 'get',
        url: 'api/Depositmanagement/GetRemitList',
        params:{
            pageIndex:obj.pageIndex,
            limit:obj.limit
        }
    })
}

//驳回
export function RejectRemit(RejApp) {
    return ajaxRequest({
        method: 'post',
        url: 'api/Depositmanagement/RejectRemit',
        data:JSON.stringify(RejApp)
    })
}
//查询驳回信息
export function GetRemitRejectList(pId) {
    return ajaxRequest({
        method: 'get',
        url: 'api/Depositmanagement/GetRemitRejectList?pId='+pId,
    })
}

//查询审核日志
export function GetRemitjournalList(pId) {
    return ajaxRequest({
        method: 'get',
        url: 'api/Depositmanagement/GetRemitjournalList?pId='+pId,
    })
}

//审批
export function SubmitRemit(rId,eId) {
    return ajaxRequest({
        method: 'get',
        url: `api/Depositmanagement/SubmitRemit?rId=${rId}&eId=${eId}`,
    })
}

//查询划账一些基本信息

export function GetProjectInfo(pId) {
    return ajaxRequest({
        method: 'get',
        url: 'api/Depositmanagement/GetProjectInfo?pId='+pId,
    })
}

//划账
export function TransferProject(obj) {
    return ajaxRequest({
        method: 'get',
        url: `api/Depositmanagement/TransferProject?rId=${obj.rId}&&eId=${obj.eId}`,
    })
}
