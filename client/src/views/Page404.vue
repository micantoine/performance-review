<template>
  <Box class="page text-center">
    <h1 class="mt-0">Oops</h1>
    <p class="mb-30">The page you're looking for cannot be found. Please make sure the url is correct or click to go back.</p>

    <Button v-if="isUserLoggedIn"
      variant="primary"
      :label="label"
      @onClick="goToPage" />
    <Button
      v-else
      variant="primary"
      label="Login"
      @onClick="goToLogin" />
  </Box>
</template>

<script>
import { mapGetters } from 'vuex';
import { Button } from '../components/Loop';
import Box from '../components/Box.vue';

export default {
  name: 'Login',
  components: {
    Box,
    Button,
  },
  computed: {
    ...mapGetters([
      'isUserLoggedIn',
      'isAdmin',
    ]),
    label() {
      return this.isAdmin ? 'Back to Dashboard' : 'Back to my Reviews';
    },
    goToPage() {
      return this.isAdmin ? [this.goToAdmin] : [this.goToReviews];
    },
  },
  methods: {
    goToLogin() {
      this.$router.push({ name: 'login' });
    },
    goToAdmin() {
      this.$router.push('/admin');
    },
    goToReviews() {
      this.$router.push('/reviews');
    },
  },
};
</script>

<style scoped>
  .page {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: 340px;
  }
</style>
