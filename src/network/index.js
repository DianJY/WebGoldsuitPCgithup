import ajaxRequest from './ajaxRequest'

// 查询人员
export function GetpersonList() {
    return ajaxRequest({
        method: 'get',
        url: `api/Documents/Getperson`
    })
}

