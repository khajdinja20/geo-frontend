import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import Cookies from 'js-cookie';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

// Add the navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = Cookies.get('user'); // Check if the JWT is present
  console.log(Cookies.get('user'))

  if (to.meta.requiresAuth && !isAuthenticated) {
    // If the route requires authentication and the user is not authenticated, redirect to login
    next('/login');
  } else {
    // Otherwise, proceed to the requested route
    next();
  }
});

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light'
  },
  components,
  directives,
})

createApp(App).use(vuetify).use(router).use(router).mount('#app')
