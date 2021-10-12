<template>
  <el-container class="home_container">
    <!-- 头部区域 -->
    <el-header>
      <div class="header">
        <img src="../assets/pkqq.jpg" alt="" />
        <span>良品电商后台管理系统</span>
      </div>
      <el-button type="info" @click="exitLogin">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- 侧边栏折叠按钮 -->
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
        >
          <!-- 一级菜单栏 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单栏 -->
            <el-menu-item
              :index="'./' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('./' + subItem.path)"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created() {
    this.getMenuList() // 获取所有的左侧菜单
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  data() {
    return {
      // 左侧菜单数据
      menulist: [],
      // 一级菜单id图标
      iconObj: {
        125: 'iconfont icon-users',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      // 是否折叠,默认为不折叠
      isCollapse: false,
      // 被激活的路径
      activePath: ''
    }
  },
  methods: {
    exitLogin() {
      window.sessionStorage.clear() // 清除token
      this.$router.push('/login') // 路径跳转
    },
    // 获取所有菜单，请求地址是menus，用async await简化promise
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.el-header {
  background: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  .header {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
    img {
      width: 60px;
      height: 55px;
      border-radius: 50%;
      box-shadow: 0 0 3px #eaedf1;
      margin-left: 5px;
      margin-bottom: 2px;
    }
  }
}

.el-aside {
  background: #333744;
  .el-menu {
    border-right: none;
  }
  .toggle-button {
    background: #4a5064;
    color: #fff;
    font-size: 15px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
}

.el-main {
  background: #eaedf1;
}

.home_container {
  height: 100vh;
}

.iconfont {
  margin-right: 10px;
}
</style>
