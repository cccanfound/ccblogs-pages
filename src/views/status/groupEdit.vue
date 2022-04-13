
<template>
  <div>
    <el-select v-model="selectValue" filterable placeholder="选择指标大类" style="margin: 20px 20px">
      <el-option
        v-for="item in options"
        :key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>
    <el-transfer
      style="margin: 0 20px"
      v-loading="loading"
      filterable
      :filter-method="filterMethod"
      filter-placeholder="请输入搜索类型"
      v-model="value"
      :titles="['All', 'Selected']"
      @left-check-change="checked"
      @right-check-change="checked"
      :props="{
        key: 'id',
        label: 'name'
      }"
      :data="data">
    </el-transfer>
    <div style="margin: 20px">
      <!--保存大类修改按钮-->
      <el-tooltip class="item" effect="dark" content="提交保存" placement="top-start">
        <el-button size="small" type="primary" icon="el-icon-finished" circle @click="save"></el-button>
      </el-tooltip>
      <!--新增指标信息按钮+弹出编辑框-->
      <el-tooltip class="item" effect="dark" content="新增指标类型" placement="top-start">
        <el-button size="small" type="primary" icon="el-icon-plus" circle @click="AddStatusDefTableVisible = true"></el-button>
      </el-tooltip>
      <!--编辑指标信息按钮+弹出编辑框-->
      <el-tooltip class="item" effect="dark" content="编辑指标类型" placement="top-start">
        <el-button size="small" type="primary" icon="el-icon-edit" circle @click="openEditDefTable"></el-button>
      </el-tooltip>
      <!--新增指标数据按钮+弹出列表-->
      <el-tooltip class="item" effect="dark" content="编辑指标数据" placement="top-start">
        <el-button size="small" type="primary" icon="el-icon-files" circle @click="openInfoDialog"></el-button>
      </el-tooltip>
    </div>
    <el-dialog title="新增指标类型" :visible.sync="AddStatusDefTableVisible">
      <el-form ref="form" :model="AddDefForm" label-width="80px">
        <el-form-item label="指标名称">
          <el-input v-model="AddDefForm.name" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="单位">
          <el-input v-model="AddDefForm.unit" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="最低值">
          <el-input v-model="AddDefForm.floor" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="最高值">
          <el-input v-model="AddDefForm.ceiling" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitAddDefForm">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="修改指标类型" :visible.sync="EditStatusInfoTableVisible">
      <el-form ref="form" :model="EditDefForm" label-width="80px">
        <el-form-item label="指标名称">
          <el-input v-model="EditDefForm.name"  style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="单位">
          <el-input v-model="EditDefForm.unit"  style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="最低值">
          <el-input v-model="EditDefForm.floor"  style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="最高值">
          <el-input v-model="EditDefForm.ceiling"  style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitEditDefForm">提交修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="新增指标数据" :visible.sync="showStatusInfoTableVisible" @close="showAddstatusInfo=false">
      <div style="margin-top:-30px">
        <el-divider content-position="left" v-if="statusInfoData.length>0">
          <div style="margin: 0 10px;float: left;color: #5e6d82;">{{statusInfoData[0].name}}</div>
          <div style="margin: 0 10px;float: left;color: #5e6d82;">{{statusInfoData[0].floor}}-{{statusInfoData[0].ceiling}}</div>
          <div style="margin: 0 10px;float: left;color: #5e6d82;">{{statusInfoData[0].unit}}</div>
        </el-divider>
      </div>
      <el-table
        ref="singleTable"
        highlight-current-row
        @current-change="handleCurrentChange"
        :data="statusInfoData">
        <el-table-column property="val" label="结果" width="80"></el-table-column>
        <el-table-column property="locationName" label="报告单位" width="200"></el-table-column>
        <el-table-column property="danger" label="标准" :formatter="dangerFormat" width="70"></el-table-column>
        <el-table-column property="createTime" label="报告时间" width="200"></el-table-column>
        <el-table-column property="remark" label="备注"></el-table-column>
      </el-table>
      <el-button size="small" type="primary" icon="el-icon-plus" circle  @click="showAddstatusInfo = !showAddstatusInfo" style="margin-top: 20px"></el-button>
      <el-button size="small" type="primary" icon="el-icon-edit" circle  @click="editStatusInfoVisible" style="margin-top: 20px"></el-button>
      <el-button size="small" type="primary" icon="el-icon-close" circle  @click="goDeleteStatusInfo" style="margin-top: 20px"></el-button>
      <div style="margin-top: 20px;">
        <el-collapse-transition>
          <div v-if="showAddstatusInfo">
            <el-form ref="form" :model="infoForm" label-width="80px">
              <el-form-item label="指标名称">
                <el-input
                  style="width: 80%"
                  placeholder="请输入内容"
                  v-model = "data.find(el => el.id === this.checkedList[0]).name"
                  :disabled="true">
                </el-input>
              </el-form-item>
              <el-form-item label="指标数据">
                <el-input v-model="infoForm.val"  style="width: 80%"></el-input>
              </el-form-item>
              <el-form-item label="报告日期" >
                <el-date-picker
                  v-model="infoForm.createTime"
                  value-format="yyyy-MM-dd HH:mm"
                  type="date"
                  placeholder="报告日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="检测单位">
                <el-select v-model="infoForm.locationId" placeholder="选择检测单位">
                  <el-option
                    v-for="item in localOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="infoForm.remark"  style="width: 80%"></el-input>
              </el-form-item>
              <el-form-item label="是否异常">
                <el-radio-group v-model="infoForm.danger">
                  <el-radio-button label="1" value="1">偏低</el-radio-button>
                  <el-radio-button label="0" value="0">正常</el-radio-button>
                  <el-radio-button label="2" value="2">偏高</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="editStatusInfo">提交</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-collapse-transition>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss" >
  .el-dialog{
    @media only screen and (min-width: 0px) and (max-width: 600px){
      width: 90%;
    }
  }
  .el-divider__text{ padding:0px; }
