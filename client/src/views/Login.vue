<template>
  <Box class="login">
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
      <li v-for="message in messages" :key="message.context">
         {{ message.message.join(', ') }}
      </li>
    </ul>
  </Box>
</template>

<script>
import { mapActions } from 'vuex';
import AuthenticationService from '@/middlewares/AuthenticationService';
import { Button, Input } from '@/components/Loop';
import { Box } from '@/components';

export default {
  name: 'Login',
  components: {
    Box,
    Button,
    Input,
  },
  data() {
    return {
      email: '',
      password: '',
      messages: [],
    };
  },
  computed: {
    emailStatus() {
      return this.messages.filter(message => message.context === 'email')[0] ? 'danger' : '';
    },
    passwordStatus() {
      return this.messages.filter(message => message.context === 'password')[0] ? 'danger' : '';
    },
  },
  methods: {
    ...mapActions([
      'setUser',
    ]),

    async login() {
      const response = await AuthenticationService.login(this.email, this.password);
      if (response.success) {
        this.setUser(response.data.user);

        if (this.$route.query.redirect) {
          this.$router.push({ path: this.$route.query.redirect });
        } else {
          this.$router.push(
            response.data.user.admin
              ? { name: 'admin' }
              : { name: 'reviews' },
          );
        }
      }

      if (response.error) {
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
    max-width: 340px;
  }
</style>
