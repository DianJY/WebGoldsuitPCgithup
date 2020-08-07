import ajaxRequest from './ajaxRequest'

// 查询人员
<<<<<<< HEAD
export function getloginpwd(obj) {
    return ajaxRequest({
        method: 'post',
        url: `api/Documents/Getperson`,
        data: obj
=======
export function menusList(rId) {
    return ajaxRequest({
        method: 'get',
        url: `api/Sys_Row_Meun/GetSys_Row_Meun?rId=${rId}`,

>>>>>>> f4ba870b063936aa2259a73d7b6af294f32f31cc
    })
}

