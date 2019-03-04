import React, {Component} from 'react';
import {getCashQueues, getCashQueuesNumber} from '../services/InfoDao';
import {isEmptyObject, logMsg, mul, strNotNull, weiXinShare} from "../utils/utils";
import {Images, MarkDown} from '../components';
import '../css/home.css';

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export default class EventDetail extends Component {


    constructor(props) {
        super(props);
        this.state = {
            cash_queues: [],
            all_cash_queues: [],
            cash_queue_members: []
        }


    }


    componentDidMount() {
        const {id} = this.props.match.params;

        getCashQueues({cash_game_id: id}, data => {
            console.log("cash_queues", data);
            let queues= data.items;
            let cash_queues1 = [];
            let members = [];
            queues.forEach((item,index,arr) => {

                getCashQueuesNumber({cash_game_id: item.cash_game_id, cash_queue_id: item.id}, data2 => {
                    console.log("cash_queue_members", data2);
                    item.cash_items = data2.items
                    members.push(data2.items)
                    if(arr.length === members.length){

                        let cash_queue_members =arr.map(x=>x.cash_items)
                        this.setState({
                            cash_queue_members
                        })
                        logMsg('史蒂夫',cash_queue_members)
                    }
                });
                for (let i = 0; i < item.table_numbers; i++) {
                    cash_queues1.push(item)
                }
            });

            this.setState({
                cash_queues: data.items,
                all_cash_queues: cash_queues1,

            });

        });

    }

    render() {
        const {all_cash_queues, cash_queues, cash_queue_members} = this.state;
        console.log("cash_queue_members",cash_queue_members)
        return (
            <div className="home_div">
                <div className="top_div">
                    <div style={{width: 223}}/>
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

                    <div className="circle_div">
                        {!isEmptyObject(all_cash_queues) && all_cash_queues.map((item, index) => {
                            const {small_blind, big_blind} = item;
                            return (
                                <div className="circle" key={index}>
                                    <span className="circle_span">{`${small_blind}/${big_blind}`}</span>
                                </div>
                            )
                        })}
                    </div>
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
                                            return <span className="name_span"
                                                         key={member_index}>{member_item.nickname}</span>
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
                </div>
            </div>
        )
    }
}