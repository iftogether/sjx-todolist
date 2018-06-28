<template>
	<div>
		<div style="height: 185px"></div>
		<div class="login">
			<md-field md-inline>
	      <label>用户名：</label>
	      <md-input class="login-input" v-model="username"></md-input>
	    </md-field>
	    <md-field md-inline>
	      <label>密码：</label>
	      <md-input class="login-input" type="password" v-model="password" @keyup.enter="checkLogin"></md-input>
	    </md-field>
	    <md-button  @click="checkLogin">登陆</md-button>
    </div>
	</div>
</template>


<script>

export default{
	data() {
		return {
			username: '',
			password: ''
		}
	},
	
	methods: {
		checkLogin() {
	      var user = this.$store.getters.users.find(user => {
	        return (this.username === user.username)&&(this.password === user.password);
	      });
	      if (!user) {
	        this.$store.commit('setLogin', false)
	      }else {
	        this.$store.commit('setLogin', true)
	        this.$router.push('/todo');
	      }
	    }
	},
	created() {
		var user = {
	      username: 'sjx',
	      password: 'web'
	    };
	    this.$store.commit('addUser', user);
	    this.$store.commit('setLogin', false)
	}
}
// created:一个生命周期钩子函数，就是一个vue实例被生成后调用这个函数

</script>

<style>
body {
	background: #00FF00 url(../assets/image/8.jpg.gif) repeat fixed top;
}
.login {
	background-color: #fff;
	margin-top: 50px;
	margin: auto;
	padding: 30px;
	width: 500px;
	height: 100%;
	opacity:0.9;
}
.login-input {
	background-color: #fff
}
</style>
