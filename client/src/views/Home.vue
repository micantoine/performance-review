<template>
  <div class="login">
    <h1 class="text-center mt-0">Login</h1>
    <Input
      class="mb-5"
      type="text"
      placeholder="Email"
      v-model="email" />
    <Input
      class="mb-10"
      type="password"
      placeholder="Password"
      v-model="password" />
    <Button
      variant="primary full"
      label="Login"
      @onClick="login" />
    <ul
      v-if="message"
      class="font-tiny color-danger mb-0">
      <li v-for="notice in message" :key="notice">
          {{ notice }}
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
      message: [],
    };
  },
  methods: {
    async login() {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password,
        });

        if (response.error) {
          this.message = response.message;
        }
      } catch (error) {
        this.message = error;
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
