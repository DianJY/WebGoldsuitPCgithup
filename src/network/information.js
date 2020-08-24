import ajaxRequest from './ajaxRequest'

export function getinforListService(pagenum, pagesize) {
    return ajaxRequest({
        method: 'get',
        url: 'api/inforMenage/getinforList',
        params: {
            pagenum: pagenum,
            pagesize: pagesize
        }
    })
}

export function editInforListByIdSerVice(InforInfo) {
    return ajaxRequest({
        method: 'post',
        url: 'api/inforMenage/editInforList',
        data: InforInfo
    })
}
