<template>
    <el-container>
        <el-header>
            <div style="float: left; margin-top: 30px">
                <img src="./icon_logo_bjut.png" style="width: 180px; height: 50px; left: 0px; top: 0px;"/>
            </div>
            <div style="float: right; margin-top: 40px">
                <input type="button" class="info-button" @click="back()" value="返回"/>
                <input type="button" class="info-button" @click="onExportClicked()" value="导出"/>
            </div>
            <div style="width: 100%; display: flex; justify-content: center; align-items: center; color: #666666">
                <span style="font-size: 50px; margin-top: -30px">《演出风险评估表》</span>
            </div>
        </el-header>
        <el-main style="position: absolute; width: 100%; top: 18%; bottom: 0px">
            <div style="width: 100%; height: 40px; padding-left: 3%; padding-right: 3%">
                <div style="float: left; width: 25%">
                    <div style="float: left">项目名称: {{this.$store.state.Base.projectName}}</div>
                </div>
                <div style="float: left; width: 25%">
                    <div>评 估 人: {{this.$store.state.Base.userName}}</div>
                </div>
                <div style="float: left; width: 25%">
                    <div>巡查方法: {{this.$store.state.Base.evlMethod}}</div>
                </div>
                <div style="float: left; width: 25%">
                    <div>评估时间: {{currentDate()}}</div>
                </div>
            </div>
            <div style="margin-top: -10px; margin-left: 3%; width: 94%; height: 60%; background-color: white">
                <scroller style="position: relative">
                    <table-component :data=data1 :show-filter="false" id="pdfDom">
                        <table-column show="firstName" label="危险/潜在伤害" cellClass="column1"></table-column>
                        <table-column label="之前的风险级别" cellClass="column2">
                            <template slot-scope="row">
                                <table-component :data=row.eval :show-filter="false">
                                    <table-column show="name" label=""></table-column>
                                    <table-column show="value" label=""></table-column>
                                </table-component>
                            </template>
                        </table-column>
                        <table-column show="lastName" label="现有以及新增的风险控制措施" cellClass="column3"></table-column>
                    </table-component>
                </scroller>
            </div>
            <div style="margin-left: 3%; width: 100%; height: 10%; padding-top: 20px">
                <div style="float: left; top: 0px; left: 0px; height: 100%; width: 10%;">
                    <div style="">事故可能性:</div>
                    <div style="margin-top: 3px">事故严重性:</div>
                    <div style="margin-top: 3px">评估结果:</div>
                </div>
                <div style="float: right; top: 0px; left: 20%; height: 100%; width: 90%">
                    <el-checkbox-group>
                        <el-checkbox-button class="radio1Level0_a" label="I"></el-checkbox-button>
                        <el-checkbox-button class="radio1Level1_a" label="II"></el-checkbox-button>
                        <el-checkbox-button class="radio1Level2_a" label="III"></el-checkbox-button>
                        <el-checkbox-button class="radio1Level3_a" label="IV"></el-checkbox-button>
                        <el-checkbox-button class="radio1Level4_a" label="V"></el-checkbox-button>
                        <div style="position: absolute; width: 500px; height: 50px; margin-top: -50px"></div>
                    </el-checkbox-group>
                    <el-checkbox-group>
                        <el-checkbox-button class="radio2Level0_a" label="I"></el-checkbox-button>
                        <el-checkbox-button class="radio2Level1_a" label="II"></el-checkbox-button>
                        <el-checkbox-button class="radio2Level2_a" label="III"></el-checkbox-button>
                        <el-checkbox-button class="radio2Level3_a" label="IV"></el-checkbox-button>
                        <el-checkbox-button class="radio2Level4_a" label="V"></el-checkbox-button>
                        <div style="position: absolute; width: 500px; height: 50px; margin-top: -50px"></div>
                    </el-checkbox-group>
                    <el-checkbox-group>
                        <el-checkbox-button class="radio3Level0_a" label="I"></el-checkbox-button>
                        <el-checkbox-button class="radio3Level1_a" label="II"></el-checkbox-button>
                        <el-checkbox-button class="radio3Level2_a" label="III"></el-checkbox-button>
                        <div style="position: absolute; width: 500px; height: 50px; margin-top: -50px"></div>
                    </el-checkbox-group>
                </div>
            </div>
            <div style="width: 100%; height: 50px; bottom: 0px; left: 0px; right: 0px">
                <div style="position: absolute; text-align: center; left: 0px; bottom: 20px; width: 100%; padding-bottom: 10px; color: black">
                    北京工业大学剧场设计与舞台技术研究所 2018.08
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script>
    import html2Canvas from 'html2canvas'
    import JsPDF from 'jspdf'
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
              firstName: dataSource['危险源'],
              lastName: dataSource['分类一'],
              eval: [
                { name: '可能性', value: dataSource.possibilityLevel === undefined ? 0 : dataSource.possibilityLevel + 1 },
                { name: '严重性', value: dataSource.safetyLevel === undefined ? 0 : dataSource.safetyLevel + 1 },
                { name: '风险评分', value: dataSource.totalLevel === undefined ? 0 : dataSource.totalLevel + 1 }
              ] })
          })
        })
      },
      methods: {
        back () {
          this.$router.back('/')
        },
        onExportClicked () {
          this.exportPDF()
        },
        exportPDF () {
          html2Canvas(document.querySelector('#pdfDom'), {
            allowTaint: true
          }).then(function (canvas) {
            let contentWidth = canvas.width
            let contentHeight = canvas.height
            let pageHeight = contentWidth / 592.28 * 841.89
            let leftHeight = contentHeight
            let position = 0
            let imgWidth = 595.28
            let imgHeight = 592.28 / contentWidth * contentHeight
            let pageData = canvas.toDataURL('image/jpeg', 1.0)
            let PDF = new JsPDF('', 'pt', 'a4')
            if (leftHeight < pageHeight) {
              PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
            } else {
              while (leftHeight > 0) {
                PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                leftHeight -= pageHeight
                position -= 841.89
                if (leftHeight > 0) {
                  PDF.addPage()
                }
              }
            }
            PDF.save(this.$store.state.Base.projectName + '.pdf')
          })
        },
        currentDate () {
          return new Date().toISOString().slice(0, 10)
        }
      },
      computed: {

      }
    }
