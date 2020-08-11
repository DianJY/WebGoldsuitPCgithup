import ajaxRequest from './ajaxRequest'

export function getUserListService(params) {
    return ajaxRequest({
        method: 'get',
        url: 'api/UsersManagement/GetUsersList',
        params
    })
}
