import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SubmitManuscript from '../views/SubmitManuscript.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'home',
      component: HomeView
    },
    {
      path: '/submit-ms',
      name: 'submit-ms',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: SubmitManuscript,
      children: [
        {
          path: '', // Adjusted path
          name: 'submit-ms-1-submit',
          component: () => import('../views/steps/step1-submit.vue')
        },
        {
          name: '2-outline',
          path: '2-outline', // Adjusted path
          component: () => import('../views/steps/step2-outline.vue')
        },
        {
          name: '3-intro',
          path: '3-intro', // Adjusted path
          component: () => import('../views/steps/step3-intro.vue')
        },
        {
          name: '4-discussion',
          path: '4-discussion', // Adjusted path
          component: () => import('../views/steps/step4-discussion.vue')
        },
        {
          name: '5-connectivity',
          path: '5-connectivity', // Adjusted path
          component: () => import('../views/steps/step5-connectivity.vue')
        }
      ]
    }
  ]
})

export default router
