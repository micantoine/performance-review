<template>
  <div class="login">
    <h1 class="text-center mt-0">Login</h1>
    <Input
      class="mb-5"
      type="email"
      placeholder="Email"
      :variant="emailStatus"
      v-model="email" />
    <Input
      class="mb-10"
      type="password"
      placeholder="Password"
      :variant="passwordStatus"
      v-model="password" />
    <Button
      variant="primary full"
      label="Login"
      @onClick="login" />
    <ul
      v-if="messages"
      class="font-tiny color-danger mb-0">
      <li v-for="message in messages" :key="message">
          {{ message }}
      </li>
    </ul>
  </div>
</template>

<script>
import AuthenticationService from '../middlewares/AuthenticationService';
import { Button, Input } from '../components/Loop';

export default {
  name: 'Home',
  components: {
    Button,
    Input,
  },
  data() {
    return {
      email: '',
      password: '',
      errors: [],
      messages: [],
    };
  },
  computed: {
    emailStatus() {
      return this.errors.includes('email') ? 'danger' : '';
    },
    passwordStatus() {
      return this.errors.includes('password') ? 'danger' : '';
    },
  },
  methods: {
    async login() {
      const response = await AuthenticationService.login(this.email, this.password);

      if (response.success) {
        this.$router.push(
          response.user.admin
            ? { name: 'admin' }
            : { name: 'reviews' },
        );
      }

      if (response.errors) {
        this.errors = response.errors;
        this.messages = response.messages;
      }
    },
  },
};
</script>

<style scoped>
  .login {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    padding: 20px;
    width: 100%;
    max-width: 340px;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 5px 5px 5px -4px rgba(0,0,0, .15);
  }
</style>
