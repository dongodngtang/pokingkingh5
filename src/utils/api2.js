import {logMsg} from "./utils";

const api2 = {
    //内部测试
    dev: 'http://192.168.2.10:3000/v2/',
    //test分支用来发布版本  test_ci_at用来跑自动化测试
    test: 'http://test.pokerking_api.deshpro.com/v2',
    //production 用来发布正式生产环境
    production: 'http://api.pokerkinglive.com/v2',
    cash_queues:cash_queues,//现金桌排队进程列表

}

function cash_queues(body){
    const {cash_game_id} = body;
    return `cash_games/${cash_game_id}/cash_queues`;
}

export default api2