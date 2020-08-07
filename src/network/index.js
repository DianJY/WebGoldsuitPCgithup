import ajaxRequest from './ajaxRequest'

// 查询人员
export function getloginpwd(obj) {
    return ajaxRequest({
        method: 'post',
        url: `api/Documents/Getperson`,
        data: obj
    })
}

