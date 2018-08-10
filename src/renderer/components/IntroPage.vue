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
                <input type="button" class="info-button" @click="back()" value="返回"/>
            </div>

            <div style="width: 100%; display: flex; justify-content: center; align-items: center; color: #666666">
                <span style="font-size: 30px; margin-top: -30px">说明</span>
            </div>
        </el-header>
        <el-main>
            <div style="margin-top: 100px; width: 100%; height: 100%; text-align: center; font-size: 2em">
                暂无数据
            </div>
            <div style="position: absolute; width: 100%; height: 20%; bottom: 0px; left: 0px; right: 0px">
                <div style="position: absolute; text-align: center; bottom: 0px; width: 100%; padding-bottom: 10px; color: #000000;">
                    北京工业大学剧场设计与舞台技术研究所 2018.08
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script>
  export default {
    data () {
      return {
        title: ''
      }
    },
    mounted () {
    },
    methods: {
      back () {
        this.$router.back(this.$store.state.Base.introBack)
      }
    }
  }
</script>

<style>

</style>
