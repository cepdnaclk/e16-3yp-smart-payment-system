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

    <!-- <div class="col-md-12">
      <card class="card-plain" body-classes="table-full-width">
        <template slot="header">
          <h4 class="card-title">Table on Plain Background</h4>
          <p class="category">Here is a subtitle for this table</p>
        </template>
        <el-table
          header-cell-class-name="table-transparent"
          header-row-class-name="table-transparent"
          row-class-name="table-transparent"
          :data="tableData"
        >
          <el-table-column
            min-width="150"
            sortable
            label="Name"
            property="name"
          ></el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Country"
            property="country"
          ></el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="City"
            property="city"
          ></el-table-column>
          <el-table-column
            min-width="150"
            sortable
            align="right"
            header-align="right"
            label="Salary"
            property="salary"
          ></el-table-column>
        </el-table>
      </card>
    </div> -->
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
