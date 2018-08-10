<template>
    <el-container>
        <el-header>
            <div style="float: left">
                <img src="./icon_logo_bjut.png" style="width: 180px; height: 50px; left: 0px; top: 0px;"/>
            </div>
            <div style="float: right; margin-top: 24px">
                <input type="button" class="back-button" @click="back()" value="返回"/>
            </div>
            <div style="width: 100%; display: flex; justify-content: center; align-items: center; color: #666666">
                <span style="font-size: 30px; margin-top: -30px">{{evlTypeText}}安全评估</span>
            </div>
        </el-header>

        <el-main>
            <div>
                <div style="width: 100%; height: 80px; padding-left: 10%; padding-right: 10%; margin-top: 5%">
                    <div style="float: left; width: 25%">
                        <div>项目名称:</div>
                        <at-input readonly style="width: 80%" :value="this.$store.state.Base.projectName"/>
                    </div>
                    <div style="float: left; width: 25%">
                        <div>评 估 人:</div>
                        <at-input readonly style="width: 80%" :value="this.$store.state.Base.userName"/>
                    </div>
                    <div style="float: left; width: 25%">
                        <div>巡查方法:</div>
                        <at-input readonly style="width: 80%" :value="this.$store.state.Base.evlMethod"/>
                    </div>
                    <div style="float: left; width: 25%">
                        <div>评估时间:</div>
                        <at-input readonly style="width: 80%" :value="currentDate()"/>
                    </div>
                </div>
                <div style="float: left; width: 200px; height: 300px; margin-left: 4%; margin-top: 5%">
                    <div style="position: relative; float: right; top: 0px; height: 100%; width: 50%; right: 0px">
                        <div style="margin-top: 35%; text-align: center">共{{currentPageCount + 1}}页</div>
                        <div style="margin-top: 20%; text-align: center">已答：{{answeredText}}</div>

                        <div style="margin-top: 80%; text-align: right">事故可能性:</div>
                        <div style="margin-top: 25%; text-align: right">事故严重性:</div>
                        <div style="margin-top: 25%; text-align: right">评估结果:</div>
                    </div>
                    <div style="position: relative; float: left; top: 0px; height: 100%; width: 50%; left: 0px">
                        <input type="button" class="prev-button" @click="prevClicked()" value="上一个"/>
                        <input type="button" class="next-button" @click="nextClicked()" value="下一个"/>
                    </div>
                </div>
                <div style="float: right; width: 180px; margin-right: 4%; margin-top: 5%">
                    <div style="">危险源分类:</div>
                    <at-input readonly style="width: 100%" :value="currentSourceType"/>
                </div>
                <div style="width: 500px; height: 300px; margin-left: auto; margin-right: auto; margin-top: 5%">
                    <div style="width: 100%; height: 50%; border: solid #339966; text-align: center; padding-top: 60px; margin-bottom: 20px; font-size: 20px">
                        {{currentText}}
                    </div>
                    <el-checkbox-group v-bind:value="checkbox1" v-on:input="checkbox1=$event">
                        <el-checkbox-button class="radio1Level0" label="极不可能" @change.native="checkbox1Click($event)"></el-checkbox-button>
                        <el-checkbox-button class="radio1Level1" label="不太可能" @change.native="checkbox1Click($event)"></el-checkbox-button>
                        <el-checkbox-button class="radio1Level2" label="有一定可能" @change.native="checkbox1Click($event)"></el-checkbox-button>
                        <el-checkbox-button class="radio1Level3" label="有可能" @change.native="checkbox1Click($event)"></el-checkbox-button>
                        <el-checkbox-button class="radio1Level4" label="很有可能" @change.native="checkbox1Click($event)"></el-checkbox-button>
                    </el-checkbox-group>
                    <el-checkbox-group v-bind:value="checkbox2" v-on:input="checkbox2=$event">
                        <el-checkbox-button class="radio2Level0" label="无害" @change.native="checkbox2Click($event)"></el-checkbox-button>
                        <el-checkbox-button class="radio2Level1" label="轻微伤害" @change.native="checkbox2Click($event)"></el-checkbox-button>
                        <el-checkbox-button class="radio2Level2" label="一般伤害" @change.native="checkbox2Click($event)"></el-checkbox-button>
                        <el-checkbox-button class="radio2Level3" label="严重伤害" @change.native="checkbox2Click($event)"></el-checkbox-button>
                        <el-checkbox-button class="radio2Level4" label="人员死亡" @change.native="checkbox2Click($event)"></el-checkbox-button>
                    </el-checkbox-group>
                    <el-checkbox-group v-bind:value="checkbox3" v-on:input="checkbox3=$event">
                        <el-checkbox-button class="radio3Level0" label="Ⅰ 低风险" ref="radio3Level0"></el-checkbox-button>
                        <el-checkbox-button class="radio3Level1" label="Ⅱ 中等风险" ref="radio3Level1"></el-checkbox-button>
                        <el-checkbox-button class="radio3Level2" label="Ⅲ 高风险" ref="radio3Level2"></el-checkbox-button>
                        <div style="position: absolute; width: 500px; height: 50px; margin-top: -50px"></div>
                    </el-checkbox-group>
                </div>
                <div>
                    <input type="button" class="info-right-button" @click="onResultClick()" value="结果"/>
                </div>
            </div>
            <div style="width: 100%; height: 30%; bottom: 0px; left: 0px; right: 0px">
                <div style="position: absolute; text-align: center; bottom: 0px; width: 100%; padding-bottom: 10px">
                    北京工业大学剧场设计与舞台技术研究所 2018.08
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script>
  // import xlsx from 'node-xlsx'
  import XLSX from 'xlsx'
  import paginate from 'vuejs-paginate'
  export default {
    components: {
      paginate
    },
    data () {
      return {
        dataSource: null,
        currentText: '',
        pageCount: 0,
        currentPageCount: 0,
        radio1: '极不可能',
        radio2: '无害',
        radio3: 'Ⅰ 低风险',
        radio1s: ['极不可能', '不太可能', '有一定可能', '有可能', '很有可能'],
        radio2s: ['无害', '轻微伤害', '一般伤害', '严重伤害', '人员死亡'],
        radio3s: ['Ⅰ 低风险', 'Ⅱ 中等风险', 'Ⅲ 高风险'],
        checkbox1: [],
        checkbox2: [],
        checkbox3: [],
        answeredText: '0/0',
        currentSourceType: '123'
      }
    },
    mounted () {
      console.log(this.$store.state.Base.evlData[0])
      if (this.$store.state.Base.evlData !== '') {
        this.dataSource = this.$store.state.Base.evlData
        this.refreshData()
        this.changePage(0)
      } else {
        const wb = XLSX.readFile(`${__dirname}/Data.xlsx`)
        const ws = wb.Sheets[wb.SheetNames[0]]
        this.dataSource = XLSX.utils.sheet_to_json(ws)
        this.dataSource = this.dataSource.slice(2, this.dataSource.length)
        this.refreshData()
      }
      // this.$nextTick(function () {
      // })
    },
    methods: {
      checkbox1Click (e) {
        this.checkbox1 = [e.target.value]
        var radioIndex = this.radio1s.indexOf(e.target.value)
        this.dataSource[this.currentPageCount].possibilityLevel = radioIndex
        this.calTotalLevel(radioIndex, null)
      },
      checkbox2Click (e) {
        this.checkbox2 = [e.target.value]
        var radioIndex = this.radio2s.indexOf(e.target.value)
        this.dataSource[this.currentPageCount].safetyLevel = radioIndex
        this.calTotalLevel(null, radioIndex)
      },
      prevClicked () {
        if (this.currentPageCount > 0) {
          this.changePage(this.currentPageCount - 1)
        }
      },
      nextClicked () {
        if (this.currentPageCount < this.dataSource.length - 1) {
          this.changePage(this.currentPageCount + 1)
        }
      },
      changePage (pageNum) {
        this.currentPageCount = pageNum
        this.currentText = this.dataSource[this.currentPageCount]['危险源']
        this.currentSourceType = this.dataSource[this.currentPageCount]['分类一']
        var possibilityLevel = this.dataSource[this.currentPageCount].possibilityLevel
        if (possibilityLevel !== undefined) {
          this.checkbox1 = [this.radio1s[possibilityLevel]]
        } else {
          this.checkbox1 = []
        }
        var safetyLevel = this.dataSource[this.currentPageCount].safetyLevel
        if (safetyLevel !== undefined) {
          this.checkbox2 = [this.radio2s[safetyLevel]]
        } else {
          this.checkbox2 = []
        }
        var totalLevel = this.dataSource[this.currentPageCount].totalLevel
        if (totalLevel !== undefined) {
          this.checkbox3 = [this.radio3s[totalLevel]]
        } else {
          this.checkbox3 = []
        }
      },
      back () {
        this.$router.back('/')
      },
      onResultClick () {
        this.$store.commit('setEvlData', this.dataSource)
        this.$router.push('/resultPage')
      },
      currentDate () {
        return new Date().toISOString().slice(0, 10)
      },
      refreshData () {
        this.pageCount = this.dataSource.length - 1
        this.currentText = this.dataSource[0]['危险源']
        this.currentSourceType = this.dataSource[this.currentPageCount]['分类一']
        this.currentPageCount = 0

        this.answeredText = this.answeredCount() + '/' + this.dataSource.length
      },
      calTotalLevel (radio1Index, radio2Index) {
        var possibilityLevel = radio1Index
        var safetyLevel = radio2Index
        if (possibilityLevel == null) {
          possibilityLevel = this.dataSource[this.currentPageCount].possibilityLevel
          if (possibilityLevel === undefined) {
            return
          }
        }
        if (safetyLevel == null) {
          safetyLevel = this.dataSource[this.currentPageCount].safetyLevel
          if (safetyLevel === undefined) {
            return
          }
        }
        var totalLevelValue = (possibilityLevel + 1) * (safetyLevel + 1)
        var totalLevelType = 0
        if (totalLevelValue < 6) {
          totalLevelType = 0
          this.checkbox3 = [this.radio3s[0]]
        } else if (totalLevelValue < 12) {
          totalLevelType = 1
          this.checkbox3 = [this.radio3s[1]]
        } else { // totalLevel < 25
          totalLevelType = 2
          this.checkbox3 = [this.radio3s[2]]
        }
        this.dataSource[this.currentPageCount].totalLevel = totalLevelType
        this.answeredText = this.answeredCount() + '/' + this.dataSource.length
      },
      answeredCount () {
        var results = this.dataSource.filter(function (data) {
          return data.totalLevel !== undefined
        })
        return results.length
      }
    },
    computed: {
      evlTypeText () {
        switch (this.$store.state.Base.evlType) {
          case 0:
            return '剧场安全'
          case 1:
            return '舞台设备'
          case 2:
            return '演出管理'
        }
      }
    }
  }
