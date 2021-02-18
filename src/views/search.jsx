import React, { Component } from 'react';
// 调取接口
import { getHotSearch, getSearch } from '../util/axios'

import '../assets/css/search.css'
class Search extends Component {
    constructor() {
        super()
        this.state = {
            hotList: [],
            searchResult: [], //搜索的结果列表
        }
        this.val = "" //控制删除按钮的显示隐藏
        this.inp = React.createRef(); //ref
    }
    // 组件挂载
    componentDidMount() {
        this.getHotList()
    }
    // 封装一个键盘抬起事件
    keyUp(e) {
        // 把输入的内容赋给val
        this.val = e.target.value;
        if (e.target.value == "" || e.keyCode == 32) {
            console.log(this.val);
            this.setState({
                searchResult: [],
            })
            return
        }
        //调取搜索接口
        this.goSearchInfo(e.target.value);
    }
    // 清空事件
    del() {
        // 清空输入框的内容，把搜索结果置空
        this.inp.current.value = ""
        this.setState({
            searchResult: [],
        })
    }
    // 封装一个搜索事件
    goSearchInfo(keywords) {
        // 把值赋给input框
        this.inp.current.value = keywords;
        getSearch({ keywords })
            .then(res => {
                console.log(res, '搜索结果');
                if (res.code == 200) {
                    this.setState({
                        searchResult: res.result.songs
                    })
                }
            })
    }
    // 封装一个获取热门搜索的接口事件
    getHotList() {
        getHotSearch()
            .then(res => {
                console.log(res, '热门搜索');
                if (res.code == 200) {
                    this.setState({
                        hotList: res.result.hots
                    })
                }
            })
    }
    // 跳转到播放页
    goPlay(id) {
        this.props.history.push('/play?id=' + id)
    }
    render() {
        const { hotList, searchResult } = this.state
        //当点击热搜列表的时候，实现input有值
        this.val = this.inp.current ? this.inp.current.value : ""
        // 定义视图变量
        // 热搜列表
        let hotInfo = (
            <div>
                <h4>热门搜索</h4>
                <ul>
                    {hotList.map(item => {
                        return <span onClick={this.goSearchInfo.bind(this, item.first)} key={item.first}>{""}{item.first}</span>
                    })}
                </ul>
            </div>
        )
        // 搜索列表
        let searchInfo = (
            <ul>
                {searchResult.map(item => {
                    return <li onClick={this.goPlay.bind(this, item.id)} key={item.id}>{item.name}</li>
                })}
            </ul>
        )
        return (
            <div className='search'>
                <div className='input'>
                    <i></i>
                    <input type="text" placeholder='搜索歌曲、歌手、专辑' ref={this.inp} onKeyUp={this.keyUp.bind(this)} />
                    {this.val ? <i onClick={this.del.bind(this)}>X</i> : ""}
                </div>
                {/* 判断是否显示搜索列表 */}
                {searchResult.length > 0 ? searchInfo : hotInfo}
            </div>
        )
    }
}
export default Search