import Vue from 'vue'
import Router from 'vue-router'

import MainPage from '../components/MainPage.vue'
import ResultPage from '../components/ResultPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/mainPage',
      component: MainPage
    },
    {
      path: '/resultPage',
      component: ResultPage
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