</style>
<script>
  import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
  import {getAllStatusDef,getAllGroups,saveGroupDefRelation,getGroupDefRelation,
    addStatusDef,getStatusDefInfo,updateStatusDef,getStatusInfoOfSingleDef,editStatusInfo,
    getLocation,deleteStatusInfo} from "@/api/status";

  export default {
    data() {
      return {
        showAddstatusInfo: false,
        loading: true,
        data: [],
        value: [],
        //新增指标数据的列表选中行
        currentRow: null,
        filterMethod(query, item) {
          return item.name.indexOf(query) > -1;
        },
        options: [],
        localOptions: [],
        selectValue: '',
        statusInfoData: [],
        checkedList:[],
        AddStatusDefTableVisible: false,
        showStatusInfoTableVisible: false,
        EditStatusInfoTableVisible: false,
        AddDefForm:{},
        EditDefForm:{},
        infoForm:{}
      };
    },
    watch: {
      selectValue(newVal, oldVal) {
        this.loading=true
        getGroupDefRelation(newVal).then(
          (res) => {
            this.loading=false
            if (res.data.code === 0) {
              this.value=res.data.data
            } else {
              this.$message.error(res.data.msg);
            }
          })
      }
    },
    methods: {
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      getAllGroup() {
        getAllGroups().then(
          (res) => {
            this.loading=false
            if (res.data.code === 0) {
              this.options=res.data.data
            } else {
              this.$message.error(res.data.msg);
            }
          })
      },
      //获取所有的检测单位
      getAllLocation(){
        getLocation().then(
          (res) => {
            this.loading=false
            if (res.data.code === 0) {
              this.localOptions=res.data.data
            } else {
              this.$message.error(res.data.msg);
            }
          })
      },
      //获取所有的指标类型
      getAllStatusDef() {
        getAllStatusDef().then(
          (res) => {
            this.loading=false
            if (res.data.code === 0) {
              this.data=res.data.data
            } else {
              this.$message.error(res.data.msg);
            }
          })
      },
      //保存穿梭框内容（大类编辑内容）
      save(){
        if(this.selectValue==''){
          this.$message.error("请选择指标类型");
          return
        }
        saveGroupDefRelation(this.selectValue,this.value).then(
          (res) => {
            this.loading=false
            if (res.data.code === 0) {
              this.$message.success("保存成功");
            } else {
              this.$message.error(res.data.msg);
            }
          })
      },
      //左右穿梭框选中的响应事件
      checked(value){
        this.checkedList = value
      },
      //打开新增指标类型的编辑框
      openEditDefTable(){
        if(this.checkedList.length!==1){
          this.$message.error("请选中一项指标");
        }
        else{
          this.EditStatusInfoTableVisible=true
          getStatusDefInfo(this.checkedList[0]).then(
            (res) => {
              if (res.data.code === 0) {
                this.EditDefForm = res.data.data
              } else {
                this.$message.error(res.data.msg);
              }
            })

        }
      },
      submitAddDefForm(){
        addStatusDef(this.AddDefForm).then(
          (res) => {
            if (res.data.code === 0) {
              this.$message.success("添加成功");
            } else {
              this.$message.error(res.data.msg);
            }
          })
      },
      submitEditDefForm(){
        updateStatusDef(this.EditDefForm).then(
          (res) => {
            if (res.data.code === 0) {
              this.$message.success("更新成功");
              this.EditStatusInfoTableVisible=false
            } else {
              this.$message.error(res.data.msg);
            }
          })
      },
      openInfoDialog(){
        if(this.checkedList.length!==1){
          this.$message.error("请选中一项指标");
        }
        else{
          this.showStatusInfoTableVisible=true
          getStatusInfoOfSingleDef(this.checkedList[0]).then(
            (res) => {
              if (res.data.code === 0) {
                this.statusInfoData = res.data.data
              } else {
                this.$message.error(res.data.msg);
              }
            })

        }
      },
      editStatusInfo(){
        editStatusInfo(this.infoForm,this.checkedList[0]).then(
          (res) => {
            if (res.data.code === 0) {
              this.$message.success("编辑成功");
              this.openInfoDialog();
              this.infoForm = {};
              this.showAddstatusInfo=false
            } else {
              this.$message.error(res.data.msg);
            }
          })
      },
      editStatusInfoVisible(){
        if(this.currentRow==null){
          this.$message.error("请选中一条数据");
        }
        this.infoForm = this.currentRow;
        this.showAddstatusInfo=true
      },
      //删除数据
      goDeleteStatusInfo(){
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteStatusInfo(this.currentRow).then(
            (res) => {
              if (res.data.code === 0) {
                this.$message.success("删除成功");
                this.openInfoDialog()
              } else {
                this.$message.error(res.data.msg);
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      dangerFormat(row, column) {
        if (row.danger === '1') return '偏低'
        else if (row.danger === '2') return '偏高'
        else return '正常'
      }
    },
    mounted() {
      this.getAllGroup()
      this.getAllStatusDef()
      this.getAllLocation()

    }
  };
</script>


