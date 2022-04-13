<template>
  <div>
    <!--搜索条件-->
    <el-row :gutter="20" style="margin:20px 5px">
      <el-col :span="5">
        <el-select v-model="groupValue" clearable  filterable placeholder="大类">
          <el-option
            v-for="item in groupOptions"
            :key="Math.random()"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
        <el-select v-model="statusDefValue" clearable  filterable placeholder="指标类型">
          <el-option
            v-for="item in statusDefOptions"
            :key="Math.random()"
            :label="item.name"
            :value="item.def_id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
        <el-select v-model="dangerValue" clearable  filterable placeholder="异常情况">
          <el-option
            v-for="item in dangerOptions"
            :key="Math.random()"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
        <el-select v-model="locationValue" clearable  filterable placeholder="报告单位">
          <el-option
            v-for="item in localOptions"
            :key="Math.random()"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <el-button icon="el-icon-search" circle @click="getIndexData"></el-button>
      </el-col>
    </el-row>
    <div @mouseenter="remarkVisible=true" @mouseleave="remarkVisible=false">
      <el-collapse-transition>
        <div v-show="lineChartVisible" >

          <div id="line_parent">
            <div  style="margin:0 auto;" id="line"></div>
          </div>
          <div id="pie_parent">
            <div  style="margin:0 auto;" id="pie"></div>
          </div>

        </div>
      </el-collapse-transition>
      <div style="width: 100%;text-align: center; font-size: 14px;color: #d3dce6;cursor: pointer;">
        <i @click="lineChartVisible = !lineChartVisible" style="text-align: center;" :class="lineChartVisible?'el-icon-caret-top':'el-icon-caret-bottom'"><span v-show="remarkVisible">{{lineChartVisible?"点击收起":"点击展开"}}</span></i>
      </div>
    </div>


    <!--表单开始-->
    <el-table
      :data="tableData"
      height="450"
      style="width: 100%;margin-bottom: 20px;"
      row-key="infoId"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
        prop="name"
        label="指标类型"
        width="200">
      </el-table-column>
      <el-table-column
        prop="danger"
        label=""
        width="50">
        <template slot-scope="scope"><i style="color: #F56C6C" :class="dangerFormat(scope.row.danger)"></i></template>
      </el-table-column>
      <el-table-column
        prop="unit"
        label="单位"
        width="80">
      </el-table-column>
      <el-table-column
        prop="val"
        label="结果"
        width="80">
      </el-table-column>
      <el-table-column
        prop="floor"
        label="标准范围"
        width="80">
        <template slot-scope="scope">
          {{scope.row.floor}}-{{scope.row.ceiling}}
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="时间"
        width="110">
      </el-table-column>
      <el-table-column
        prop="locationName"
        label="报告单位"
        width="180">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        width="80">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="50">
        <template slot-scope="scope" >
            <el-button v-show="scope.row.children" type="text" size="small" @click="showChart(scope.row,scope.row.children)">图示</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped lang="scss">
  #pie,#line {
    @media only screen and (min-width: 601px) {
      width: 500px;
      height: 400px;
    }
    @media only screen and (min-width: 0px) and (max-width: 600px) {
      width: 280px;
      height: 250px;
    }
  }
  #line_parent,#pie_parent{
    @media only screen and (min-width: 601px) {
      float: left;
      width: 50%;
    }
  }


</style>

