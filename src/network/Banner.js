import ajaxRequest from './ajaxRequest'

//登录日志
export function getBannerListService(pagenum, pagesize, obj) {
    return ajaxRequest({
        method: 'get',
        url: 'api/BannerMenage/getBannerMangList',
        params: {
            pagenum: pagenum,
            pagesize: pagesize,
            bChannel: obj.bChannel,
            bTitle: obj.bTitle,         
        }
    })
}


export function UpdateBannerService(obj) {
    return ajaxRequest({
        method: 'get',
        url: 'api/BannerMenage/UPdateBannerMangList',
        params: {
            id: obj
        }
    })
}

export function UpdateBannerService1(obj) {
    return ajaxRequest({
        method: 'get',
        url: 'api/BannerMenage/UPdateBannerMangList1',
        params: {
            id: obj
        }
    })
}
