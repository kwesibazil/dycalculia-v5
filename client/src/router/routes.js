const removeQueryParams = to => {
  if(Object.keys(to.query).length)
    return {path: to.path, query: {}, hash: to.hash}
}

const removeHash = to => {
  if(to.hash) 
    return { path: to.path, query: to.query, hash: '' }
}


const routes = [
  { 
    path: '/', 
    name: 'welcome', 
    meta: { requiresAuth: false }, 
    component: () => import('@/views/partials/landing.vue'),
    beforeEnter: [removeQueryParams],
  },
  {
    path: '/', 
    name: 'home', 
    meta: { requiresAuth: true }, 
    component: () => import('@/views/partials/home/main-layout.vue'),
    children: 
    [
      { 
        path: '/', 
        name: 'dashboard', 
        meta: { requiresAuth: true }, 
        component: () => import('@/views/partials/home/dashboard.vue'),  
      },
      {
        path: '/information',
        name: 'information',
        meta: { requiresAuth: true }, 
        component: () => import('@/views/partials/dyscalculia.vue'),
        beforeEnter: [removeQueryParams]   
      },
      {
        path: '/statistics',
        name: 'statistics',
        meta: { requiresAuth: true }, 
        component: () => import('@/views/partials/statistics.vue'),
      },
      { 
        path: '/games/math-crush',
        name: 'math-crush',
        meta: { requiresAuth: true }, 
        component: () => import('@/views/partials/game/math-crush/math-crush.vue') 
      },
      { 
        path: '/games/math-puzzle',
        name: 'math-puzzle',
        meta: { requiresAuth: true }, 
        component: () => import('@/views/partials/game/math-puzzle/math-puzzle.vue') 
      },
    ]
  },
  {
    path: '/internal-error',
    name: 'internal-error',
    meta: { requiresAuth: false }, 
    component: () => import('@/views/errors/internal-server.vue'),
  },
  {
    path: '/unauthorize-access',
    name: 'unauthorize-access',
    meta: { requiresAuth: false }, 
    component: () => import('@/views/errors/unauthorize-access.vue'),
  },
  {
    path: '/server-maintenance',
    name: 'server-maintenance',
    meta: { requiresAuth: false }, 
    component: () => import('@/views/errors/server-maintenance.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    meta: { requiresAuth: false }, 
    component: () => import('@/views/errors/not-found.vue'),
  }
]



export { routes}