<template>
  <router-view> </router-view>
</template>

<script setup>
</script>

<style>
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  height: 100%;
  width: 100%;
}
.el-main {
  height: 100vh;
  padding: 0px;
  width: 700px;
}
.el-aside {
  height: 100vh;
}
.routerLink {
  height: 10px;
  width: 20px;
}
</style>
