<template>
    <el-container>
        <el-header>
            <div style="float: left; margin-top: 30px">
                <img src="./icon_logo_bjut.png" style="width: 180px; height: 50px; left: 0px; top: 0px;"/>
            </div>

            <div style="float: right; margin-top: 40px">
                <input type="button" class="info-button" @click="back()" value="返回"/>
            </div>

            <div style="width: 100%; display: flex; justify-content: center; align-items: center; color: #666666">
                <span style="font-size: 30px; margin-top: -40px">说明</span>
            </div>
        </el-header>
        <el-main>
            <div style="margin-top: 20px; width: 100%; height: 100%; text-align: center; font-size: 2em">
                <iframe src="../../../static/pdfjs-dist/web/viewer.html?file=../intro.pdf" height="460" width="100%"></iframe>
                <!--iframe :src=pdfurl height="600" width="100%"></iframe-->
            </div>
            <div style="position: absolute; width: 100%; height: 20%; bottom: 0px; left: 0px; right: 0px">
                <div style="position: absolute; text-align: center; bottom: 20px; width: 100%; padding-bottom: 10px; color: #000000;">
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
        title: '',
        pdfurl: ''
      }
    },
    mounted () {
      this.pdfurl = `${__dirname}`+'/static/pdfjs-dist/web/viewer.html?file=../intro.pdf'
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
