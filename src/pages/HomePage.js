import React, {Component} from 'react';
import {getCashQueues} from '../services/InfoDao';
import {isEmptyObject, strNotNull, weiXinShare} from "../utils/utils";
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

export default class EventDetail extends Component {


    constructor(props) {
        super(props);
        this.state = {
            cash_queues: [],
            all_cash_queues: []
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

    }

    render() {
        const {all_cash_queues,cash_queues} = this.state;

        return (
            <div className="home_div">
                <div className="top_div">
                    <div style={{width:223}}/>
                    {cash_queues.map((item,index)=>{
                        const {small_blind, big_blind} = item;
                        return(
                            <div className="big_circle" key={index}>
                                <span className="big_money_span">{`5K ～ 30K (HKD)`}</span>
                                <span className="big_circle_span">{`${small_blind}/${big_blind}`}</span>
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
            </div>
        )
    }
}