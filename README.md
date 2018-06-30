# sjx

> web

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build




For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 设计目的
``` bash
（1）熟知npm的使用，学会如何熟练的安装模块包
（2）掌握node.js在web中的使用。
（3）学会利用vue中的板块样式
（4）了解webpack
（5）掌握模块化和组件的使用
```
## 设计任务
``` bash
设计实现待办清单系统，使本系统可以完成以下功能：
（1）用户的登录以及注销
（2）添加待办清单，并能在相应清单中对事项进行一系列操作
（3）添加待办事项，可对事项进行编辑和删除等操作
（4）标记任务完成	
（5）显示所有已经完成的事项
（6）主题样式的更改
（7）搜索待办事项
（8）排序
（9）本地保存
```

## 开发环境
``` bash
Vue，webpack，node.js
```
## 功能要求
``` bash
（1）用户登录注册和注销功能
输入端口号出现登录页面，输入指定的用户名和密码之后，进入todo主页面，点击主页面中的注销按钮即可注销，回到登录页面。
（2）新建清单功能
点击新建清单按钮，即可在弹出的modal框中键入新清单。
（3）添加待办事项
点击添加事项，弹出modal框，在modal框中键入事项名称，选择日期，存入表格中。
（4）标记任务完成
点击事项前的按钮，即可改变事项的颜色，会有小勾标识，完成状态随之改变。
（5）显示已完成事项功能
点击已完成，会渲染todo组件里面finished状态为true的事项。
（6）搜索待办事项功能
在search栏中，键入想要查找的事项名称，回车即会渲染所有事项中含有加入字符的事项，并显示在表格上。
（7）删除事项功能
点击删除按钮，此事项便会被删除。
（8）编辑事项功能
点击编辑按钮，即可修改事项名称。
（9）排序功能
点击排序，待办事项即可根据日期从早到晚进行排序。
（10）样式更改功能
点击更改样式按钮，toolbar里的样式会改变。
（11）本地保存功能
关闭此页面重新进入时，上次所键入的数据仍会保存在页面中。
```
