import React, {Component} from 'react';
import {getCashQueues, getCashQueuesNumber, getCashGames} from '../services/InfoDao';
import {isEmptyObject, logMsg, mul, strNotNull, weiXinShare} from "../utils/utils";
import {Images, MarkDown} from '../components';
import '../css/home.css';

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

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
    componentWillMount(){
        clearInterval(this.intervalId);
    }

    componentDidMount() {

        getCashGames(data => {
            console.log("现金桌", data);
            this.setState({
                cash_games: data.items
            })
            this.getlist(data.items[0].id)
            this.intervalId = setInterval(()=>{
                this.getlist(data.items[0].id)
            },5000)


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
                    logMsg("numbers",data2)
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
        }else if (small_blind === 1000 && big_blind === 2000) {
            return '#D8A655'
        }else if (small_blind === 2000 && big_blind === 4000) {
            return '#942CEF'
        }else if (small_blind === 5000 && big_blind === 10000) {
            return '#893505'
        }
    };

    render() {
        const {all_cash_queues, cash_queues, cash_queue_members, cash_games} = this.state;
        logMsg("cash_queue_members",cash_queue_members)
        console.log("height",window.screen.height )
        console.log("width",window.screen.width )
        return (
            <div className="home_div">
                <div className="top_div" style={{height:Number(mul(window.screen.height,0.14))}}>
                    <div className='top1'/>
                    {!isEmptyObject(cash_queues) && cash_queues.map((item, index) => {
                        const {small_blind, big_blind, buy_in} = item;
                        return (
                            <div className="big_circle" key={index}>
                                {strNotNull(buy_in) ?
                                    <span className="big_money_span">{`${buy_in} (HKD)`}</span> : null}

                                <span className="big_circle_span">{`${small_blind}/${big_blind}`}NL</span>
                            </div>
                        )
                    })}
                    <div className="big_circle_last">
                    </div>
                </div>
                <div className="left_div">
                    <img className="pukewang_img" src={Images.pukewang}/>
                    <div className="left_line"/>

                    <span className="left_span">LIVE PREVIEW</span>
                    <div className="left_line"/>

                    <div className="content_circle">
                        <div className="circle_div">
                            {!isEmptyObject(all_cash_queues) && all_cash_queues.map((item, index) => {
                                const {small_blind, big_blind} = item;
                                return (
                                    <div className="circle" key={index}
                                         style={{backgroundColor: this._color(small_blind, big_blind)}}>
                                        <span className="circle_span">{`${small_blind}/${big_blind}`}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <select id="dropdown" ref={(input) => this.menu = input}
                            onChange={() => {
                                clearInterval(this.intervalId);
                                this.getlist(this.menu.value)
                                this.intervalId = setInterval(()=>{
                                    this.getlist(this.menu.value)
                                },5000)
                                this.setState({
                                    cash_queue_members:[]
                                })


                            }}>
                        {cash_games.map((item, index) => {
                            return <option key={index} value={item.id}>{item.name}</option>
                        })}
                    </select>

                </div>

                <div className="queue_div">
                    {!isEmptyObject(cash_queue_members) && cash_queue_members.map((item, index) => {
                        return (
                            <div className="queue_list" key={index}>
                                <div className="queue" key={index}>
                                    <span className="text1">{item.length}</span>
                                    <div className="queue_number_div"
                                         style={{height: Number(mul(window.screen.height, 0.648))}}>
                                        {item.map((member_item, member_index) => {
                                            if(member_index < 11){
                                                return <span className="name_span"
                                                             key={member_index}>{member_item.nickname}</span>
                                            }
                                        })}
                                    </div>
                                </div>
                                {index === cash_queue_members.length - 1 ? null : <div className="list_div">
                                    {list.map((item, index) => {
                                        return <span className="number_span" key={index}>{item}</span>
                                    })}
                                </div>}
                            </div>
                        )
                    })}
                    <div className="queue_number_div last_div"/>
                </div>
            </div>
        )
    }
}