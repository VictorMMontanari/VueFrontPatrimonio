import { createRouter, createWebHistory } from 'vue-router';
import MenuView from '../views/MenuView.vue';
import LoginView from '../views/LoginView.vue';
import UserView from '../views/UserView.vue';
import MainView from '../views/MainView.vue';
import PatrimonioView from '../views/PatrimonioView.vue';
import BlocoView from '../views/BlocoView.vue';
import CheckView from '../views/CheckView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: LoginView,
      name: 'login', // Nome da rota para referência
    },
    {
      path: '/MenuView', // Remova 'View' do caminho para seguir as convenções
      component: MenuView,
      children: [
        { path: '/main', component: MainView},
        { path: '/patrimonio', component: PatrimonioView},
        { path: '/user', component: UserView },
        { path: '/bloco', component: BlocoView },
        { path: '/check', component: CheckView },
       /*  { path: 'team', component: TeamView },
        { path: 'contact', component: ContactView }, */
        // ... outras rotas
      ],
    },
  ]
})

export default router
