<template>
  <h1>Employee Profile</h1>
</template>

<script>
// import EmployeeService from '../middlewares/EmployeeService';
// import { Row, Column } from '../components/Loop';
// import Box from '../components/Box.vue';

export default {
  name: 'EmployeeProfile',
  // components: {
  //   Box,
  //   Column,
  //   Row,
  // },
  data() {
    return {
      employee: [],
    };
  },
  async mounted() {
    // const employees = await EmployeeService.view();
    // this.employees = employees.data;
  },
};
</script>

<style scoped>
  .img-placeholder {
    margin: 0;
    display: block;
    width: 75px;
    height: 75px;
    border-radius: 50%;
    border: 1px solid #cdcdcd;
  }
</style>
