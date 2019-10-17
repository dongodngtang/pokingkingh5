/**
 *作者：lorne
 *时间：2019/5/9
 *功能：
 */

import React, {Component} from 'react';
import '../css/marquee.css'

export default class Marquee extends Component {

  state = {
    canLoop: false
  }

  componentDidMount() {

    console.log('路上看见的房',this.box.offsetWidth,this.marquee.offsetWidth)
    if(this.box.offsetWidth-10<this.marquee.offsetWidth){
      this.setState({
        canLoop:true
      })
    }
  }

  render() {
    return <div ref={ref=>this.box = ref} className={`box ${this.props.boxClass}`}
                style={this.props.boxStyle?this.props.boxStyle:{}}>
      <span ref={ref=>this.marquee=ref}
            className={`${this.state.canLoop?'animate':''} ${this.props.textClass}`}>{this.props.text}</span>
    </div>
  }
}
