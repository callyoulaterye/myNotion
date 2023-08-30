<template>
  <div id="aside">
    <div class="block">
      <img src="../assets/logo.png" id="logo" />
      <img src="../assets/avatar.png" id="avatar" />
    </div>

    <!--搜索栏-->
    <div class="demo-input-suffix">
      <el-row :gutter="20" style="width: 255px">
        <el-input
          v-model="input2"
          class="w-50 m-2"
          placeholder="搜索"
          :prefix-icon="Search"
        />
      </el-row>
    </div>

    <!--分类菜单-->
    <div class="menus">
      <router-link to="/home/main/start"
        ><div class="menu" id="start" @click="change_display()">
          <img src="../assets/icon_time.png" />
          <h5>开始</h5>
        </div></router-link
      >
      <router-link replace to="/home/main/note"
        ><div class="menu" id="note">
          <img src="../assets/note.png" />
          <h5>小记</h5>
        </div></router-link
      >
      <router-link to="/home/main/collection"
        ><div class="menu" id="collect">
          <img src="../assets/collect.png" />
          <h5>收藏</h5>
        </div></router-link
      >
      <router-link to="/home/main/MyTree"
        ><div class="menu" id="classify">
          <img src="../assets/classify.png" />
          <h5>笔记</h5>
        </div></router-link
      >
    </div>
  </div>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
import { onMounted, reactive } from "vue";
import { getTreeList } from "../api";
import { mainStore } from "@/store";

const store = mainStore();

const data = reactive({
  data: [],
});

onMounted(() => {
  getTreeList().then((res) => {
    console.log(res.data);
    data.data = [...res.data];
    store.$patch({
      Tree: data.data,
    });
  });
});

const change_display = () => {
  let date = new Date();
  let month = date.getMonth() + 1;
  data.recentNote = store.Tree.filter(
    (item) => month - Number(item.month) <= 1
  );
  data.recentNote = store.Tree.filter((item) => item.isFile === "true");
  data.recentNote = data.recentNote.sort(sortDownDate);
};

const sortDownDate = (a, b) => {
  return Date.parse(b.time) - Date.parse(a.time);
};
</script>

<style scoped>
#aside {
  background-color: #c0ddc5;
  border: 1px solid #c0ddc5;
  height: 98%;
  margin-top: 7px;
  border-radius: 20px;
  margin-left: 17px;
  border: 1px solid #cccccc;
}
.block {
  position: relative;
  width: 254px;
  display: flex;
  justify-content: space-between;
  color: black;
}
#avatar {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 10px;
  right: 10px;
}
#logo {
  width: 170px;
  height: 40px;
  margin-top: 25px;
  margin-left: 10px;
}

h6 {
  width: 60px;
  margin-top: 30px;
  margin-bottom: 0px;
}
.ArrowDown {
  margin-top: 60px;
}
.Bell {
  margin-top: 60px;
}
.w-50 {
  height: 32px;
  cursor: pointer;
  border: 0;
  opacity: 1;
  border-radius: 8px;
  width: 185px;
  margin-top: 20px;
  margin-left: 18px;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.menu {
  position: relative;
  width: 237px;
  height: 35px;
  color: black;
  padding: 10px;
}
.menu img {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 13px;
  left: 15px;
}
.menu h5 {
  display: block;
  margin: 0;
  position: absolute;
  top: 13px;
  left: 30px;
  width: 40px;
  margin-top: 1px;
  margin-left: 10px;
}
.menu {
  margin-top: 5px;
}
.menus :hover {
  background-color: #8bd5fe;
  cursor: pointer;
}
.demo-input-suffix {
  margin-bottom: 25px;
}
.carebottom {
  position: absolute;
  top: 20px;
  left: -90px;
}

h4 {
  position: absolute;
  top: -2px;
  left: 45px;
  color: rgb(57, 56, 56);
}

.Memo {
  position: absolute;
  top: 55px;
  left: -85px;
}

/* .knowledgeBase {
  position: relative;
  height: 50px;
  width: 100%;
}
.knowledgeBase :hover {
  cursor: pointer;
}
.knowledgeBase h5 {
  margin: 34px 0px 0px 57px;
  width: 85px;
  height: 17px;
  display: block;
} */

/* .dropdown {
  display: none;
  width: 100px;
  height: 100px;
  background-color: white;
  position: absolute;
  top: 45px;
  right: 1px;
  border-radius: 5px;
}

.dropdown div:hover {
  cursor: pointer;
  background-color: #e0dfdf;
}
.dropdown div {
  text-align: center;
  line-height: 48px;
  width: 92px;
  height: 42px;
  margin: 4px;
  border-radius: 5px;
} */
a {
  color: black;
  text-decoration: none;
}
</style>