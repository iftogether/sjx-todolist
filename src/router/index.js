import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Todo from '@/components/todo'
import Layout from '@/components/layout'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/todo',
      component: Layout
    },
    {
    	path: '/login',
    	component: Login
    }
  ]
})
