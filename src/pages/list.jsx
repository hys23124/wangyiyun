import React,{Component} from 'react';
class List extends Component {
    componentDidMount(){
        console.log(this);
    }
    render() {
        return (
            <div className=''>
                <h1>列表页</h1>
                <h2>接收到的id是---{this.props.match.params.id}</h2>
                <button onClick={()=>this.props.history.go(-1)}>返回 go</button>
                <button onClick={()=>this.props.history.goBack()}>返回 goBack</button>
            </div>
        )
    }
}
export default List