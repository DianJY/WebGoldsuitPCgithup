import ajaxRequest from './ajaxRequest'


export function deleteRolesQX(rId, roleid) {
    return ajaxRequest({
        method: 'get',
        url: 'api/RolesMenage/deleteroleQX',
        params: {
            rId: rId,
            roleid: roleid
        }
    })
}


export function getrolesTreeListService() {
    return ajaxRequest({
        method: 'get',
        url: 'api/RolesMenage/getroleTreeList',
    })
}


export function saverightsService(rId, midList) {
    return ajaxRequest({
        method: 'get',
        url: 'api/RolesMenage/saveShouQuan',
        params: {
            rId: rId,
            midList: midList
        }
    })
}



