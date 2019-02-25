import {getUserId, isEmptyObject} from "../utils/utils";

const api = {
    //内部测试
    dev: 'http://192.168.2.10:3000/v1/',
    //test分支用来发布版本  test_ci_at用来跑自动化测试
    test: 'http://test.pokerking_api.deshpro.com/v1',
    //production 用来发布正式生产环境
    production: 'http://pokerking_api.deshpro.com/v1',
    info_detail:info_detail,//获取热门资讯详情
    weixin_js_sign:'weixin_js_sign'

}



function info_detail(body){
    const {id} = body;
    return `infos/${id}`;
}


export default api