import Vue from 'vue'
import Router from 'vue-router'

import MainPage from '../components/MainPage.vue'
import ResultPage from '../components/ResultPage.vue'
import IntroPage from '../components/IntroPage.vue'
import DescriptionPage from '../components/ProjectDescriptionPage.vue'
import CertificationPage from '../components/CertificationPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landingPage',
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
      path: '/introPage',
      component: IntroPage
    },
    {
      path: '/descriptionPage',
      component: DescriptionPage
    },
    {
      path: '/certificationPage',
      component: CertificationPage
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
