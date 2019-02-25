import api from '../utils/api'
import {get,post} from '../utils/fetch'

export function getInfoDetail(body, resolved, reject) {
    get(api.info_detail(body),ret=>{
        resolved(ret.data)
    },reject)
}

export function getWeiXinSign(payload, resolve, reject) {
    post(api.weixin_js_sign, payload, ret => {
        resolve(ret.data);
    }, reject)
}
