<template>
    <el-container>
        <el-header>
            <div style="width: 100%; display: flex; justify-content: center; align-items: center">
                <span style="color: #66cc99; font-size: 16px">《演出安全管理体系》</span>
            </div>
            <div style="float: left">
                <img src="./icon_logo_bjut.png" style="width: 180px; height: 50px; left: 0px; top: 0px;"/>
            </div>

            <div style="float: right">
                <input type="button" class="info-button" @click="onTipClick()" value="说明"/>
            </div>

            <div style="width: 100%; display: flex; justify-content: center; align-items: center; color: #666666">
                <span style="font-size: 30px; margin-top: -30px">演出安全评估</span>
            </div>
        </el-header>
        <el-main>
            <div style="padding-top: 2%">
                <div style="position: absolute; width: 50%; height: 60%; left: 0px">
                    <div style="position: absolute; width: 100%; height: 2%; top: 0px; right: 0px; left: 0px; background-color: #339966"></div>
                    <div style="margin-top: 8%; width: 300px; float: right">
                        <div>
                            <div>
                                <div>项目名称:</div>
                                <at-input placeholder="填入项" style="float: left; width: 140px" v-bind:value="projectName" v-on:input="projectName=$event"/>
                                <input type="button" class="info-button" value="项目概要" style="margin-left: 10px; width: 100px" @click="onDescriptionClick()"/>
                            </div>
                            <div>
                                <div>评 估 人:</div>
                                <at-input placeholder="填入项" style="float: left; width: 140px" v-bind:value="userName" v-on:input="userName=$event"/>
                                <input type="button" class="info-button" value="资格证书" style="margin-left: 10px; width: 100px" @click="onCertificationClick()"/>
                            </div>
                            <div>
                                <div>授权密码:</div>
                                <at-input type="password" placeholder="填入项" style="width: 140px" v-bind:value="userPassword" v-on:input="userPassword=$event"/>
                            </div>
                        </div>
                    </div>
                    <div style="position: absolute; width: 2px; height: 100%; top: 0px; bottom: 0px; right: 0px; background-color: #339966"></div>
                    <div style="position: absolute; left: 60%; right: 0px; height: 2px; bottom: 0px; background-color: #339966"></div>
                    <div style="position: absolute; width: 2px; left: 60%; height: 20px; bottom: -20px; background-color: #339966"></div>
                </div>
                <div style="position: absolute; width: 50%; height: 60%; right: 0px">
                    <div style="position: absolute; width: 100%; height: 2%; top: 0px; right: 0px; left: 0px; background-color: #339966"></div>
                    <div style="position: absolute; width: 2px; right: 100%; height: 20px; bottom: -20px; background-color: #339966"></div>
                    <div style="margin-top: 8%; width: 300px">
                        <div>
                            <div style="padding-left: 50px">巡查方法:</div>
                            <at-select size="large" style="width: 140px; left: 50px" v-bind:value="evlMethod" v-on:input="evlMethod=$event">
                                <at-option value="1">巡查</at-option>
                                <at-option value="2">访谈</at-option>
                                <at-option value="3">座谈</at-option>
                            </at-select>
                        </div>
                        <div>
                            <div style="padding-left: 50px">评估时间:</div>
                            <at-input readonly style="width: 140px; left: 50px" :value="currentDate()"/>
                        </div>
                    </div>
                    <div style="position: absolute; left: 0px; right: 0px; height: 2px; bottom: 0px; background-color: #339966; margin-right: 60%"></div>
                    <div style="position: absolute; width: 2px; right: 60%; height: 20px; bottom: -20px; background-color: #339966"></div>
                </div>
                <div style="position: absolute; width: 100%; height: 20%; bottom: 0px; left: 0px; right: 0px">
                    <div style="display: flex; justify-content: center; align-items: center">
                        <input type="button" class="info-button" value="剧场建筑安全" @click="onEvlClick(0)"/>
                        <input type="button" class="info-center-button" value="舞台设备安全" @click="onEvlClick(1)"/>
                        <input type="button" class="info-button" value="演出管理安全" @click="onEvlClick(2)"/>
                    </div>
                    <div style="position: absolute; text-align: center; bottom: 0px; width: 100%; padding-bottom: 10px; color: #000000;">
                        北京工业大学剧场设计与舞台技术研究所 2018.08
                    </div>
                </div>
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
      this.projectName = this.$store.state.Base.projectName
      this.userName = this.$store.state.Base.userName
      this.$store.commit('setEvlMethod', this.evlMethods[0])
    },
    methods: {
      onTipClick () {
        // const shell = require('electron').shell
        // shell.openExternal('https://mp.weixin.qq.com/s/RjLC8dfu9JdH_Sy-7FiLdQ')
        this.$store.commit('setIntroBack', '/landingPage')
        this.$router.push('/introPage')
      },
      onDescriptionClick () {
        this.$store.commit('setDescriptionBack', '/landingPage')
        this.$router.push('/descriptionPage')
      },
      onCertificationClick () {
        this.$store.commit('setCertificationBack', '/landingPage')
        this.$router.push('/certificationPage')
      },
      onEvlClick (type) {
        this.$store.commit('setEvlType', type)
        // if (this.isValidated()) {
        //   this.$router.push('/mainPage')
        // }
        this.isValidated().then((isValidated) => {
          if (isValidated) {
            this.$router.push('/mainPage')
          }
        })
      },
      currentDate () {
        return new Date().toISOString().slice(0, 10)
      },
      isValidated () {
        var that = this
        return new Promise(function (resolve, reject) {
          if (that.projectName.trim() === '') {
            that.$alert('项目名称为空', '提示', {
              confirmButtonText: '确定'
            })
            resolve(false)
            return
          } else if (that.userName.trim() === '') {
            that.$alert('用户名称为空', '提示', {
              confirmButtonText: '确定'
            })
            resolve(false)
            return
          } else if (that.userPassword.trim() === '') {
            that.$alert('密码为空', '提示', {
              confirmButtonText: '确定'
            })
            resolve(false)
            return
          }
          var results = that.data.filter(function (d) {
            return d['用户名'] === that.userName
          })
          if (results.length > 0) {
            var user = results[0]
            if (user['密码'] === that.userPassword) {
              resolve(true)
            } else {
              that.$alert('密码错误', '提示', {
                confirmButtonText: '确定'
              })
              resolve(false)
            }
          } else {
            that.$confirm('没有此用户, 是否添加?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              that.data.push({'用户名': that.userName, '密码': that.userPassword})
              // write to file
              that.wb.Sheets[that.wb.SheetNames[0]] = XLSX.utils.json_to_sheet(that.data)
              XLSX.writeFile(that.wb, `${__dirname}/User.xlsx`)
              resolve(true)
            }).catch((e) => {
              resolve(false)
            })
          }
        })
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
    .info-button {
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
    .info-center-button {
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
        margin-left: 10%;
        margin-right: 10%;
    }
    body {
        background-image: url("bg_bw.png");
        background-size: 100% 100%;
    }
</style>
