import ajaxRequest from './ajaxRequest'

//登录日志
export function getlogInfoService(pagenum, pagesize, obj) {
    return ajaxRequest({
        method: 'get',
        url: 'api/logInfoMenage/getlogMangList',
        params: {
            pagenum: pagenum,
            pagesize: pagesize,
            eName: obj.czr,
            kaishidate: obj.czdateK,
            jieshudate: obj.czdateJ
        }
    })
}

//还款日志
export function getReimbursementInfoService(pagenum, pagesize, obj) {
    return ajaxRequest({
        method: 'get',
        url: 'api/logInfoMenage/getReimbursementMangList',
        params: {
            pagenum: pagenum,
            pagesize: pagesize,
            eName: obj.czr,
            kaishidate: obj.czdateK,
            jieshudate: obj.czdateJ
        }
    })
}

//划账日志
export function getDepositInfoService(pagenum, pagesize, obj) {
    return ajaxRequest({
        method: 'get',
        url: 'api/logInfoMenage/getDepositMangList',
        params: {
            pagenum: pagenum,
            pagesize: pagesize,
            eName: obj.czr,
            kaishidate: obj.czdateK,
            jieshudate: obj.czdateJ
        }
    })
}

//还款详情
export function getRepaymentesService(pagenum1, pagesize1, rids) {
  
    return ajaxRequest({
        method: 'get',
        url: 'api/logInfoMenage/getRepaymentesList',
        params: {
            pagenum1: pagenum1,
            pagesize1: pagesize1,
            rId: rids
        }
    })
}
