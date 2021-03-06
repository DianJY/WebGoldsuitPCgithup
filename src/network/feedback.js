import ajaxRequest from './ajaxRequest'

export function gerFeedbackListService(pagenum, pagesize, obj) {
    return ajaxRequest({
        method: 'get',
        url: 'api/FeedbackMenage/getfeedbackList',
        params: {
            pagenum: pagenum,
            pagesize: pagesize,
            ftype: obj.fType,
            tdate: obj.fDateTime,
            tname: obj.UserName,
            tiphone: obj.LoginPhone,
        }
    })
}

// export function MoHuGetFeedBackListService(fType, fDateTime, UserName, LoginPhone, pagenum, pagesize) {
//     return ajaxRequest({
//         method: 'get',
//         url: 'api/FeedbackMenage/moguchaxunfeedback',
//         params: {
//             ftype: fType,
//             tdate: fDateTime,
//             tname: UserName,
//             tiphone: LoginPhone,
//             pagenum: pagenum,
//             pagesize: pagesize
//         }
//     })
// }
