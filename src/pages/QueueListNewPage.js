import React, {Component} from 'react';
import {getCashQueues, getCashQueuesNumber, getCashGames} from '../services/InfoDao';
import {add, div, isEmptyObject, isStrNull, logMsg, mul, strNotNull, weiXinShare} from "../utils/utils";
import {Images, MarkDown} from '../components';
import '../css/queue_new.css';

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const HEIGHT = window.screen.height;
const WIDTH = window.screen.width;
const colorArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
const top_content = [{id: 9}, {id: 10}, {id: 7}, {id: 8}, {id: 5}, {id: 6}, {id: 3}, {id: 4}, {id: 1}, {id: 2}];
const circle_list = [1, 2, 3, 4, 5, 6, 7, 8];

export default class QueueListPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cash_games: [],
            cash_queues: [],
            all_cash_queues: [],
            cash_queue_members: [],
            cash_vip: {small_blind: '', big_blind: ""},
            high_limit: {}
        }

    }

    componentWillMount() {
        clearInterval(this.intervalId);
    }

    componentDidMount() {

        getCashGames(data => {
            logMsg("现金桌", data);
            this.setState({
                cash_games: data.items
            })
            this.getlist(data.items[0].id)
            this.intervalId = setInterval(() => {
                this.getlist(data.items[0].id)
            }, 5000)


        })

    };

    getlist = (id) => {
        getCashQueues({cash_game_id: id}, data => {

            let queues = data.ordinary_queues;
            let hight_limit = data.high_limit_queues;
            let vip = {small_blind: '', big_blind: ""};

            if (!isEmptyObject(hight_limit) && hight_limit.status) {
                queues.push(hight_limit);
            }
            logMsg('ordinary_queues', queues)


            let cash_queues1 = data.tables;
            let newTables = top_content.map(item => {
                cash_queues1.forEach(x => {
                    if (parseInt(x.table_no) === 11) {
                        vip = {small_blind: x.small_blind, big_blind: x.big_blind};
                    }
                    else if (parseInt(x.table_no) === item.id)
                        item.info = x
                })
                return item
            })
            let members = [];
            let valid = 0
            queues.forEach((item, index, arr) => {

                if (item.status === undefined || item.status) {
                    valid++
                    getCashQueuesNumber({cash_game_id: item.cash_game_id, cash_queue_id: item.id}, data2 => {

                        item.cash_items = data2.items
                        members.push(data2.items)

                        if (valid === members.length) {

                            this.setState({
                                cash_queue_members: arr
                            })
                        }
                    });
                }

            });


            this.setState({
                cash_queues: queues,
                all_cash_queues: newTables,
                cash_vip: vip,
                high_limit: hight_limit

            });

        });
    };

    getRandomColor = () => {
        let color = "";
        for (let i = 0; i < 6; i++) {
            color += colorArr[Math.floor(Math.random() * 15)];
        }
        if (color !== '4CB564' && color !== 'C14C33' && color !== '717171' && color !== '4A90E2'
            && color !== 'D8A655' && color !== '942CEF' && color !== '893505') {
            return `#${color}`
        } else {
            return this.getRandomColor();
        }
    };


    _color = (small_blind, big_blind) => {
        if (isStrNull(small_blind) || isStrNull(big_blind)) {
            return '#1C1E23'
        } else if (small_blind === 50 && big_blind === 100) {
            return '#4CB564'
        } else if (small_blind === 100 && big_blind === 200) {
            return '#C14C33'
        } else if (small_blind === 25 && big_blind === 50) {
            return '#717171'
        } else if (small_blind === 300 && big_blind === 600) {
            return '#4A90E2'
        } else if (small_blind === 1000 && big_blind === 2000) {
            return '#D8A655'
        } else if (small_blind === 2000 && big_blind === 4000) {
            return '#942CEF'
        } else if (small_blind === 5000 && big_blind === 10000) {
            return '#893505'
        }
    };


    get_cash = (small_blind, big_blind) => {
        if (isStrNull(small_blind) || isStrNull(big_blind)) {
            return ``
        } else if (small_blind >= 1000) {
            return `${small_blind / 1000}K/${big_blind / 1000}K`
        } else if (big_blind >= 1000) {
            return `${small_blind}/${big_blind / 1000}K`
        } else {
            return `${small_blind}/${big_blind}`
        }


    }

    getHeight = (float) => {
        return Number(mul(HEIGHT, float))
    };
    getWidth = (float) => {
        return Number(mul(WIDTH, float))
    };

    // getCircle = (length, status) => {
    //     if(length === 6){
    //         if (status) {
    //             return "div_6ths"
    //         } else {
    //             return "col-md-2 col-lg-2"
    //         }
    //     }
    //     if(length === 5){
    //         if (status) {
    //             return "col-md-2 col-lg-2"
    //         } else {
    //             return "div_5ths"
    //         }
    //     }else if (length === 4) {
    //         if (status) {
    //             return "div_5ths"
    //         } else {
    //             return "col-md-3 col-lg-3"
    //         }
    //     } else if (length === 3) {
    //         if (status) {
    //             return 'col-md-3 col-lg-3'
    //         } else {
    //             return "col-md-4 col-lg-4"
    //         }
    //     } else if (length === 2) {
    //         if (status) {
    //             return 'col-md-4 col-lg-4'
    //         } else {
    //             return "col-md-6 col-lg-6"
    //         }
    //
    //     } else if (length === 1) {
    //         if (status) {
    //             return 'col-md-6 col-lg-6'
    //         } else {
    //             return 'col-md-12'
    //         }
    //     } else {
    //         if (status) {
    //             return ''
    //         } else {
    //             return 'col-md-12'
    //         }
    //     }
    // }

    getCircle = (length, status) => {
        if (length === 6) {
            if (status) {
                return "div_6ths"
            } else {
                return "col-md-2 col-lg-2"
            }
        }
        if (length === 5) {
            if (status) {
                return "col-md-2 col-lg-2"
            } else {
                return "div_5ths"
            }
        } else if (length === 4) {
            if (status) {
                return "div_5ths"
            } else {
                return "col-md-3 col-lg-3"
            }
        } else if (length < 4) {
            return "col-md-3 col-lg-3"
        }
    }

    showSpan = (item) => {
        if (item === 1 || item === 5 || item === 10) {
            return "number_span_new"
        } else {
            return "number_span_hidden"
        }
    }

    render() {
        const {all_cash_queues, cash_queues, cash_queue_members, cash_games, cash_vip, high_limit} = this.state;
        let class_name = this.getCircle(cash_queues.length, high_limit.status);
        return (
            <div className="container-fluid queue_body_new">
                <div className="row" style={{height: '100%'}}>
                    <div className="col-sm-2 col-md-2 col-lg-2 left_div_new">
                        <img className="img-responsive center-block pukewang" src={Images.pukewang}/>
                        <div className="left_line"/>
                        <span className="left_span">TABLE &nbsp; PREVIEW</span>
                        <div className="left_line"/>

                        <div className="left_circle">
                            <div className="circle_vip_new" style={{
                                backgroundColor: this._color(cash_vip.small_blind, cash_vip.big_blind)
                            }}>
                                {strNotNull(cash_vip.small_blind) || strNotNull(cash_vip.big_blind) ? <span
                                        className="circle_span">{this.get_cash(cash_vip.small_blind, cash_vip.big_blind)}</span> :
                                    <span className="inner"/>}

                            </div>

                            <div className="circle_div_new">

                                {!isEmptyObject(all_cash_queues) && all_cash_queues.map((item, index, arr) => {
                                    return (
                                        <div className="circle_new" key={index}
                                             style={{
                                                 backgroundColor: item.info ? this._color(item.info.small_blind, item.info.big_blind) : this._color('', ''),
                                             }}>
                                            {item.info ? <span
                                                    className="circle_span">{this.get_cash(item.info.small_blind, item.info.big_blind)}</span> :
                                                <span className="inner"/>}

                                        </div>
                                    )
                                })}
                            </div>

                            <div className="left_line2" style={{marginTop: 20, marginBottom: 5}}/>
                            <span className="left_span2">NOTICE</span>
                            <div className="left_line3" style={{marginTop: 5, marginBottom: 10}}/>
                        </div>

                        <select id="dropdown" ref={(input) => this.menu = input}
                                onChange={() => {
                                    clearInterval(this.intervalId);
                                    this.getlist(this.menu.value)
                                    this.intervalId = setInterval(() => {
                                        this.getlist(this.menu.value)
                                    }, 5000)
                                    this.setState({
                                        cash_queue_members: []
                                    })


                                }}>
                            {cash_games.map((item, index) => {
                                return <option key={index} value={item.id}>{item.name}</option>
                            })}
                        </select>
                    </div>


                    <div className="col-sm-10 col-md-10 col-lg-10">

                        <div className="row" style={{height: '100%', marginRight: 0, marginLeft: 0}}>
                            <div className="col-md-12 col-lg-12 queue_bottom_new">
                                {!isEmptyObject(cash_queue_members) && cash_queue_members.map((item, index) => {
                                    const {small_blind, big_blind, buy_in} = item;
                                    return (
                                        <div className={`${class_name} item_div_new`} key={index}>
                                            {index === 0 ? null : <div className="list_div_new">
                                                <div className="span_line_1"/>
                                                <div className="number_div_left">
                                                    {list.map((item, item_index) => {
                                                        return <div className="number_div_new" key={item_index}>
                                                            <span className={this.showSpan(item)}
                                                                  key={index}>{item}</span>
                                                        </div>
                                                    })}
                                                </div>

                                            </div>}


                                            <div className="queue_new" key={index}>

                                                <div className="right_top_div">
                                                    {index === cash_queues.length - 1 && high_limit.status ?
                                                        <div className="cash_div_new" key={index}>
                                                            <div className="last_big_circle_new"/>
                                                        </div> : <div className="cash_div_new" key={index}>
                                                            <div className="big_circle_new">
                                                                {strNotNull(buy_in) ?
                                                                    <span
                                                                        className="big_money_span_new">{`${buy_in} (HKD)`}</span> : null}

                                                                <span
                                                                    className="big_circle_span_new">{this.get_cash(small_blind, big_blind)} NL</span>
                                                            </div>
                                                        </div>}


                                                    <div className="remarks">
                                                        <span className="remark_span">begin to 18:50</span>
                                                    </div>

                                                    <div className="span_line_n"/>
                                                    <div className="top_text_div">
                                                        {circle_list.map((item, index) => {
                                                            return <div className="circle_item" key={index}/>
                                                        })}
                                                    </div>
                                                </div>

                                                <div className="queue_number_div_new">
                                                    {item.cash_items && item.cash_items.map((member_item, member_index) => {
                                                        if (member_index < 11) {

                                                            return <div className="number_name_div_new"
                                                                        key={member_index}>
                                                <span
                                                    className={member_item.nickname.length >= 8 ? "name_span1_new" : "name_span_new"}
                                                    key={member_index}>{member_item.nickname}</span>
                                                            </div>
                                                        }
                                                    })}

                                                    <div style={{display: 'flex', flex: 1}}/>

                                                    <div className="bottom_text_div_new">

                                                        <span className="queue_all_new">{`Total Count：`}</span>
                                                        <span
                                                            className={item.cash_queue_members_count > 0 ? "queue_all_new_last" : "queue_all_new_last2"}>{item.cash_queue_members_count}</span>
                                                    </div>

                                                </div>

                                            </div>

                                        </div>
                                    )
                                })}

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }

}