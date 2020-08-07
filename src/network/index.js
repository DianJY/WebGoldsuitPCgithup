import ajaxRequest from './ajaxRequest'

// 查询人员
export function menusList(rId) {
    return ajaxRequest({
        method: 'get',
        url: `api/Sys_Row_Meun/GetSys_Row_Meun?rId=${rId}`

    })
}



