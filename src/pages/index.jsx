import React,{Component} from 'react';
// 引入路由的相关组件
import {Switch,Route,Redirect,NavLink} from 'react-router-dom'
// 引入二级路由组件
import Search from '../views/search'
import HotRank from '../views/hotRank'
import Recommend from '../views/recommend'

import '../assets/css/index.css'
class Index extends Component {
    render() {
        return (
            <div className='index'>
                {/* 头部标题 */}
                <div className="header">
                    <h1>网易云音乐</h1>
                </div>
                {/* 二级路由导航 */}
                <div className="nav">
                    <NavLink to="/index/recommend" activeClassName="active">推荐音乐</NavLink>
                    <NavLink to="/index/hotrank" activeClassName="active">热歌榜</NavLink>
                    <NavLink to="/index/search" activeClassName="active">搜索</NavLink>
                </div>
                {/* 二级路由出口 */}
                <Switch>
                    <Route path="/index/recommend" component={Recommend}></Route>
                    <Route path="/index/hotrank" component={HotRank}></Route>
                    <Route path="/index/search" component={Search}></Route>
                    {/* 二级路由重定向 */}
                    <Redirect to="/index/recommend"></Redirect>
                </Switch>
            </div>
        )
    }
}
export default Index