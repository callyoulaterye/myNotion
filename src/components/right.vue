<template>
  <div id="right">
    <div id="editor">
      <v-md-editor
        v-model="data.text"
        height="650px"
        v-if="data.flag"
        id="editor"
      ></v-md-editor>
      <v-md-editor
        v-model="data.text"
        height="650px"
        mode="preview"
        v-else
      ></v-md-editor>
    </div>
    <el-button @click="data.flag = true" id="edit">编辑</el-button>
    <el-button @click="(data.flag = false), saveContent()" id="save"
      >保存</el-button
    >
    <img
      src="../assets/collected.png"
      id="collected"
      v-if="data.flag == false && data.isCollect == 'true'"
      @click="(data.isCollect = 'false'), changeIsCollected(data)"
    />
    <img
      src="../assets/collect.png"
      id="collect"
      v-if="data.flag == false && data.isCollect == 'false'"
      @click="(data.isCollect = 'true'), changeIsCollected(data)"
    />
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import { mainStore } from "@/store";

const route = useRoute();
import {
  changeContent,
  SaveNewContent,
  changeIsCollect,
  searchIsCollect,
} from "../api";

const store = mainStore();

let data = reactive({
  id: route.query.id,
  name: route.query.name,
  pid: route.query.pid,
  text: "",
  flag: true,
  month: "",
  day: "",
  hour: "",
  minutes: "",
  date: "",
  isCollect: "true",
});

onMounted(() => {
  changeContent(data.id).then((res) => {
    if (res.data[0].content.length != 0 && res.data[0].content != null) {
      data.flag = false;
      data.text = res.data[0].content;
    }
  });
  searchIsCollect(data.id).then((res) => {
    data.isCollect = res.data[0].isCollect;
  });
});

const saveContent = () => {
  let date = new Date();
  data.month = date.getMonth() + 1;
  if (data.month < 10) {
    data.month = "0" + data.month;
  }
  data.day = date.getDate();
  if (data.day < 10) {
    data.day = "0" + data.day;
  }
  data.hour = date.getHours();
  if (data.hour < 10) {
    data.hour = "0" + data.hour;
  }
  data.minutes = date.getMinutes();
  if (data.minutes < 10) {
    data.minutes = "0" + data.minutes;
  }
  data.date =
    data.month + "-" + data.day + " " + data.hour + ":" + data.minutes;
  SaveNewContent(data).then(() => {
    store.transformData();
  });
};

const changeIsCollected = (data) => {
  console.log(data);
  changeIsCollect(data).then((res) => {
    console.log(res);
  });
};
</script>

<style scoped>
a {
  color: black;
  text-decoration: none;
}

#right {
  position: relative;
  height: 96%;
  width: 100%;
  background-color: #c0ddc5;
  border-radius: 13px;
  border: 1px solid #cccccc;
}
.v-md-editor__right-area {
  background-color: #e3e5e6;
  /* width: 100vw; */
}
textarea {
  background-color: white;
}

.el-button {
  margin-top: 0px;
  z-index: 99999;
}

.v-md-editor {
  margin-top: 11px;
}

.v-md-editor__editor-wrapper {
  background-color: white;
}

.scrollbar__wrap {
  background-color: #c0ddc5;
}

#collected {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 25px;
  right: 100px;
}

#collect {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 25px;
  right: 100px;
}
</style>