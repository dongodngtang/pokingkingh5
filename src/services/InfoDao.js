import api from '../utils/api'
import {get,post} from '../utils/fetch'

export function getInfoDetail(body, resolved, reject) {
    get(api.info_detail(body),{},ret=>{
        resolved(ret.data)
    },reject)
}

export function getWeiXinSign(payload, resolve, reject) {
    post(api.weixin_js_sign, payload, ret => {
        resolve(ret.data);
    }, reject)
}
/*获取主赛的新闻详情*/
export function getEventDetail(body,resolve, reject) {
    get(api.event_detail(body),{},ret=>{
        resolve(ret.data)
    },reject)
}

/*现金桌排队进程列表*/
export function getCashQueues(body,resolve, reject) {
    get(api.cash_queues(body), {}, ret => {
        resolve(ret.data)
    }, reject)
}