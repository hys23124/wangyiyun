import React, { Component } from 'react';
// 引入封装好的接口
import {hotList} from '../util/axios'

// 引入静态图片
import img1 from '../assets/images/1.png'

import { Link } from 'react-router-dom'

import '../assets/css/hotrank.css'
class HotRank extends Component {
    constructor() {
        super();
        this.state = {
            hotList: []
        }
    }
    // 组件挂载
    componentDidMount(){
        this.getHotList();
    }
    // 封装一个获取热门榜单的接口
    getHotList(){
        hotList()
        .then(res=>{
            console.log(res,'热门榜单');
            if(res.code==200){
                this.setState({
                    hotList:res.playlist.tracks.filter((item,i)=>i<20)
                })
            }
        })
    }
    // 跳转播放页
    goPlay(id) {
        this.props.history.push('/play?id='+id)
        // 通过state跳转
        // this.props.history.push({
        //     pathname: '/play',
        //     state:{
        //         id
        //     }
        // })
    }
    render() {
        const { hotList } = this.state
        return (
            <div className='hotlist'>
                <img src={img1} alt=""/>
                <ul>
                    {/* 路由导航跳转 */}
                    {/* {hotList.map(item => {
                        return <Link to={'/play?id='+item.id+'&name='+item.songname} key={item.id}>
                            <li>{item.songname}</li>
                        </Link>
                    })} */}
                    {/* 编程式导航跳转 */}
                    {hotList.map((item,idx) => {
                        return <li onClick={this.goPlay.bind(this,item.id)} key={item.id}>
                            <div className="left">{idx+1}</div>
                            <div className="right">{item.name}</div>
                        </li>
                    })}
                </ul>
            </div>
        )
    }
}
export default HotRank