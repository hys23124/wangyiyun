import React, { Component } from 'react';
// 引入封装好的接口
import {personalized} from '../util/axios'

// import { Switch, Route, Link } from 'react-router-dom'

// 引入静态图片
// import img1 from '../assets/images/1.jpg'

// 引入css样式
import '../assets/css/recommend.css'
class Recommend extends Component {
    constructor() {
        super();
        this.state = {
            songList: []
        }
    }
    // 组件挂载完成
    componentDidMount(){
        this.getPerson();
    }
    // 封装一个获取推荐歌单的方法
    getPerson(){
        personalized({
            limit:6
        })
        .then(res=>{
            // console.log(res,'推荐歌单');
            if(res.code==200){
                this.setState({
                    songList: res.result
                })
            }
        })
    }
    // 跳转到列表页
    goList(id) {
        console.log(this.props, '实现跳转');
        this.props.history.push('/list/'+id)
    }
    render() {
        const { songList } = this.state
        return (
            <div className='recommend'>
                <h2>推荐歌单</h2>
                <ul className='recinfo'>
                    {/* 通过路由导航跳转 */}
                    {/* {
                        songList.map(item => {
                            return <Link to={'/list/'+item.id} key={item.id}>
                                <li>
                                    <img src={item.img} alt="" />
                                    <p>{item.title}</p>
                                </li>
                            </Link>
                        })
                    } */}
                    {/* 通过编程式导航跳转 */}
                    {songList.map(item => {
                        return <li className='reclist' onClick={this.goList.bind(this,item.id)} key={item.id}>
                            <img src={item.picUrl} alt="" />
                            <p>{item.name}</p>
                        </li>
                    })}
                </ul>
            </div>
        )
    }
}
export default Recommend