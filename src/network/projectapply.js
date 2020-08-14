import ajaxRequest from './ajaxRequest'


//查询受理项目
export function GetLoanaccept() {
    return ajaxRequest({
        method: 'get',
        url: 'api/Project/GetLoanaccept',
    })
}

//查询部分信息
export function GetLoanInfo(lid) {
    return ajaxRequest({
        method: 'get',
        url: 'api/Project/GetLoanInfo',
        params:{lid:lid}
    })
}
//查询部分信息
export function SaveProjectandBorrower(ProBor) {
    return ajaxRequest({
        method: 'post',
        url: 'api/Project/SaveProjectandBorrower',
        data:JSON.stringify(ProBor)
    })
}



