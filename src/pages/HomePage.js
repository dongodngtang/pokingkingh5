import React, {Component} from 'react';
import {getCashQueues, getCashQueuesNumber} from '../services/InfoDao';
import {isEmptyObject, mul, strNotNull, weiXinShare} from "../utils/utils";
import {Images, MarkDown} from '../components';
import '../css/home.css';

const queues = [{
    big_blind: 100,
    buy_in: '',
    cash_game_id: 2,
    cash_queue_members_count: 0,
    created_at: 1550220955,
    id: 2,
    small_blind: 50,
    table_no: "",
    table_numbers: 3
},
    {
        big_blind: 200,
        buy_in: '',
        cash_game_id: 2,
        cash_queue_members_count: 3,
        created_at: 1550220963,
        id: 3,
        small_blind: 100,
        table_no: "",
        table_numbers: 2
    },
    {
        big_blind: 400,
        buy_in: '',
        cash_game_id: 2,
        cash_queue_members_count: 0,
        created_at: 1550220931,
        id: 1,
        small_blind: 200,
        table_no: "",
        table_numbers: 4
    }];
let members = [[{
    big_blind: 200,
    canceled: false,
    cash_queue_id: 3,
    created_at: 1550567345,
    id: 3,
    isSelect: true,
    nickname: "Lorne",
    small_blind: 100,
    table_numbers: 2
}, {
    big_blind: 200,
    canceled: false,
    cash_queue_id: 3,
    created_at: 1550567330,
    id: 2,
    isSelect: false,
    nickname: "Millie",
    small_blind: 100,
    table_numbers: 2
}, {
    big_blind: 200,
    canceled: false,
    cash_queue_id: 3,
    created_at: 1550543053,
    id: 1,
    isSelect: false,
    nickname: "Ricky",
    small_blind: 100,
    table_numbers: 2
}], [], []];
const list = [1,2,3,4,5,6,7,8,9,10,11];

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
        let cash_queues1 = [];
        queues.forEach(item => {
            for (let i = 0; i < item.table_numbers; i++) {
                cash_queues1.push(item)
            }
        });
        this.setState({
            cash_queues: queues,
            all_cash_queues: cash_queues1
        });
        // getCashQueues({cash_game_id: id}, data => {
        //     console.log("cash_queues", data);
        //     this.setState({
        //         cash_queues: data.items
        //     });
        // });
        queues.forEach(item => {
            this.getQueueMembers(item.cash_game_id, item.id)
        })

    }

    getQueueMembers = (cash_game_id, id) => {
        // getCashQueuesNumber({cash_game_id: cash_game_id, cash_queue_id: id}, data => {
        //     console.log("cash_queue_members", data);
        //     members.push(data.items);
        //     this.setState({
        //         cash_queue_members: members
        //     })
        // })
        this.setState({
            cash_queue_members: members
        })

    }

    render() {
        const {all_cash_queues, cash_queues, cash_queue_members} = this.state;
        console.log("fjskdls", window.screen.height)
        return (
            <div className="home_div">
                <div className="top_div">
                    <div style={{width: 223}}/>
                    {cash_queues.map((item, index) => {
                        const {small_blind, big_blind} = item;
                        return (
                            <div className="big_circle" key={index}>
                                <span className="big_money_span">{`5K ～ 30K (HKD)`}</span>
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
                        {all_cash_queues.map((item, index) => {
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
                    {cash_queue_members.map((item, index) => {
                        return (
                            <div className="queue_list">
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
                                {index === cash_queue_members.length -1 ? null : <div className="list_div">
                                    {list.map((item,index)=>{
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