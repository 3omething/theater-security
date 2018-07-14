<template>
    <el-container>
        <el-header>
            <div style="float: left">
                <div>《演出安全管理体系》</div>
            </div>

            <div style="float: right">
                <at-button type="primary" hollow @click="onTipClick()">说明</at-button>
            </div>
        </el-header>
        <el-main>
            <div>
                <div style="width: 100%; display: flex; justify-content: center; align-items: center;">
                    <span style="font-size: 40px">演出安全评估</span>
                </div>
                <main>
                    <div style="position: absolute; width: 50%; height: 40%; float: left; left: 0px; padding-left: 10%">
                        <div>
                            <div class="items">
                                <div class="item">
                                    <div class="name">项目名称:</div>
                                    <at-input placeholder="填入项" style="float: left" v-bind:value="projectName" v-on:input="projectName=$event"/>
                                    <at-button type="primary" hollow>项目概要</at-button>
                                </div>
                                <div class="item">
                                    <div class="name">评 估 人:</div>
                                    <at-input placeholder="填入项" style="float: left" v-bind:value="userName" v-on:input="userName=$event"/>
                                    <at-button type="primary" hollow>资格证书</at-button>
                                </div>
                                <div class="item">
                                    <div class="name">授权密码:</div>
                                    <at-input type="password" placeholder="填入项" style="width: 50%" v-bind:value="userPassword" v-on:input="userPassword=$event"/>
                                </div>
                            </div>
                        </div>
                        <div style="position: absolute; width: 1px; height: 110%; top: 0px; bottom: 0px; right: 0px; background-color: black"></div>
                        <div style="position: absolute; left: 60%; right: 0px; height: 1px; bottom: 0px; background-color: black"></div>
                        <div style="position: absolute; width: 1px; left: 60%; height: 20px; bottom: -20px; background-color: black"></div>
                    </div>
                    <div style="position: absolute; width: 50%; height: 40%; right: 0px; padding-left: 10%">
                        <div class="items">
                            <div class="item">
                                <div class="name">巡查方法:</div>
                                <at-select size="large" style="width: 50%" v-bind:value="evlMethod" v-on:input="evlMethod=$event">
                                    <at-option value="1">巡查</at-option>
                                    <at-option value="2">访谈</at-option>
                                    <at-option value="3">座谈</at-option>
                                </at-select>
                            </div>
                            <div class="item">
                                <div class="name">评估时间:</div>
                                <at-input readonly style="width: 50%" :value="currentDate()"/>
                            </div>
                        </div>
                        <div style="position: absolute; left: 0px; right: 0px; height: 1px; bottom: 0px; background-color: black; margin-right: 60%"></div>
                        <div style="position: absolute; width: 1px; right: 60%; height: 20px; bottom: -20px; background-color: black"></div>
                    </div>
                    <div style="position: absolute; width: 100%; height: 30%; bottom: 0px; left: 0px; right: 0px">
                        <div style="display: flex; justify-content: center; align-items: center">
                            <at-button class="alt" @click="onEvlClick(0)">剧场建筑安全</at-button>
                            <at-button class="alt" style="margin-left: 20px; margin-right: 20px" @click="onEvlClick(1)">舞台设备安全</at-button>
                            <at-button class="alt" @click="onEvlClick(2)">演出管理安全</at-button>
                        </div>
                        <div style="text-align: center; padding-top: 20px">
                            北京工业大学剧场设计与舞台技术研究所 2018.06
                        </div>
                    </div>

                </main>
            </div>
        </el-main>
    </el-container>
</template>

<script>
  import XLSX from 'xlsx'
  export default {
    data () {
      return {
        projectName: '',
        userName: '',
        userPassword: '',
        evlMethod: '1',
        evlMethods: ['巡查', '访谈', '座谈'],
        evlDate: '',
        data: null,
        wb: null,
        ws: null
      }
    },
    mounted () {
      this.wb = XLSX.readFile(`${__dirname}/User.xlsx`)
      this.ws = this.wb.Sheets[this.wb.SheetNames[0]]
      this.data = XLSX.utils.sheet_to_json(this.ws)
      // data[0]['Table 1'] = 'bianhao'
      // wb.Sheets[wb.SheetNames[0]] = XLSX.utils.json_to_sheet(data)
      // var result = XLSX.writeFile(wb, `${__dirname}/myFile.xlsx`)
      console.log(this.data[0]['用户名'])
      this.projectName = this.$store.state.Base.projectName
      this.userName = this.$store.state.Base.userName
    },
    methods: {
      onTipClick () {
        const shell = require('electron').shell
        shell.openExternal('https://mp.weixin.qq.com/s/RjLC8dfu9JdH_Sy-7FiLdQ')
      },
      onEvlClick (type) {
        this.$store.commit('setEvlType', type)
        if (this.isValidated()) {
          this.$router.push('/mainPage')
        }
      },
      currentDate () {
        return new Date().toISOString().slice(0, 10)
      },
      isValidated () {
        if (this.projectName.trim() === '') {
          this.$alert('项目名称为空', '提示', {
            confirmButtonText: '确定'
          })
          return false
        }
        if (this.userName.trim() === '') {
          this.$alert('用户名称为空', '提示', {
            confirmButtonText: '确定'
          })
          return false
        }
        if (this.userPassword.trim() === '') {
          this.$alert('密码为空', '提示', {
            confirmButtonText: '确定'
          })
          return false
        }
        return this.login()
      },
      login () {
        var results = this.data.filter(function (d) {
          return d['用户名'] === this.userName
        })
        if (results.length > 0) {
          var user = results[0]
          if (user['密码'] === this.userPassword) {
            return true
          } else {
            this.$alert('密码错误', '提示', {
              confirmButtonText: '确定'
            })
            return false
          }
        } else {
          this.$confirm('没有此用户, 是否添加?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.data.push({'用户名': this.userName, '密码': this.userPassword})
            // write to file
            this.wb.Sheets[this.wb.SheetNames[0]] = XLSX.utils.json_to_sheet(this.data)
            XLSX.writeFile(this.wb, `${__dirname}/User.xlsx`)
            return true
          }).catch(() => {
            return false
          })
        }
      }
    },
    watch: {
      projectName: function (newVal, oldVal) {
        this.$store.commit('setProjectName', newVal)
      },
      userName: function (newVal, oldVal) {
        this.$store.commit('setUserName', newVal)
      },
      evlMethod: function (newVal, oldVal) {
        this.$store.commit('setEvlMethod', this.evlMethods[newVal - 1])
      }
    }
  }
</script>

<style>

</style>
