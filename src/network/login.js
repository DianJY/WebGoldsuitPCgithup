import ajaxRequest from './ajaxRequest'


//登录
export function getloginpwd(obj) {
    return ajaxRequest({
        method: 'get',
        url: `api/AdminLogin/Login`,
        params:{
            eLogin:obj.username,
            ePwd:obj.password
        }
    })
}
