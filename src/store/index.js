import { defineStore } from "pinia";
import { insertTree, getTreeList, DeleteTree, newName } from "@/api";

export const mainStore = defineStore('main', {
    state: () => {
        return {
            myTree: [], //树形
            Tree: [], //数组列表
            newFileName: '', //新建文件名
            pId: 5,
            recentNodeId: 0,
            isCollect: ''
        }
    },

    actions: {
        //最关键代码：处理数据
        transformData() {
            getTreeList().then((res) => {
                let AllData = [...res.data];
                this.Tree = [...res.data];
                let treeMapList = AllData.reduce((memo, current) => {
                    current.label = current.name;
                    memo[current["id"]] = current;
                    return memo;
                }, {});
                let result = AllData.reduce((arr, current) => {
                    let pid = current.pid;
                    let parent = treeMapList[pid];
                    if (parent) {
                        parent.children ?
                            parent.children.push(current) :
                            (parent.children = [current]);
                    } else if (pid === 0) {
                        //根文件夹
                        arr.push(current);
                    }
                    return arr;
                }, []);
                this.myTree = result;
            })
        },

        //删除函数
        DeleteNode(node) {
            DeleteTree(node).then((res) => {
                console.log(res);
                this.transformData();
            })
        },

        addFile(node) {
            let date = new Date();
            let month = date.getMonth() + 1;
            if (month < 10) {
                month = '0' + month;
            }
            let day = date.getDate();
            if (day < 10) {
                day = '0' + day;
            }
            let hour = date.getHours();
            if (hour < 10) {
                hour = '0' + hour;
            }
            let minutes = date.getMinutes();
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            let date1 = month + "-" + day + " " + hour + ":" + minutes;
            let newNode1;
            newNode1 = { name: this.newFileName, isFile: "true", pid: node.id, content: '', month: month, day: day, hour: hour, minutes: minutes, time: date1, isCollect: "false" };
            insertTree(newNode1).then((res) => {
                console.log(res);
                this.transformData();
            })
        },

        addFinalFile() {
            let date = new Date();
            let month = date.getMonth() + 1;
            if (month < 10) {
                month = '0' + month;
            }
            let day = date.getDate();
            if (day < 10) {
                day = '0' + day;
            }
            let hour = date.getHours();
            if (hour < 10) {
                hour = '0' + hour;
            }
            let minutes = date.getMinutes();
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            let date1 = month + "-" + day + " " + hour + ":" + minutes;
            console.log(month, day, hour, minutes, date1);
            let newNode1 = { name: this.newFileName, isFile: "true", pid: 0, content: '', month: month, day: day, hour: hour, minutes: minutes, time: date1, isCollect: "false" };
            insertTree(newNode1).then((res) => {
                console.log(res);
                this.transformData();
            })
        },

        addFolder(node) {
            let date = new Date();
            let month = date.getMonth() + 1;
            if (month < 10) {
                month = '0' + month;
            }
            let day = date.getDate();
            if (day < 10) {
                day = '0' + day;
            }
            let hour = date.getHours();
            if (hour < 10) {
                hour = '0' + hour;
            }
            let minutes = date.getMinutes();
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            let date1 = month + "-" + day + " " + hour + ":" + minutes;
            let newNode2 = { name: this.newFileName, isFile: "false", pid: node.id, month: month, day: day, hour: hour, minutes: minutes, time: date1, isCollect: "false" };
            insertTree(newNode2).then((res) => {
                console.log(res);
                this.transformData();
            })
        },

        addFinalFolder() {
            let date = new Date();
            let month = date.getMonth() + 1;
            if (month < 10) {
                month = '0' + month;
            }
            let day = date.getDate();
            if (day < 10) {
                day = '0' + day;
            }
            let hour = date.getHours();
            if (hour < 10) {
                hour = '0' + hour;
            }
            let minutes = date.getMinutes();
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            let date1 = month + "-" + day + " " + hour + ":" + minutes;
            let newNode2 = { name: this.newFileName, isFile: "false", pid: 0, month: month, day: day, hour: hour, minutes: minutes, time: date1, isCollect: "false" };
            insertTree(newNode2).then((res) => {
                console.log(res);
                this.transformData();
            })
        },

        changeName(node) {
            // console.log(node);
            node.name = this.newFileName;
            newName(node).then((res) => {
                console.log(res);
                this.transformData();
            })
        }
    }
})