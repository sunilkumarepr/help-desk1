// main.js
import { createApp } from 'vue';
import App from './App.vue';

import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';

const app = createApp(App);

// Register global components
import IssueForm from './components/IssueForm.vue';
import IssueTable from './components/IssueTable.vue';

app.component('IssueForm', IssueForm);
app.component('IssueTable', IssueTable);

const routes = [
  { path: '/issue-form', component: IssueForm },
  { path: '/issue-table', component: IssueTable },
  { path: '/edit-issue/:id', component: IssueForm, name: 'edit-issue' }, // Use IssueForm for editing
  { path: '/', redirect: '/issue-form' },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

app.config.globalProperties.$axios = axios;
app.use(router);
app.mount('#app');
