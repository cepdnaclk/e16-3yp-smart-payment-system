<template>
  <base-table :data="tableData" thead-classes="text-primary">
    <template slot-scope="{ row }">
      <td><base-checkbox v-model="row.done"></base-checkbox></td>
      <td>
        <p class="title">{{ row.title }}</p>
        <p class="text-muted">{{ row.description }}</p>
      </td>
      <!-- <td class="td-actions text-right">
        <el-tooltip
          content="Edit task"
          effect="light"
          :open-delay="300"
          placement="top"
        >
          <base-button type="link">
            <i class="tim-icons icon-pencil"></i>
          </base-button>
        </el-tooltip>
      </td> -->
    </template>
  </base-table>
</template>
<script>
import { BaseTable } from '@/components';

export default {
  components: {
    BaseTable
  },
  data() {
    return {
      tableData: [
        {
          title: 'Handshaking with Cloud Server',
          description: 'Take the authentication token from the cloud',
          done: true
        },
        {
          title: 'Sysnc with the Cloud Server',
          description:
            'Un-Commited data will transfer to the cloud and tack back the missing data',
          done: true
        },
        {
          title: 'Rebuild the missing data',
          description:
            'if there is a unexpected shutdown of the local gateway, Back-up operations will be done by the Cloud.',
          done: false
        }
      ]
    };
  }
};
</script>
<style></style>
