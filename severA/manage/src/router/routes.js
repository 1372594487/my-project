export const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path:'/main',
    alias:'/',
    name:'Main',
    component: () => import('../views/Main.vue'),
    children:[
      // {
      //   path:'/home',
      //   alias:'/',
      //   name:'Home',
      //   component: () => import('../views/Home.vue')
      // },
      {
        path:'/postProduct',
        name:'PostProduct',
        component:()=>import('../components/pages/PostProduct.vue')
      },
      {
        path:'/productList',
        name:'ProductList',
        component:()=>import('../components/pages/ProductList.vue')
      }
    ]
  },
  {
    path: '*',
    redirect: {
      name: 'Login'
    }
  }
]