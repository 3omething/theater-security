<template>
    <el-container>
        <el-header>
            <div style="text-align: center; position: absolute; left: 20%; right: 20%">
                {{evlTypeText}}安全评估
            </div>

            <div style="float: right">
                <at-button type="primary" hollow @click="back">返回</at-button>
            </div>
        </el-header>
        <el-main>
            <div>
                <div style="width: 100%; height: 120px">
                    <div style="position: absolute; width: 50%; height: 20%; float: left; left: 14%; padding-left: 10%">
                        <div>
                            <div>
                                <div>
                                    <div>项目名称:</div>
                                    <at-input readonly style="width: 40%" :value="this.$store.state.Base.projectName"/>
                                </div>
                                <div>
                                    <div>评 估 人:</div>
                                    <at-input readonly style="width: 40%" :value="this.$store.state.Base.userName"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style="position: absolute; width: 50%; height: 20%; right: 0px; padding-left: 10%">
                        <div>
                            <div>
                                <div>巡查方法:</div>
                                <at-input readonly style="width: 40%" :value="this.$store.state.Base.evlMethod"/>
                            </div>
                            <div>
                                <div>评估时间:</div>
                                <at-input readonly style="width: 40%" :value="currentDate()"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="float: left; width: 200px">
                    <at-button type="primary" hollow @click="prevClicked">上一个</at-button>
                    <div>共{{currentPageCount + 1}}页</div>
                    <div>已答：{{answeredText}}</div>
                    <at-button type="primary" hollow @click="nextClicked">下一个</at-button>
                </div>
                <div style="float: right; width: 140px">
                    <div class="name">危险源分类:</div>
                    <at-input readonly style="width: 100%" :value="currentSourceType"/>
                </div>
                <div style="width: 400px; height: 100px; text-align: center; margin-left: auto; margin-right: auto; border: solid #c3d9ff; padding-top: 40px">
                    {{currentText}}
                </div>
                <div style="margin-top: 20px">
                    <div style="float: left; padding-right: 20px">事故可能性:</div>
                    <el-checkbox-group v-bind:value="checkbox1" v-on:input="checkbox1=$event">
                        <el-checkbox-button class="radio1Level0" label="极不可能" @change.native="checkbox1Click($event)"></el-checkbox-button>
                        <el-checkbox-button class="radio1Level1" label="不太可能" @change.native="checkbox1Click($event)"></el-checkbox-button>
                        <el-checkbox-button class="radio1Level2" label="有一定可能" @change.native="checkbox1Click($event)"></el-checkbox-button>
                        <el-checkbox-button class="radio1Level3" label="有可能" @change.native="checkbox1Click($event)"></el-checkbox-button>
                        <el-checkbox-button class="radio1Level4" label="很有可能" @change.native="checkbox1Click($event)"></el-checkbox-button>
                    </el-checkbox-group>
                </div>
                <div>
                    <div style="float: left; padding-right: 20px">事故严重性:</div>
                    <el-checkbox-group v-bind:value="checkbox2" v-on:input="checkbox2=$event">
                        <el-checkbox-button class="radio2Level0" label="无害" @change.native="checkbox2Click($event)"></el-checkbox-button>
                        <el-checkbox-button class="radio2Level1" label="轻微伤害" @change.native="checkbox2Click($event)"></el-checkbox-button>
                        <el-checkbox-button class="radio2Level2" label="一般伤害" @change.native="checkbox2Click($event)"></el-checkbox-button>
                        <el-checkbox-button class="radio2Level3" label="严重伤害" @change.native="checkbox2Click($event)"></el-checkbox-button>
                        <el-checkbox-button class="radio2Level4" label="人员死亡" @change.native="checkbox2Click($event)"></el-checkbox-button>
                    </el-checkbox-group>
                </div>
                <div>
                    <div style="float: left; padding-right: 20px; padding-left: 13px">评估结果:</div>
                    <el-checkbox-group v-bind:value="checkbox3" v-on:input="checkbox3=$event">
                        <el-checkbox-button class="radio3Level0" label="Ⅰ 低风险" ref="radio3Level0"></el-checkbox-button>
                        <el-checkbox-button class="radio3Level1" label="Ⅱ 中等风险" ref="radio3Level1"></el-checkbox-button>
                        <el-checkbox-button class="radio3Level2" label="Ⅲ 高风险" ref="radio3Level2"></el-checkbox-button>
                        <div style="position: absolute; width: 400px; height: 50px; margin-top: -50px"></div>
                    </el-checkbox-group>
                    <el-button type="primary" size="small" style="float: right" @click="onResultClick()">分析</el-button>
                </div>
            </div>
            <div style="width: 100%; height: 30%; bottom: 0px; left: 0px; right: 0px">
                <div style="text-align: center; padding-top: 20px">
                    北京工业大学剧场设计与舞台技术研究所 2018.06
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
        currentDataSource: null,
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
      const wb = XLSX.readFile(`${__dirname}/Data.xlsx`)
      const ws = wb.Sheets[wb.SheetNames[0]]
      this.dataSource = XLSX.utils.sheet_to_json(ws)
      this.refreshData()
      // this.$nextTick(function () {
      // })
    },
    methods: {
      checkbox1Click (e) {
        this.checkbox1 = [e.target.value]
        var radioIndex = this.radio1s.indexOf(e.target.value)
        this.currentDataSource[this.currentPageCount].possibilityLevel = radioIndex
        this.calTotalLevel(radioIndex, null)
      },
      checkbox2Click (e) {
        this.checkbox2 = [e.target.value]
        var radioIndex = this.radio2s.indexOf(e.target.value)
        this.currentDataSource[this.currentPageCount].safetyLevel = radioIndex
        this.calTotalLevel(null, radioIndex)
      },
      prevClicked () {
        if (this.currentPageCount > 0) {
          this.changePage(this.currentPageCount - 1)
        }
      },
      nextClicked () {
        if (this.currentPageCount < this.currentDataSource.length - 1) {
          this.changePage(this.currentPageCount + 1)
        }
      },
      changePage (pageNum) {
        this.currentPageCount = pageNum
        this.currentText = this.currentDataSource[this.currentPageCount]['危险源']
        this.currentSourceType = this.currentDataSource[this.currentPageCount]['分类一']
        var possibilityLevel = this.currentDataSource[this.currentPageCount].possibilityLevel
        if (possibilityLevel !== undefined) {
          this.checkbox1 = [this.radio1s[possibilityLevel]]
        } else {
          this.checkbox1 = []
        }
        var safetyLevel = this.currentDataSource[this.currentPageCount].safetyLevel
        if (safetyLevel !== undefined) {
          this.checkbox2 = [this.radio2s[safetyLevel]]
        } else {
          this.checkbox2 = []
        }
        var totalLevel = this.currentDataSource[this.currentPageCount].totalLevel
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
        this.$store.commit('setEvlData', this.currentDataSource)
        this.$router.push('/resultPage')
      },
      currentDate () {
        return new Date().toISOString().slice(0, 10)
      },
      refreshData () {
        var arr = this.dataSource.slice(2, this.dataSource.length)
        var result = []
        var ranNum = arr.length
        for (var i = 0; i < ranNum; i++) {
          var ran = Math.floor(Math.random() * (arr.length - i))
          result.push(arr[ran])
          arr[ran] = arr[arr.length - i - 1]
        }
        this.currentDataSource = Object.assign([], result)
        this.pageCount = this.currentDataSource.length - 1
        this.currentText = this.currentDataSource[0]['危险源']
        this.currentSourceType = this.currentDataSource[this.currentPageCount]['分类一']
        this.currentPageCount = 0

        this.answeredText = this.answeredCount() + '/' + this.currentDataSource.length
      },
      calTotalLevel (radio1Index, radio2Index) {
        var possibilityLevel = radio1Index
        var safetyLevel = radio2Index
        if (possibilityLevel == null) {
          possibilityLevel = this.currentDataSource[this.currentPageCount].possibilityLevel
          if (possibilityLevel === undefined) {
            return
          }
        }
        if (safetyLevel == null) {
          safetyLevel = this.currentDataSource[this.currentPageCount].safetyLevel
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
        this.currentDataSource[this.currentPageCount].totalLevel = totalLevelType
        this.answeredText = this.answeredCount() + '/' + this.currentDataSource.length
      },
      answeredCount () {
        var results = this.currentDataSource.filter(function (data) {
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
    .el-checkbox-button.radio1Level0.is-checked .el-checkbox-button__inner {
        background-color: green;
        color: #606266;
    }
    .el-checkbox-button.radio1Level0 .el-checkbox-button__inner {
        background-color: green;
        color: #ffffff;
    }
    .el-checkbox-button.radio1Level1.is-checked .el-checkbox-button__inner {
        background-color: greenyellow;
        color: #606266;
    }
    .el-checkbox-button.radio1Level1 .el-checkbox-button__inner {
        background-color: greenyellow;
        color: #ffffff;
    }
    .el-checkbox-button.radio1Level2.is-checked .el-checkbox-button__inner {
        background-color: yellow;
        color: #606266;
    }
    .el-checkbox-button.radio1Level2 .el-checkbox-button__inner {
        background-color: yellow;
        color: #ffffff;
    }
    .el-checkbox-button.radio1Level3.is-checked .el-checkbox-button__inner {
        background-color: orange;
        color: #606266;
    }
    .el-checkbox-button.radio1Level3 .el-checkbox-button__inner {
        background-color: orange;
        color: #ffffff;
    }
    .el-checkbox-button.radio1Level4.is-checked .el-checkbox-button__inner {
        background-color: red;
        color: #606266;
    }
    .el-checkbox-button.radio1Level4 .el-checkbox-button__inner {
        background-color: red;
        color: #ffffff;
    }

    .el-checkbox-button.radio2Level0.is-checked .el-checkbox-button__inner {
        background-color: green;
        color: #606266;
    }
    .el-checkbox-button.radio2Level0 .el-checkbox-button__inner {
        background-color: green;
        color: #ffffff;
    }
    .el-checkbox-button.radio2Level1.is-checked .el-checkbox-button__inner {
        background-color: greenyellow;
        color: #606266;
    }
    .el-checkbox-button.radio2Level1 .el-checkbox-button__inner {
        background-color: greenyellow;
        color: #ffffff;
    }
    .el-checkbox-button.radio2Level2.is-checked .el-checkbox-button__inner {
        background-color: yellow;
        color: #606266;
    }
    .el-checkbox-button.radio2Level2 .el-checkbox-button__inner {
        background-color: yellow;
        color: #ffffff;
    }
    .el-checkbox-button.radio2Level3.is-checked .el-checkbox-button__inner {
        background-color: orange;
        color: #606266;
    }
    .el-checkbox-button.radio2Level3 .el-checkbox-button__inner {
        background-color: orange;
        color: #ffffff;
    }
    .el-checkbox-button.radio2Level4.is-checked .el-checkbox-button__inner {
        background-color: red;
        color: #606266;
    }
    .el-checkbox-button.radio2Level4 .el-checkbox-button__inner {
        background-color: red;
        color: #ffffff;
    }

    .el-checkbox-button.radio3Level0.is-checked .el-checkbox-button__inner {
        background-color: green;
        color: #606266;
    }
    .el-checkbox-button.radio3Level0 .el-checkbox-button__inner {
        background-color: green;
        color: #ffffff;
    }
    .el-checkbox-button.radio3Level1.is-checked .el-checkbox-button__inner {
        background-color: greenyellow;
        color: #606266;
    }
    .el-checkbox-button.radio3Level1 .el-checkbox-button__inner {
        background-color: greenyellow;
        color: #ffffff;
    }
    .el-checkbox-button.radio3Level2.is-checked .el-checkbox-button__inner {
        background-color: yellow;
        color: #606266;
    }
    .el-checkbox-button.radio3Level2 .el-checkbox-button__inner {
        background-color: yellow;
        color: #ffffff;
    }
</style>