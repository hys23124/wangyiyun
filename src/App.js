// 全局引入rem和重置样式表
import './assets/css/reset.css';
import './assets/js/remScale';
// 引入路由的相关组件
import {Switch,Route,Redirect} from 'react-router-dom'
// 引入创建好的组件
import Index from './pages/index'
import List from './pages/list'
import Play from './pages/play'


function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/index" component={Index}></Route>
        <Route path="/list/:id" component={List}></Route>
        <Route path="/play" component={Play}></Route>
        {/* 路由重定向 */}
        <Redirect to="/index"></Redirect>
      </Switch>
    </div>
  );
}

export default App;
