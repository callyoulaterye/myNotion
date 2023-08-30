<template>
  <div id="recentNote">
    <ul>
      <li>
        <div id="Frecent">
          <span>文件名称</span>
          <div id="Ftime">编辑时间</div>
        </div>
      </li>
      <li v-for="item in data.recentNote" :key="item.id">
        <router-link
          :to="`/home/main/MyTree/right?id=${item.id}&name=${item.name}&${item.pid}`"
        >
          <div id="recent">
            <img src="../assets/file1.png" id="file" />
            <span>{{ item.name }}</span>
            <div id="time">{{ item.time }}</div>
          </div></router-link
        >
      </li>
    </ul>
  </div>
</template>

<script setup>
import { mainStore } from "@/store";
import { onMounted, reactive, watch } from "vue";

const store = mainStore();

const data = reactive({
  recentNote: [],
});

onMounted(() => {
  data.recentNote = store.Tree.filter((item) => item.isCollect === "true");
  data.recentNote = data.recentNote.sort(sortDownDate);
});

const sortDownDate = (a, b) => {
  return Date.parse(b.time) - Date.parse(a.time);
};

watch(
  () => store.Tree,
  () => {
    data.recentNote = store.Tree.filter((item) => item.isCollect === "true");
    data.recentNote = data.recentNote.sort(sortDownDate);
  },
  { immediate: true }
);
</script>
<style scoped>
li {
  list-style: none;
}
a {
  color: black;
  text-decoration: none;
}
#Frecent {
  width: 100%;
  height: 70px;
  border-bottom: 1px solid #ccc;
  line-height: 70px;
  float: left;
}

#Frecent span {
  margin-left: 30px;
}

#recent {
  position: relative;
  width: 100%;
  height: 70px;
  border-bottom: 1px solid #ccc;
  line-height: 70px;
  float: left;
}

#file {
  width: 30px;
  height: 30px;
  float: left;
  margin-top: 19px;
  margin-left: 25px;
}

span {
  float: left;
  margin-left: 10px;
}

#Ftime {
  float: right;
  margin-right: 265px;
}

#time {
  width: 250px;
  float: right;
  margin-right: 170px;
}
</style>