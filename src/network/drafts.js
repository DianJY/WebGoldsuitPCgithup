import ajaxRequest from './ajaxRequest'

// 查询项目
export function GetprojectList(obj) {
    return ajaxRequest({
        method: 'get',
        url: `api/Drafts/GetListDrafts`,
        params: {
            pageIndex: obj.pageIndex,
            limit: obj.limit,
            eId: obj.eId,
            IfSelect:obj.IfSelect,
            State:obj.State
        }
    })
}
// 查询项目
export function GetprojectListex(obj) {
    return ajaxRequest({
        method: 'get',
        url: `api/Drafts/GetListDrafts`,
        params: {
            pageIndex: obj.pageIndex,
            limit: obj.limit,
            pName:obj.pName
        }
    })
}
// 查询项目信息
export function GetProjectInfo(pId) {
    return ajaxRequest({
        method: 'get',
        url: `api/Drafts/GetProjectInfo`,
        params: {
            pId

        }
    })
}
// 编辑保存项目信息
export function SaveProjectInfo(pInfo) {

    return ajaxRequest({
        method: 'post',
        url: `api/Drafts/SaveProjectInfo`,
        data: JSON.stringify(pInfo)
    })
}

//提交&放弃

export function SubmitStateProject(obj) {
    return ajaxRequest({
        method: 'get',
        url: `api/Drafts/SubmitStateProject`,
        params: {
            pId:obj.pId,
            IfState:obj.IfState
        }
    })
}





