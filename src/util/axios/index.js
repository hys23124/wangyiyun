// 引入封装好的axios
import http from './axios'

// 封装推荐歌单的接口
export function personalized(params){
    return http.get('/personalized',{params})
}
// 封装热门榜单的接口
export function hotList(){
    return http.get('/playlist/detail?id=3778678')
}
// 封装获取音乐URL的接口
export function getSongUrl(params){
    return http.get('/song/url',{params})
}
// 封装获取音乐URL的接口
export function getLyric(params){
    return http.get('/lyric',{params})
}
// 封装获取歌曲详情的接口
export function getMusicDetail(params){
    return http.get('/song/detail',{params})
}
// 封装热门搜索列表的接口
export function getHotSearch(){
    return http.get('/search/hot')
}
// 封装一个搜索列表
export function getSearch(params){
    return http.get('/search',{params})
}