</script>

<style>
    .prev-button, .next-button {
        background-color: #339966;
        border: none;
        color: white;
        padding: 4px 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        cursor: pointer;
        border-radius: 4px;
    }
    .prev-button {
        float: right;
        margin-top: 30%
    }
    .next-button {
        float: right;
        margin-top: 10%
    }
    .el-checkbox-button.radio1Level0.is-checked .el-checkbox-button__inner {
        background-color: green;
        color: black;
        width: 100px;
    }
    .el-checkbox-button.radio1Level0 .el-checkbox-button__inner {
        background-color: #B4D3B0;
        color: #606266;
        width: 100px;
    }
    .el-checkbox-button.radio1Level1.is-checked .el-checkbox-button__inner {
        background-color: greenyellow;
        color: black;
        width: 100px;
    }
    .el-checkbox-button.radio1Level1 .el-checkbox-button__inner {
        background-color: #C8E7C2;
        color: #606266;
        width: 100px;
    }
    .el-checkbox-button.radio1Level2.is-checked .el-checkbox-button__inner {
        background-color: yellow;
        color: black;
        width: 100px;
    }
    .el-checkbox-button.radio1Level2 .el-checkbox-button__inner {
        background-color: #FBFAC5;
        color: #606266;
        width: 100px;
    }
    .el-checkbox-button.radio1Level3.is-checked .el-checkbox-button__inner {
        background-color: orange;
        color: black;
        width: 100px;
    }
    .el-checkbox-button.radio1Level3 .el-checkbox-button__inner {
        background-color: #F7D5B1;
        color: #606266;
        width: 100px;
    }
    .el-checkbox-button.radio1Level4.is-checked .el-checkbox-button__inner {
        background-color: red;
        color: black;
        width: 100px;
    }
    .el-checkbox-button.radio1Level4 .el-checkbox-button__inner {
        background-color: #E69390;
        color: #606266;
        width: 100px;
    }

    .el-checkbox-button.radio2Level0.is-checked .el-checkbox-button__inner {
        background-color: green;
        color: black;
        width: 100px;
    }
    .el-checkbox-button.radio2Level0 .el-checkbox-button__inner {
        background-color: #B4D3B0;
        color: #606266;
        width: 100px;
    }
    .el-checkbox-button.radio2Level1.is-checked .el-checkbox-button__inner {
        background-color: greenyellow;
        color: black;
        width: 100px;
    }
    .el-checkbox-button.radio2Level1 .el-checkbox-button__inner {
        background-color: #C8E7C2;
        color: #606266;
        width: 100px;
    }
    .el-checkbox-button.radio2Level2.is-checked .el-checkbox-button__inner {
        background-color: yellow;
        color: black;
    }
    .el-checkbox-button.radio2Level2 .el-checkbox-button__inner {
        background-color: #FBFAC5;
        color: #606266;
        width: 100px;
    }
    .el-checkbox-button.radio2Level3.is-checked .el-checkbox-button__inner {
        background-color: orange;
        color: black;
        width: 100px;
    }
    .el-checkbox-button.radio2Level3 .el-checkbox-button__inner {
        background-color: #F7D5B1;
        color: #606266;
        width: 100px;
    }
    .el-checkbox-button.radio2Level4.is-checked .el-checkbox-button__inner {
        background-color: red;
        color: black;
        width: 100px;
    }
    .el-checkbox-button.radio2Level4 .el-checkbox-button__inner {
        background-color: #E69390;
        color: #606266;
        width: 100px;
    }

    .el-checkbox-button.radio3Level0.is-checked .el-checkbox-button__inner {
        background-color: green;
        color: black;
        width: 166.67px;
    }
    .el-checkbox-button.radio3Level0 .el-checkbox-button__inner {
        background-color: #B4D3B0;
        color: #606266;
        width: 166.67px;
    }
    .el-checkbox-button.radio3Level1.is-checked .el-checkbox-button__inner {
        background-color: yellow;
        color: black;
        width: 166.67px;
    }
    .el-checkbox-button.radio3Level1 .el-checkbox-button__inner {
        background-color: #FBFAC5;
        color: #606266;
        width: 166.67px;
    }
    .el-checkbox-button.radio3Level2.is-checked .el-checkbox-button__inner {
        background-color: red;
        color: black;
        width: 166.67px;
    }
    .el-checkbox-button.radio3Level2 .el-checkbox-button__inner {
        background-color: #E69390;
        color: #606266;
        width: 166.67px;
    }
    .info-right-button {
        background-color: #339966;
        border: none;
        color: white;
        padding: 4px 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        cursor: pointer;
        border-radius: 4px;
        float: right;
        margin-top: 40px;
    }
    .back-button {
        background-color: #339966;
        border: none;
        color: white;
        padding: 4px 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        cursor: pointer;
        border-radius: 4px;
    }
</style>