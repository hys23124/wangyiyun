import React,{Component} from 'react';
// 引入核心库
import axios from 'axios';
// 引入jQuery库
import jq from 'jquery';
// 引入封装好的接口
import {getSongUrl,getLyric,getMusicDetail} from '../util/axios'
// 引入原生node api方法
import qsString from 'querystring'

import "../assets/css/play.css";
import Img from "../assets/images/needle-ip6.png";
class Play extends Component {
    constructor(){
        super();
        this.state = {
            img:Img,
            bgImg:"",
            songName:"",
            singer:"",
            songUrl:"",
            lyric:"",
            playTime:'00:00',
            flag:false //标识位，用来操控音乐的播放
        }
        // 创建音乐播放器的ref
        this.audio = React.createRef();
        // 创建一个音乐图标的ref
        this.playIcon = React.createRef();
    }
    componentDidMount(){
        // 获取query参数
        // console.log(this.props,'query参数');
        let query = this.props.location.search.slice(1);
        query = qsString.parse(query);
        // console.log(query);
        axios.all([
            getMusicDetail({ids:query.id}),
            getSongUrl({id:query.id}),
            getLyric({id:query.id})
        ]).then(
            axios.spread((detail,songUrl,lyric)=>{
                if(detail.code==200){
                    this.setState({
                        bgImg:detail.songs[0].al.picUrl,
                        songName:detail.songs[0].name,
                        singer:detail.songs[0].ar[0].name
                    })
                }
                if(songUrl.code==200){
                    this.setState({
                        songUrl:songUrl.data[0].url
                    })
                }
                if(lyric.code==200){
                    let lyricInfo = lyric.lrc.lyric
                    // 定义正则，去除[]
                    let reg = /\[(.*?)](.*)/g
                    console.log(lyricInfo,'歌词歌词歌词');
                    let obj = {}
                    lyricInfo.replace(reg,(a,b,c)=>{
                        b = b.slice(0,5)
                        obj[b] = c
                    })
                    console.log(obj,'对象');
                    this.setState({
                        lyric:obj
                    },()=>{
                        // 获取到audio属性
                        console.log(this.audio.current,'audio属性');
                        let audio = this.audio.current
                        // 实时监控音乐播放器
                        audio.ontimeupdate = ()=>{
                            console.log(audio.currentTime,'正在播放事件');
                            let nowTimer = this.formateTime(audio.currentTime);
                            console.log(nowTimer,'正在播放时间');
                            // 去除没有歌词的时间
                            if(nowTimer in this.state.lyric){
                                this.setState({
                                    playTime:nowTimer,
                                },()=>{
                                    // 调用歌词滚动
                                    this.moveLyric();
                                })
                            }
                        }
                    })
                }
            })
        )
    }
    // 封装时间转化函数
    formateTime(timer){
        let minutes = (Math.floor(timer/60)+'').padStart(2,"0");
        let seconds = (Math.floor(timer%60)+'').padStart(2,"0")
        return `${minutes}:${seconds}`
    }
    // 封装一个动态歌词滚动事件
    moveLyric(){
        let active = document.getElementsByClassName('active')[0]
        let index = jq('.geci_box').children().index(active);
        // 设置初始位移值31
        let offSet = 31;
        // 超出值就加上translateY
        if(active.offsetTop>offSet){
            jq(".geci_box").css("transform", `translateY(-${index * offSet}px)`);
        }
    }
    // 音乐播放
    toPlay(){
        this.setState({
            flag:!this.state.flag
        },()=>{
            // flag为真，音乐暂停，出现图标
            if(this.state.flag){
                this.playIcon.current.style.display = 'block'
                this.audio.current.pause()
            }else{
                this.audio.current.play()
                this.playIcon.current.style.display = 'none'
            }
        })
    }
    render() {
        const { img, bgImg, songName, singer, songUrl, lyric,playTime } = this.state;
        return (
            <div className='play'>
                <div className="play_top">
                    <img src={img} alt=""/>
                </div>
                <div onClick={this.toPlay.bind(this)} className="play_img_all">
                    <i ref={this.playIcon} className="play_icon"></i>
                    <div className="play_img_box">
                        <div className="small_img">
                            <img src={bgImg} alt=""/>
                        </div>
                    </div>
                </div>
                <div className="play_txt">
                    <div className="play_txt_name">
                        <span>{songName}</span>- <span className="singer">{singer}</span>
                    </div>
                    <div className="play_txt_geci">
                        <div className="geci_box">
                            {
                                Object.entries(lyric).map((item,idx)=>{
                                    if(playTime==item[0]){
                                        return <p className="active" key={idx}>{item[1]}</p>
                                    }else{
                                        return <p key={idx}>{item[1]}</p>;
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="audio_box">
                    <audio ref={this.audio} src={songUrl} autoPlay></audio>
                </div>
            </div>
        )
    }
}
export default Play