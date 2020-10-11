<template>
  <div>
    <h1>Hi Admin</h1>
    <Row>
      <Column prop="span12 auto@sm span4@md">
        <Box>
          <h3 class="mt-0 text-center">Employees</h3>
          <ul class="list-unstyle">
            <li v-for="employee in employees" :key="employee.id">
              <router-link :to="{
                name: 'admin-employee',
                params: { employeeId: employee.id }
              }">
              <Row prop="gutter-small" class="mb-0">
                <Column prop="fit">
                  <figure class="img-placeholder"></figure>
                </Column>
                <Column>
                  {{ employee.firstname }} {{ employee.lastname}}
                </Column>
              </Row>
              </router-link>
            </li>
          </ul>
        </Box>
      </Column>
      <Column>
        <Box>
          <h3 class="mt-0 text-center">Recent Reviews</h3>
        </Box>
      </Column>
    </Row>
  </div>
</template>

<script>
import EmployeeService from '@/middlewares/EmployeeService';
import { Row, Column } from '@/components/Loop';
import Box from '@/components/Box.vue';

export default {
  name: 'AdminHome',
  components: {
    Box,
    Column,
    Row,
  },
  data() {
    return {
      employees: [],
    };
  },
  async mounted() {
    const employees = await EmployeeService.employee();
    this.employees = employees.data;
  },
};
</script>

<style scoped>
  .img-placeholder {
    margin: 0;
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid #cdcdcd;
  }
</style>
