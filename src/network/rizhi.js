import ajaxRequest from './ajaxRequest'

export function getlogInfoService(pagenum, pagesize,obj) {
    return ajaxRequest({
        method: 'get',
        url: 'api/logInfoMenage/getlogMangList',
        params: {
            pagenum: pagenum,
            pagesize: pagesize,
            eName:obj.czr,
            kaishidate: obj.czdateK,
            jieshudate: obj.czdateJ
        }
    })
}

// export function tiaojianService(pagenum, pagesize, czr, czdateK, czdateJ) {
//     return ajaxRequest({
//         method: 'get',
//         url: 'api/logInfoMenage/getmohuMangList',
//         params: {
//             pagenum: pagenum,
//             pagesize: pagesize,
//             eName: czr,
//             kaishidate: czdateK,
//             jieshudate: czdateJ
//         }
//     })
// }
