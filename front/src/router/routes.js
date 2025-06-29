const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), meta: { requiresAuth: true } },
      { path: 'usuarios', component: () => import('pages/usuarios/Usuarios.vue'), meta: { requiresAuth: true } },
      { path: 'reservas', component: () => import('pages/reservas/Reservas.vue'), meta: { requiresAuth: true } },
      { path: 'reservasOquendo', component: () => import('pages/reservas/ReservasOquendo.vue'), meta: { requiresAuth: true } },
      { path: 'reservas/lista', component: () => import('pages/reservas/Lista.vue'), meta: { requiresAuth: true } },
      { path: 'productos', component: () => import('pages/ventas/Producto.vue'), meta: { requiresAuth: true } },
      { path: 'ventas', component: () => import('pages/ventas/Ventas.vue'), meta: { requiresAuth: true } },
      { path: 'ventas/add', component: () => import('pages/ventas/VentaAdd.vue'), meta: { requiresAuth: true } },
      { path: 'metricas', component: () => import('pages/metricas/Metricas.vue'), meta: { requiresAuth: true } },
    ]
  },
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
