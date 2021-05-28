<template>
  <div class="row">
    <div class="col-lg-6">
      <card card-body-classes="table-full-width">
        <h4 slot="header" class="card-title">Gaming Nodes</h4>
        <el-table :data="tableData">
          <el-table-column
            min-width="150"
            sortable
            label="Node ID"
            property="id"
          ></el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Amount"
            property="value"
          ></el-table-column>
          <el-table-column
            min-width="240"
            sortable
            label="Name"
            property="name"
          ></el-table-column>
        </el-table>
      </card>
    </div>

    <div class="col-lg-6">
      <card card-body-classes="table-full-width">
        <h4 slot="header" class="card-title">Working Cards</h4>
        <el-table :data="tableData1">
          <el-table-column
            min-width="110"
            sortable
            label="Card ID"
            property="id"
          ></el-table-column>
          <el-table-column
            min-width="115"
            sortable
            label="Node ID"
            property="value"
          ></el-table-column>
          <el-table-column
            min-width="200"
            sortable
            label="Customer Name"
            property="name"
          ></el-table-column>
          <el-table-column
            min-width="130"
            sortable
            label="Due Time"
            property="time"
          ></el-table-column>
        </el-table>
      </card>
    </div>
    
  </div>
</template>
<script>
import { Table, TableColumn } from 'element-ui';

export default {
  name: 'regular',
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  data() {
    return {
      tableData: [
        {
          id: 'AB23D751F',
          name: 'Pin Pon machine-1',
          value: 'RS: 120.00'
        },
        {
          id: '655AEDB00',
          name: 'Pin Pon machine-2',
          value: 'RS: 120.00'
        },
        {
          id: 'BB534DB74',
          name: 'Pin Pon machine-3',
          value: 'RS: 120.00'
        },
        {
          id: 'BBA34DB74',
          name: 'Pin Pon machine-4',
          value: 'RS: 120.00'
        },
        {
          id: '90BAEDB89',
          name: 'Gift Round machine-1',
          value: 'RS: 120.00'
        },
        {
          id: '623BC87DE',
          name: 'Gift Round machine-2',
          value: 'RS: 120.00'
        },
        {
          id: 'AA34782BC',
          name: 'Gift Round machine-3',
          value: 'RS: 120.00'
        },
        {
          id: 'BA34723BC',
          name: 'Gift Round machine-4',
          value: 'RS: 120.00'
        }
      ],
      tableData1: [
        {
          value: '655AEDB00',
          name: 'Sathira Basnayake',
          id: '87BCBEFB',
          time: '26 min'
        },
        {
          value: 'BB534DB74',
          name: 'Nimantha Bhanuka',
          id: '894ABE78',
          time: '30 min'
        },
        {
          value: 'BBA34DB74',
          name: 'Tharindu Sandaruwan',
          id: '39BDBEFB',
          time: '38 min'
        },
        {
          value: '90BAEDB89',
          name: 'Maduaha Shanaka',
          id: 'BB65AD23',
          time: '46 min'
        },
        {
          value: '623BC87DE',
          name: 'Supun Vindula',
          id:'98FEA67D',
          time: '53 min' 
        },
        {
          value: '7033C812E',
          name: 'Shihan Janith',
          id:'AB23D751F',
          time: '1 hour' 
        },
        {
          value: '56AB6CD2F',
          name: 'Nilushka Chandimal',
          id:'BA34723BC',
          time: '1 hour' 
        }
      ]
    };
  }
};
</script>
<style>
.table-transparent {
  background-color: transparent !important;
}
</style>
