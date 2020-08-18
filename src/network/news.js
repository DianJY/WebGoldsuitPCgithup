import ajaxRequest from './ajaxRequest'

export function getNewsListservive(pagenum, pagesize) {
    return ajaxRequest({
        method: 'get',
        url: 'api/NewsMenage/getNewsList',
        params: {
            pagenum: pagenum,
            pagesize: pagesize
        }
    })
}


export function getByTypeAndTitleService(NewsType, NewsTitle, pagenum, pagesize) {
    return ajaxRequest({
        method: 'get',
        url: 'api/NewsMenage/getNewsByTypeOrTitle',
        params: {
            NewsType: NewsType,
            NewsTitle: NewsTitle,
            pagenum: pagenum,
            pagesize: pagesize
        }
    })
}



export function InsertNewsService(newsInfo) {
    return ajaxRequest({
        method: 'post',
        url: 'api/NewsMenage/InsertNewsList',
        data: newsInfo
    })
}


export function GetNewsByIdService(newsId) {
    return ajaxRequest({
        method: 'get',
        url: 'api/NewsMenage/getNewsListById',
        params: {
            newsId: newsId
        }
    })
}

