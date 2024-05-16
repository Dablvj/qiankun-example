import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'reactApp',
    entry: '//localhost:3000',
    container: '#container',
    activeRule: '/app-react',
  },
]);
// 启动 qiankun
start();