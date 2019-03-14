import React, {Component} from 'react';
import {getCashQueues, getCashQueuesNumber, getCashGames} from '../services/InfoDao';
import {isEmptyObject, logMsg, mul, strNotNull, weiXinShare} from "../utils/utils";
import {Images, MarkDown} from '../components';
import '../css/home.css';

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const HEIGHT = window.screen.height;
const WIDTH = window.screen.width;

export default class EventDetail extends Component {


    constructor(props) {
        super(props);
        this.state = {
            cash_games: [],
            cash_queues: [],
            all_cash_queues: [],
            cash_queue_members: []
        }


    }

    componentWillMount() {
        clearInterval(this.intervalId);
    }

    componentDidMount() {

        getCashGames(data => {
            console.log("现金桌", data);
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
            console.log("cash_queues", data);
            let queues = data.items;
            let cash_queues1 = [];
            let members = [];
            queues.forEach((item, index, arr) => {

                getCashQueuesNumber({cash_game_id: item.cash_game_id, cash_queue_id: item.id}, data2 => {
                    logMsg("numbers", data2)
                    item.cash_items = data2.items
                    members.push(data2.items)
                    if (arr.length === members.length) {

                        let cash_queue_members = arr.map(x => x.cash_items);
                        this.setState({
                            cash_queue_members
                        })
                    }
                });
                for (let i = 0; i < item.table_numbers; i++) {
                    cash_queues1.push(item)
                }
            });

            this.setState({
                cash_queues: data.items,
                all_cash_queues: cash_queues1

            });

        });
    }


    _color = (small_blind, big_blind) => {
        if (small_blind === 50 && big_blind === 100) {
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
        if (small_blind >= 1000) {
            return `${small_blind / 1000}k/${big_blind / 1000}k`
        } else if (big_blind >= 1000) {
            return `${small_blind}/${big_blind / 1000}k`
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

    render() {
        const {all_cash_queues, cash_queues, cash_queue_members, cash_games} = this.state;
        logMsg("cash_queue_members", cash_queue_members);
        return (
            <div className="home_div">
                <div className="top_div" style={{height: this.getHeight(0.15), marginTop: this.getHeight(0.0463)}}>
                    <div className="top_div_content">

                        {!isEmptyObject(cash_queues) && cash_queues.map((item, index) => {
                            const {small_blind, big_blind, buy_in} = item;
                            return (
                                <div className="big_circle" key={index} style={{
                                    height: this.getHeight(0.089),
                                    width: this.getWidth(0.1083)
                                }}>
                                    {strNotNull(buy_in) ?
                                        <span className="big_money_span">{`${buy_in} (HKD)`}</span> : null}

                                    <span className="big_circle_span">{this.get_cash(small_blind, big_blind)}NL</span>
                                </div>
                            )
                        })}
                        <div className="big_circle_last" style={{
                            height: this.getHeight(0.089),
                            width: this.getWidth(0.1083)
                        }}>
                        </div>
                    </div>
                </div>
                <div className="left_div" style={{width: this.getWidth(0.13)}}>
                    <img className="pukewang_img" style={{
                        marginTop: this.getHeight(0.056),
                        height: this.getHeight(0.062),
                        width: this.getWidth(0.070)
                    }} src={Images.pukewang}/>
                    <div className="left_line"/>

                    <span className="left_span">LIVE PREVIEW</span>
                    <div className="left_line"/>

                    <div className="content_circle" style={{height: this.getHeight(0.463)}}>
                        <div className="circle_div">
                            {!isEmptyObject(all_cash_queues) && all_cash_queues.map((item, index) => {
                                const {small_blind, big_blind} = item;
                                return (
                                    <div className="circle" key={index}
                                         style={{
                                             height: this.getHeight(0.037),
                                             width: this.getWidth(0.044),
                                             backgroundColor: this._color(small_blind, big_blind),
                                             marginTop: this.getHeight(0.0167)
                                         }}>
                                        <span className="circle_span">{this.get_cash(small_blind, big_blind)}</span>
                                    </div>
                                )
                            })}
                        </div>
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

                <div className="queue_div" style={{marginTop: this.getHeight(0.0185)}}>
                    {!isEmptyObject(cash_queue_members) && cash_queue_members.map((item, index) => {
                        return (
                            <div className="queue_list" key={index}>
                                <div className="queue" style={{width: this.getWidth(0.1083)}} key={index}>
                                    <span className="text1">{item.length}</span>
                                    <div className="queue_number_div"
                                         style={{width: this.getWidth(0.1083)}}>
                                        {item.map((member_item, member_index) => {
                                            if (member_index < 11) {
                                                return <span className="name_span"
                                                             key={member_index}>{member_item.nickname}</span>
                                            }
                                        })}
                                    </div>
                                </div>
                                <div className="list_div">
                                    {list.map((item, index) => {
                                        return <span className="number_span" key={index}>{item}</span>
                                    })}
                                </div>
                            </div>
                        )
                    })}
                    <div className="queue_list">
                        <div className="queue" style={{width: this.getWidth(0.1083)}}>
                            <span className="text1">{0}</span>
                            <div className="queue_number_div"
                                 style={{width: this.getWidth(0.1083)}}/>
                        </div>
                        <div className="list_div"/>
                    </div>
                </div>
            </div>
        )
    }
}