<script>
  import {getAllGroups, getAllStatusDef, getStatusIndex, getGroupDefRelationInfo, getLocation} from "@/api/status";
  var $ = require('jquery');
  // vue文件中引入echarts工具
  let echarts = require('echarts/lib/echarts')
  require('echarts/lib/chart/line')
  require('echarts/lib/chart/pie')
  // 以下的组件按需引入
  require('echarts/lib/component/tooltip')   // tooltip组件
  require('echarts/lib/component/title')   //  title组件
  require('echarts/lib/component/legend')  // legend组件
  require('echarts/lib/component/graphic')  // legend组件
  import { GridComponent } from 'echarts/components';
  echarts.use([GridComponent]);
  export default {
    data() {
      return {
        lineChart:null,
        pieChart:null,
        remarkVisible:false,
        lineChartVisible:false,
        tableData: [],
        groupOptions: [],
        statusDefOptions: [],
        localOptions: [],
        dangerOptions: [{
          id: '1',
          name: '偏低'
        }, {
          id: '2',
          name: '偏高'
        },{
          id: '-1',
          name: '全部异常'
        }],
        groupValue: '',
        statusDefValue:'',
        dangerValue:'',
        locationValue:'',
        lineOption: {
          legend: {
            data: ['上限', '指标值', '下限']
          },
          //x轴样式
          xAxis: {
            type: 'category',   // 还有其他的type，可以去官网喵两眼哦
            data: [],   // x轴数据
            name: '',   // x轴名称
            // x轴名称样式
            nameTextStyle: {
              fontWeight: 600,
              fontSize: 18
            }
          },
          //y轴样式
          yAxis: {
            type: 'value',
            name: '数值',   // y轴名称
            // y轴名称样式
            nameTextStyle: {
              fontWeight: 600,
              fontSize: 18
            }
          },
          label: {},
          //鼠标放在上面显示样式
          tooltip: {
            trigger: 'axis'   // axis   item   none三个值
          },
          series: [
            {
              name: '上限',
              data: [],
              type: 'line',
              symbol: 'none'
            },
            {
              name: '指标值',
              data: [],
              type: 'line'
            },
            {
              name: '下限',
              data: [],
              type: 'line',
              symbol: 'none'
            }
          ]

        },
        pieOption: {
          title: {
            text: ""
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          series: [
            {
              name: "指标健康情况",
              type: 'pie',
              selectedMode: 'single',
              radius: ['50%', '70%'],
              clockwise: false,
              label: {
                normal: {
                  position: 'outside',
                  formatter: '{b}\n{c}次 ({d}%)'
                }
              },
              data: [
                { value: 0, name: '正常' },
                { value: 0, name: '偏低' },
                { value: 0, name: '偏高' }
              ]
            }
          ],
          color:['#91cc75', '#fac858' , '#ea492e'],
          graphic: { // 添加原生图形元素组件
            elements: [{
              type: 'text', // 组件类型
              left: 'center', //定位
              top: '43%', // 定位
              style: { // 样式
                text: '检测次数', //文字
                fontSize: 13, //文字大小
                textAlign: 'center', //定位
                width: 30,
                height: 30,
                fill: 'darkgray' // 字体颜色
              }
            },
              {
                type: 'text',
                left: 'center',
                top: '52%',
                style: {
                  text: '80GB',
                  fontSize: 18,
                  textAlign: 'center',
                  width: 30,
                  height: 25,
                  fill: '#3BA5D9'
                }
              }]
          }
        }
      }
    },
    computed:{

    },
    methods: {
      showChart(row,children){
        let normal = 0;
        let ceiling = 0;
        let floor = 0;
        this.lineChartVisible = true
        if(row.danger == 1) ceiling++
        else if(row.danger == 2) floor++
        else normal++
        this.lineOption.xAxis.data=[]
        this.lineOption.xAxis.data.push(row.createTime)
        this.lineOption.series[0].data=[]
        this.lineOption.series[0].data.push(row.ceiling)
        this.lineOption.series[1].data=[]
        this.lineOption.series[1].data.push(row.val)
        this.lineOption.series[2].data=[]
        this.lineOption.series[2].data.push(row.floor)
        let this_ = this
        children.forEach(function(el) {
          if(el.danger == 1) ceiling++
          else if(el.danger == 2) floor++
          else normal++
          this_.lineOption.xAxis.data.push(el.createTime)
          this_.lineOption.series[0].data.push(el.ceiling)
          this_.lineOption.series[1].data.push(el.val)
          this_.lineOption.series[2].data.push(el.floor)
        });
        this_.pieOption.series[0].data[0].value=normal
        this_.pieOption.series[0].data[1].value=ceiling
        this_.pieOption.series[0].data[2].value=floor
        this_.pieOption.graphic.elements[1].style.text = normal+floor+ceiling+"次"
        this.lineChart.setOption(this.lineOption)
        this.pieChart.setOption(this.pieOption)
      },
      getAllGroup() {
        getAllGroups().then(
          (res) => {
            this.loading=false
            if (res.data.code === 0) {
              this.groupOptions=res.data.data
            } else {
              this.$message.error(res.data.msg);
            }
          })
      },
      getAllStatusDef() {
        getAllStatusDef().then(
          (res) => {
            this.loading=false
            if (res.data.code === 0) {
              this.statusDefOptions=res.data.data
            } else {
              this.$message.error(res.data.msg);
            }
          })
      },
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
      getIndexData(){
        if(this.groupValue==''&&this.statusDefValue==''&&this.dangerValue==''){
          this.$message.warning("大类，指标类型，异常情况至少选择一个")
          return
        }
        getStatusIndex(this.groupValue,this.statusDefValue,this.dangerValue,this.locationValue).then(
          (res) => {
            this.loading=false
            if (res.data.code === 0) {
              this.tableData=res.data.data
            } else {
              this.$message.error(res.data.msg);
            }
          })
      },
      dangerFormat(id) {
        if (id === '1') return 'el-icon-bottom'
        else if (id === '2') return 'el-icon-top'
        else return ''
      }

    },
    watch: {
      groupValue(newVal, oldVal) {
        this.loading=true
        getGroupDefRelationInfo(newVal).then(
          (res) => {
            this.loading=false
            if (res.data.code === 0) {
              this.statusDefOptions=res.data.data
            } else {
              this.$message.error(res.data.msg);
            }
          })
      }

    },
    mounted() {
      this.getAllGroup()
      this.getAllStatusDef()
      this.getAllLocation()
      this.$nextTick(() => {
        this.lineChart = echarts.init(document.getElementById('line'))
        this.lineChart.setOption(this.lineOption)
        this.pieChart = echarts.init(document.getElementById('pie'))
        this.pieChart.setOption(this.pieOption)

      });

    }
  }
</script>

