<template>
  <div>
    <md-app md-waterfall md-mode="fixed">
      <md-app-drawer md-permanent="full" class="app-left" >
        <md-toolbar class="md-transparent" md-elevation="0">
          清单列表
        </md-toolbar>
        <md-list class="left-list">
        	<md-list-item href="#" @click='goTitle("must")'>
            <md-icon>grade</md-icon>
            <span class="md-list-item-text">MUST</span>
            <md-button class="md-icon-button md-list-action">
              <md-icon>chat_bubble</md-icon>
              {{ $store.getters.getMustcount }}
            </md-button>
          </md-list-item>
          <md-list-item v-for="list in lists" href="#" @click="goTitle(list.title)">
            <md-icon>toc</md-icon>
            <span class="md-list-item-text">{{ list.title }}</span>
            <md-button class="md-icon-button md-list-action">
              <md-icon v-if="$store.getters.getcountbyname(list.title) == 0">chat_bubble</md-icon>
              <span v-if="$store.getters.getcountbyname(list.title) !== 0">{{ $store.getters.getcountbyname(list.title) }}</span>
              
            </md-button>
          </md-list-item>
          <md-list-item>
            <md-button class="md-dense md-raised md-primary" @click="showAddlist = true">+新建清单</md-button>
          </md-list-item>
          <md-dialog :md-active.sync="showAddlist" style="padding: 50px">
          <md-dialog-title>添加清单</md-dialog-title>
          <md-field>
            <label>Title</label>
            <md-input v-model="newtitle" @keyup.enter="addList"></md-input>
          </md-field>
  	      <md-button class="md-dense md-raised md-primary" @click="addList">确定</md-button>
          </md-dialog>
        </md-list>
      </md-app-drawer>
      <md-app-toolbar :class="{'md-primary': !isnewstyle, 'newToolstyle': isnewstyle}">
        <h1>Web</h1>
        <md-button class="md-dense md-raised md-primary" @click="toLogin" style="margin-left: 70%">注销</md-button>
        <md-button class="md-dense md-raised md-primary" @click="isnewstyle = !isnewstyle">更改样式</md-button>
      </md-app-toolbar>
      <md-app-content class="app-right" v-if="isLogin">
      	<todo></todo>
      </md-app-content>
      <md-app-content class="app-right" v-if="!isLogin">
       请返回登陆
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import todo from './todo'
import bus from '../assets/eventBus'

export default {
  data() {
  	return {
  		newtitle: '',
  		showAddlist: false,
      isnewstyle: false
  	}
  },
  computed: {
  	lists() {
  		return this.$store.getters.lists;
  	},
    allItem() {
      return this.$store.getters.items;
    },
    isLogin() {
      return this.$store.getters.islogin;
    }
  },
  components: {
  	todo
  },
  methods: {
  	addList() {
  		this.$store.commit('addList', this.newtitle);
  		this.newtitle = '';
  		this.showAddlist = false;
  	},
  	goTitle(title) {
  		bus.$emit('goListbyTitle', title)
  	},
    toLogin() {
        this.$router.push('/');
    }

  }

}
</script>

<style scoped>/*scoped 属性是一个布尔属性。
如果使用该属性，则样式仅仅应用到 style 元素的父元素及其子元素。*/

.app-left {
  width: 280px;
  background: #00FF00 url(../assets/image/8.jpg.gif) repeat fixed top;
}
.left-list{
  background: #00FF00 url(../assets/image/8.jpg.gif) repeat fixed top;
}
.newToolstyle {
 background: #00FF00 url(../assets/image/8.jpg.gif) repeat fixed top;
  color: #000
}

</style>
