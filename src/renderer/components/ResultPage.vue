<template>
    <el-container>
        <el-header><div style="text-align: center; position: absolute; left: 20%; right: 20%">
                《演出安全管理体系》
            </div>

            <div style="float: right">
                <at-button type="primary" hollow @click="back">返回</at-button>
            </div>
        </el-header>
        <el-main style="height: 500px">
            <table-component :data=data1 :show-filter="false">
                <table-column show="firstName" label="危险/潜在伤害"></table-column>
                <table-column label="之前的风险级别">
                    <template slot-scope="row">
                        <table-component :data=row.eval :show-filter="false">
                            <table-column show="name" label=""></table-column>
                            <table-column show="value" label=""></table-column>
                        </table-component>
                    </template>
                </table-column>
                <table-column show="lastName" label="现有以及新增的风险控制措施"></table-column>
            </table-component>
        </el-main>
        <div style="width: 100%; height: 30%; bottom: 0px; left: 0px; right: 0px">
            <div style="text-align: center; padding-top: 20px">
                北京工业大学剧场设计与舞台技术研究所 2018.06
            </div>
        </div>
    </el-container>
</template>

<script>
    export default {
      data () {
        const item = {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
        return {
          dataSources: null,
          currentText: '',
          pageCount: 0,
          radio1: '极不可能',
          radio2: '无害',
          radio3: 'Ⅰ 低风险',
          data1: [],
          data2: [],
          tableData: Array(20).fill(item)
        }
      },
      mounted () {
        this.dataSources = this.$store.state.Base.evlData
        var that = this
        this.$nextTick(function () {
          this.dataSources.forEach(function (dataSource) {
            that.data1.push({
              firstName: dataSource[3],
              lastName: dataSource[3],
              eval: [
                { name: '可能性', value: dataSource.possibilityLevel },
                { name: '严重性', value: dataSource.safetyLevel },
                { name: '风险评分', value: dataSource.totalLevel }
              ] })
          })
        })
      },
      methods: {
        back () {
          this.$router.back('/')
        }
      },
      computed: {

      }
    }
</script>

<style lang="scss">
    *:after,
    *:before {
        position: relative;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    .table-component {
        display: flex;
        flex-direction: column;
    }

    .table-component__filter {
        align-self: flex-end;
    }

    .table-component__filter__field {
        padding: 0 1.25em 0 .75em;
        height: 2.5em;
        border: solid 2px #e0e0e0;
        border-radius: 2em;
        font-size: inherit;
    }

    .table-component__filter__clear {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2em;
        color: #007593;
        font-weight: bold;
        cursor: pointer;
    }

    .table-component__filter__field:focus {
        outline: 0;
        border-color: #007593;
    }

    .table-component__table-wrapper {
        overflow-x: auto;
        width: 100%;
        border: solid 1px #ddd;
        border-bottom: none;
    }

    .table-component__table {
        min-width: 100%;
        border-collapse: collapse;
        border-bottom: solid 1px #ddd;
        table-layout: fixed;
    }

    .table-component__table__caption {
        position: absolute;
        top: auto;
        left: -10000px;
        overflow: hidden;
        width: 1px;
        height: 1px;
    }

    .table-component__table th,
    .table-component__table td {
        vertical-align: top;
        text-align: left;
    }

    .table-component__table th {
        background-color: #e0e0e0;
        color: #999;
        text-transform: uppercase;
        white-space: nowrap;
        font-size: .85em;
    }

    .table-component__table tbody tr:nth-child(even) {
        background-color: #f0f0f0;
    }

    .table-component__table a {
        color: #007593;
    }

    .table-component__message {
        color: #999;
        font-style: italic;
    }

    .table-component__th--sort,
    .table-component__th--sort-asc,
    .table-component__th--sort-desc {
        text-decoration: underline;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .table-component__th--sort-asc:after,
    .table-component__th--sort-desc:after {
        position: absolute;
        left: .25em;
        display: inline-block;
        color: #bbb;
    }

    .table-component__th--sort-asc:after {
        content: '↑';
    }

    .table-component__th--sort-desc:after {
        content: '↓';
    }
</style>