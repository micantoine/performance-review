<template>
  <div>
    <div v-if="isUserLoggedIn" class="container">
      <router-link
        to="logout"
        class="font-small float-right">Logout</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState([
    'isUserLoggedIn',
  ]),
};
</script>>
