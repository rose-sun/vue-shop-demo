<template>
  <div>
    <el-button type="info" @click="exitLogin">退出</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    exitLogin() {
      window.sessionStorage.clear() // 清除token
      this.$router.push('/login') // 路径跳转
    }
  }
}
</script>

<style lang="less" scoped>
</style>
