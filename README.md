# 简单天气系统demo
这是一个具有查询当日天气和查询未来一周天气的简单天气系统

### 用到的技术/工具/库
* react
* redux
* react-redux
* typescript
* axios
* webpack
* [echarts](http://echarts.baidu.com/)
* bootstrap



##踩坑总结：
#### 一、webpack设置热加载  
解决方法：在配置文件中需要加入
```javascript
    plugins: [new webpack.HotModuleReplacementPlugin()]
```
  

#### 二、引入react和react-dom
使用
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
```
报错：`error TS2686: 'React' refers to a UMD global, but the current file is a module.Consider adding an import instead.`  
解决方法，引入方式改为：
```javascript
import * as React from 'react';
import * as ReactDOM from 'react-dom';
```
  

#### 三、无论查询当日天气还是查询未来天气，均会在第二次查询后显示两种走势图
原因：echarts画图是在render函数执行之后将canvas插入dom节点  
解决方法： 在参数props更新之前隐藏要插入echarts图表的dom节点隐藏
```javascript
    componentWillUpdate() {
        if(this.currentEchartDOM){
            this.currentEchartDOM.style.display = "none";
        }
        if(this.futureEchartDOM){
            this.futureEchartDOM.style.display = "none";
        }
    }
```
  

#### 四、查询完未来天气之后再查询当日天气，echarts图表中会有部分属于未来天气图表中的元素（如最高气温、最低气温）
解决方案： 重新绘图前先用clear()方法清空echarts图表  

  

#### 五、[关于子组件通过上下文context获得state](http://blog.csdn.net/awaw00/article/details/59145186?utm_source=gold_browser_extension)
(以本项目中的LoadingView为例，组件定义在app/components/loading_view.tsx中)
1. 子组件必须是UI组件，不能是容器组件  

2.  `Uncaught TypeError: Cannot read property 'object' of undefined` : 引入PropTypes时方式错误，  
解决方法
```javascript
  import * as PropTypes from 'prop-types'; 
```  


3. 直接定义
```javascript
    LoadingView.contextTypes = {
        store: PropTypes.object.isRequired
    }
```
会报错：`Property 'contextTypes' does not exist on type 'typeof LoadingView'.`   
解决方法：用ES7语法解决
```javascript
    static contextTypes: React.ValidationMap<any> = {
        store: PropTypes.object.isRequired
    }
```
  

4. 点击按钮时，不会触发页面渲染（加载图不显示）。因为只有当组件的state、props、context变化时才会引起UI的重新渲染，重新执行render方法。而这里的this.context.store只是一个包含了getState、dispatch等方法的一个对象，store中状态的更新并不会修改store这个对象，变的只是store.getState()的结果而已，所以组件Counter组件并不会触发重新渲染。  
解决办法：在store.subscribe中使用this.forceUpdate方法来强制组件重新渲染    
```javascript
    omponentWillMount(){
        this.context.store.subscribe(()=>{
            this.forceUpdate();
        });
    }
```  

缺点：应用中每个action都会触发组件的重新渲染（所以引入了connect）
