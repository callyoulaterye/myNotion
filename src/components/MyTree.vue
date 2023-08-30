<template>
  <div id="directory">
    <div id="note">
      <h1>笔记</h1>
      <!--加号添加-->
      <div class="Plus">
        <img src="../assets/Plus.png" />
        <div class="dropdown">
          <div @click="openFinalFile">新建文件</div>
          <div @click="openFinalFolder">新建文件夹</div>
        </div>
      </div>

      <!--树-->
      <div>
        <el-input v-model="filterText" placeholder="Filter keyword" />

        <el-tree
          id="tree"
          :data="store.myTree"
          default-expand-all
          :expand-on-click-node="true"
          draggable
          @node-click="handleNodeClick"
          ref="treeRef"
          class="filter-tree"
          :props="defaultProps"
          :filter-node-method="filterNode"
        >
          <template #default="{ node, data }">
            <!--icon图标显示-->
            <el-icon v-if="isFile(data)">
              <Document />
            </el-icon>

            <el-icon v-else>
              <FolderOpened />
            </el-icon>

            <!--树名-->
            <span class="custom-tree-node">
              <span>{{ node.label }}</span>
            </span>

            <!--dropdown下拉菜单-->
            <el-dropdown>
              <span class="el-dropdown-link">
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <!--是文件-->
                <el-dropdown-menu v-if="isFile(data)">
                  <el-dropdown-item @click="getNode(node)"
                    ><el-button text @click="changeName"
                      >重命名</el-button
                    ></el-dropdown-item
                  >

                  <el-dropdown-item @click="getNode(node)"
                    ><el-button text @click="open()"
                      >删除文件</el-button
                    ></el-dropdown-item
                  >
                </el-dropdown-menu>

                <!--是文件夹-->
                <el-dropdown-menu v-else>
                  <el-dropdown-item @click="getNode(node)"
                    ><el-button text @click="openFolder"
                      >新建文件夹</el-button
                    ></el-dropdown-item
                  >

                  <el-dropdown-item @click="getNode(node)">
                    <el-button text @click="openFile">新建文件</el-button>
                  </el-dropdown-item>

                  <el-dropdown-item @click="getNode(node)">
                    <el-button text @click="open">删除文件夹</el-button>
                  </el-dropdown-item>

                  <el-dropdown-item @click="getNode(node)">
                    <el-button text @click="changeName">重命名</el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-tree>
      </div>
    </div>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script setup>
import { onMounted, defineProps, watch, reactive, ref } from "vue";
import { ElMessage, ElMessageBox, ElTree } from "element-plus";
import { mainStore } from "@/store";

import { useRouter } from "vue-router";

const router = useRouter();

const store = mainStore();

//搜索
const filterText = ref("");
const treeRef = ref();

const defaultProps = {
  children: "children",
  label: "label",
};

watch(filterText, (val) => {
  !treeRef.value.filter(val);
});

const filterNode = (value, data) => {
  if (!value) return true;
  return data.label.includes(value);
};

//删除弹框
const open = () => {
  ElMessageBox.confirm("请确认是否删除此文件", "Warning", {
    confirmButtonText: "yes",
    cancelButtonText: "Cancel",
    type: "warning",
    callback: (action) => {
      if (action == "confirm") {
        console.log(111, data.NodeData.data.id);
        console.log(222, store.recentNodeId);
        if (data.NodeData.data.id != store.recentNodeId) {
          store.DeleteNode(data.NodeData.data);
        } else {
          store.DeleteNode(data.NodeData.data);
          router.push({
            path: "/home/main/MyTree",
          });
        }
        ElMessage({
          type: "success",
          message: "删除成功",
        });
      } else {
        ElMessage({
          type: "fail",
          message: "删除成功",
        });
      }
    },
  });
};

const props = defineProps({
  allData: {
    type: Array,
    default: () => [],
  },
});

const data = reactive({
  allData: [],
  NodeData: [],
});

