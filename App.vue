<template>
  <div id="app">
    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <!-- Combined Login Form -->
    <div v-if="!isLoggedIn">
      <div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="login">
          <input type="text" v-model="credentials.username" placeholder="Username" required>
          <input type="password" v-model="credentials.password" placeholder="Password" required>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>

    <!-- Dashboard or Home Page (Displayed after Login) -->
    <div v-if="isLoggedIn">
      <!-- Include a navigation bar or other layout elements if needed -->
      <router-view
        :portals="portals"
        :modules="modules"
        :categories="categories"
        :severities="severities"
        :completedByList="completedByList"
        :statuses="statuses"
        :issues="issues"
      ></router-view>
    </div>
  </div>
</template>

<script>
import axios from './axios';

export default {
  data() {
    return {
      error: null,
      isLoggedIn: false,
      credentials: {
        username: '',
        password: ''
      },
      portals: [],
      modules: [],
      categories: [],
      severities: [],
      completedByList: [],
      statuses: [],
      issues: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        // Fetch dropdown data
        await this.fetchDropdownData();
        // Fetch issues data
        this.issues = (await axios.get('http://10.163.17.53:8080/NIC-support-mail/api/issues')).data;
      } catch (error) {
        console.error('Error fetching data:', error);
        this.error = 'Failed to fetch data. Please try again.';
      }
    },
    async fetchDropdownData() {
      try {
        // Fetch data for each dropdown from your backend
        this.portals = (await axios.get('/portals')).data;
        this.modules = (await axios.get('/modules')).data;
        this.categories = (await axios.get('/categories')).data;
        this.severities = (await axios.get('/severities')).data;
        this.completedByList = (await axios.get('/completedByList')).data;
        this.statuses = (await axios.get('/statuses')).data;
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
        this.error = 'Failed to fetch dropdown data. Please try again.';
      }
    },
    async login() {
      try {
        // Perform login logic
        // For demonstration, let's assume login is successful
        this.isLoggedIn = true;
      } catch (error) {
        console.error('Login failed', error);
        // Handle login error
      }
    }
  }
};
</script>

<style scoped>
/* Your scoped styles go here */
#error-message {
  color: red;
  margin-bottom: 20px;
}

.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  margin-bottom: 20px;
}

.login-container h2 {
  text-align: center;
  margin-bottom: 20px;
}

.login-container form {
  display: flex;
  flex-direction: column;
}

.login-container input[type="text"],
.login-container input[type="password"] {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.login-container button[type="submit"] {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

.login-container button[type="submit"]:hover {
  background-color: #0056b3;
}
</style>

