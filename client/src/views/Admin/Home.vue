<template>
  <div>
    <h1>Hi Admin</h1>
    <Row>
      <Column prop="span12 auto@sm span4@md">
        <Box>
          <h3 class="mt-0">Employees</h3>
          <ul class="list-unstyle mb-0">
            <li
              v-for="employee in employees" :key="employee.id"
              class="employee"
            >
              <router-link
                :to="{
                  name: 'admin-employee',
                  params: { employeeId: employee.id }
                }"
              >
              <Row prop="gutter-small vgutter-less valign-middle">
                <Column prop="fit">
                  <img class="avatar" src="@/assets/user.svg" alt="" />
                </Column>
                <Column>
                  {{ employee.firstname }} {{ employee.lastname}}<br/>
                  <span class="color-secondary font-small">{{ employee.department.name }}</span>
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

<style lang="scss" scoped>
  .employee:not(:last-child)::after {
    margin-top: .8em;
    margin-bottom: .8em;
    display: block;
    content: '';
    border-top: 1px solid #eeeeee;
  }
  .employee a {
    position: relative;
    padding-right: 15px;
    display: flex;
    line-height: 1.2;
    &::after {
      position: absolute;
      top: 50%;
      right: 0;
      content: '';
      display: flex;
      width: 10px;
      height: 10px;
      border-top: 2px solid #cdcdcd;
      border-right: 2px solid #cdcdcd;
      transform: rotate(45deg) translateX(calc(-50% - 5px));
    }
  }
  .avatar {
    padding: 8px;
    display: block;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-color: #f8f8f8;
    border: 1px solid #cdcdcd;
  }
</style>