</script>

<style lang="scss">
    .column1 {
        width: 40%;

    }
    .column2 {
        width: 30%;
    }
    .column3 {
        width: 30%;
    }
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
        vertical-align: center;
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

    .el-checkbox-button.radio1Level0_a .el-checkbox-button__inner {
        background-color: green;
        color: black;
        width: 120px;
        padding: 2px 0px;
    }
    .el-checkbox-button.radio1Level1_a .el-checkbox-button__inner {
        background-color: greenyellow;
        color: black;
        width: 120px;
        padding: 2px 0;
    }
    .el-checkbox-button.radio1Level2_a .el-checkbox-button__inner {
        background-color: yellow;
        color: black;
        width: 120px;
        padding: 2px 0;
    }
    .el-checkbox-button.radio1Level3_a .el-checkbox-button__inner {
        background-color: orange;
        color: black;
        width: 120px;
        padding: 2px 0;
    }
    .el-checkbox-button.radio1Level4_a .el-checkbox-button__inner {
        background-color: red;
        color: black;
        width: 120px;
        padding: 2px 0;
    }

    .el-checkbox-button.radio2Level0_a .el-checkbox-button__inner {
        background-color: green;
        color: black;
        width: 120px;
        padding: 2px 0;
    }
    .el-checkbox-button.radio2Level1_a .el-checkbox-button__inner {
        background-color: greenyellow;
        color: black;
        width: 120px;
        padding: 2px 0;
    }
    .el-checkbox-button.radio2Level2_a .el-checkbox-button__inner {
        background-color: yellow;
        color: black;
        width: 120px;
        padding: 2px 0;
    }
    .el-checkbox-button.radio2Level3_a .el-checkbox-button__inner {
        background-color: orange;
        color: black;
        width: 120px;
        padding: 2px 0;
    }
    .el-checkbox-button.radio2Level4_a .el-checkbox-button__inner {
        background-color: red;
        color: black;
        width: 120px;
        padding: 2px 0;
    }

    .el-checkbox-button.radio3Level0_a .el-checkbox-button__inner {
        background-color: green;
        color: black;
        width: 200px;
        padding: 2px 0;
    }
    .el-checkbox-button.radio3Level1_a .el-checkbox-button__inner {
        background-color: yellow;
        color: black;
        width: 200px;
        padding: 2px 0;
    }
    .el-checkbox-button.radio3Level2_a .el-checkbox-button__inner {
        background-color: red;
        color: black;
        width: 200px;
        padding: 2px 0;
    }
</style>