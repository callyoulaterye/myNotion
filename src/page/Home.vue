<template>
  <!--整个页面-->
  <div class="common-layout">
    <el-container>
      <!--左边框-->
      <el-aside width="275px" class="el-aside"><Aside></Aside> </el-aside>
      <!--主页面-->
      <el-main class="el-main"> <Main></Main></el-main>
    </el-container>
  </div>
</template>

<script setup>
import Aside from "../components/Aside.vue";
import Main from "../components/main.vue";

import { useRouter } from "vue-router";
import { onMounted } from "vue";
const router = useRouter();

const checkLogin = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("请先登录！");
    router.push("/userpage/login");
  }
};
onMounted(() => {
  checkLogin();
});
</script>

<style scoped>
.common-layout {
  background-image: url(../assets/background.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>