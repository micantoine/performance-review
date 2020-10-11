<template>
  <div class="container">
    <h1>Hi Admin</h1>
    <Row>
      <Column prop="span12 auto@sm span4@md">
        <Box>
          <h3 class="mt-0 text-center">Employees</h3>
          <ul class="list-unstyled">
            <li v-for="employee in employees" :key="employee.id">
              {{ employee.firstname }} {{ employee.lastname}}
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
import EmployeeService from '../middlewares/EmployeeService';
import { Row, Column } from '../components/Loop';
import Box from '../components/Box.vue';

export default {
  name: 'Admin',
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
