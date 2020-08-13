import ajaxRequest from './ajaxRequest'

export function getUserListService(pagenum, pagesize) {
    return ajaxRequest({
        method: 'get',
        url: 'api/UsersManagement/GetUsersList',
        params: {
            pagenum: pagenum,
            pagesize: pagesize
        }
    })
}

export function deleteUserService(id) {
    return ajaxRequest({
        method: 'get',
        url: 'api/UsersManagement/DeleteUsers',
        params: {
            id: id
        }
    })
}


export function getRolesListService() {
    return ajaxRequest({
        method: 'get',
        url: 'api/UsersManagement/GetRolesList',
    })
}

export function adduserListService(usersInfo) {
    return ajaxRequest({
        method: 'post',
        url: 'api/UsersManagement/InsertUsers',
        data: usersInfo
    })
}

export function GetUsersInfoById(id) {
    return ajaxRequest({
        method: 'get',
        url: 'api/UsersManagement/GetUserInfo',
        params: {
            id: id
        }
    })
}


