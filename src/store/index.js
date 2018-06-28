import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import VueLocalStorage from 'vue-localstorage'
Vue.use(VueLocalStorage)


const USERS = 'users'
const USER_NUM = 'num'
const TODO_ITEMS = 'items'
const TODO_LISTS = 'lists'
const IS_LOGIN = 'islogin'

const state = {
	users: JSON.parse(window.localStorage.getItem(USERS) || '[]'),
  num: JSON.parse(window.localStorage.getItem(USER_NUM) || '[]'),
  items: JSON.parse(window.localStorage.getItem(TODO_ITEMS) || '[]'),
  islogin: window.localStorage.getItem(IS_LOGIN),
  lists: JSON.parse(window.localStorage.getItem(TODO_LISTS) || '[]')
}

const getters = {
	users: state => state.users,
  num: state => state.num,
  items: state => state.items,
  lists: state => state.lists,
  islogin: state => state.islogin,
  getItemsbytitle: state => title => {
    var thisitems = [];
    var downitems = state.items.find(item => {
        if (item.belong == title){
          thisitems.push(item)
        }
      });
    return thisitems;
  },
  getAllfinished(state) {
    var finish = [];
    state.items.forEach((item) => {
      if(item.finished === true){
        finish.push(item);
      }
    })
    return finish;
  },
  getmust(state) {
    var must = [];
    state.items.forEach((item) => {
      if(item.ismust === true){
        must.push(item);
      }
    })
    return must;
  },
  getcountbyname: state => title => {
    var thisitems = [];
    var downitems = state.items.find(item => {
      if (item.belong == title){
        thisitems.push(item)
      }
    });
    var count = thisitems.filter((data) => {
      if (data.finished === false) return true;
      return false;
    }).length
    return count;
  },
  getMustcount: state => {
    var thisitems = [];
    var downitems = state.items.find(item => {
      if (item.ismust ){
        thisitems.push(item)
      }
    });
    var count = thisitems.filter((data) => {
      if (data.finished === false) return true;
      return false;
    }).length
    return count;
  }
}

const mutations = {
	addUser(state, obj) {
		var username = obj.username;
		var password = obj.password;
		state.users.push({username: username, password: password})
	},
  addList(state, title) {
    state.lists.push({title: title, count: 0});
  },
  addItem(state, obj) {
    var item = {
        text: obj.text,
        date: obj.date,
        belong: obj.belong,
        finished: obj.finished,
        ismust: false
      };
    state.items.push(item);
  },
  deleteItem(state, text) {
    state.items.splice(state.items.findIndex(item => item.text == text), 1)
  },
  editItem(state, obj) {
    var text = obj.text;
    state.items.forEach((item) => {
      if(item.text === text) {
        item = obj;
      }
    })
  },
  setLogin (state, islogin) {
    state.islogin = islogin;
  }
}

const localStoragePlugin = store => {
  store.subscribe((mutation, { num, users, items, lists, islogin }) => {
  	window.localStorage.setItem(USERS, JSON.stringify(users))
    window.localStorage.setItem(USER_NUM, num),
    window.localStorage.setItem(TODO_ITEMS, JSON.stringify(items))
    window.localStorage.setItem(TODO_LISTS, JSON.stringify(lists))
    window.localStorage.setItem(IS_LOGIN, islogin)
  })
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  plugins: [localStoragePlugin] //
})