//监听props.allData
watch(
  () => props.allData,
  () => {
    store.transformData(props.allData);
    //console.log(222, props.alldata);
  },
  { immediate: true }
);

//在页面加载前更新进去;
onMounted(() => {
  store.transformData(props.allData);
  //transformData();
});

//判断是否有父母而使用文件icon还是文件夹icon
const isFile = (data) => {
  // console.log(data.isFile);
  return data.isFile == "true";
};

const getNode = (node) => {
  console.log("点击取到的node：", node);
  data.NodeData = node;
};

//增加文件
const openFile = () => {
  ElMessageBox.prompt("Please input your file name", "Tip", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    callback: (value) => {
      if (value.action == "confirm") {
        store.newFileName = value.value;
        store.addFile(data.NodeData.data);

        ElMessage({
          type: "success",
          message: `新建成功`,
        });
      } else {
        ElMessage({
          type: "info",
          message: "Input canceled",
        });
      }
    },
  });
};

//增加最后文件
const openFinalFile = () => {
  ElMessageBox.prompt("Please input your file name", "Tip", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    callback: (value) => {
      if (value.action == "confirm") {
        store.newFileName = value.value;
        store.addFinalFile(data.NodeData.data);
        ElMessage({
          type: "success",
          message: `新建成功`,
        });
      } else {
        ElMessage({
          type: "info",
          message: "Input canceled",
        });
      }
    },
  });
};

//增加文件夹
const openFolder = () => {
  ElMessageBox.prompt("Please input your folder name", "Tip", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    callback: (value) => {
      if (value.action == "confirm") {
        store.newFileName = value.value;
        store.addFolder(data.NodeData.data);
        ElMessage({
          type: "success",
          message: `新建成功`,
        });
      } else {
        ElMessage({
          type: "info",
          message: "Input canceled",
        });
      }
    },
  });
};

//增加最后文件夹
const openFinalFolder = () => {
  ElMessageBox.prompt("Please input your folder name", "Tip", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    callback: (value) => {
      if (value.action == "confirm") {
        store.newFileName = value.value;
        store.addFinalFolder(data.NodeData.data);
        ElMessage({
          type: "success",
          message: `新建成功`,
        });
      } else {
        ElMessage({
          type: "info",
          message: "Input canceled",
        });
      }
    },
  });
};

//重命名
const changeName = () => {
  ElMessageBox.prompt("Please change your folder name", "Tip", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    callback: (value) => {
      if (value.action == "confirm") {
        store.newFileName = value.value;
        store.changeName(data.NodeData.data);
        ElMessage({
          type: "success",
          message: `修改成功`,
        });
      } else {
        ElMessage({
          type: "info",
          message: "取消修改",
        });
      }
    },
  });
};

//显示笔记内容
const handleNodeClick = (obj) => {
  store.recentNodeId = obj.id;
  if (obj.isFile == "true") {
    router.push({
      path: "/home/main/MyTree/right",
      query: {
        id: obj.id,
        name: obj.name,
        pid: obj.pid,
      },
    });
  }
};
</script>

<style scoped>
#note {
  position: relative;
  background-color: #c0ddc5;
  width: 255px;
  margin: 20px 20px 20px 0;
  border-radius: 35px;
  color: black;
  border: 1px solid #cccccc;
}
.Plus {
  width: 78px;
  height: 68px;
  position: absolute;
  top: 8px;
  left: 120px;
}
.Plus img {
  position: absolute;
  top: 18px;
  right: 4px;
  width: 25px;
  height: 25px;
}
.Plus:hover .dropdown {
  display: block;
  z-index: 999999;
}

#tree {
  background-color: #c0ddc5;
  margin-left: 2px;
  margin-top: 20px;
  color: black;
}
.dropdown {
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
}

a {
  color: black;
  text-decoration: none;
}

button {
  height: 30px;
  margin: 0;
}
#directory {
  margin: 0;
  display: flex;
  height: 100%;
}
</style>
