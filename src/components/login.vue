<template>
  <router-link to="/userpage/register">
    <div class="signup">
      <h2>SIGN UP NOW</h2>
    </div>
  </router-link>
  <router-link to="/userpage/login">
    <div class="login">
      <h2>ALREADY A MEMBER</h2>
    </div>
  </router-link>
  <div class="user">
    <form>
      <p>
        username
        <input
          type="text"
          v-model="state.username"
          maxlength="10"
          id="newr_username"
          autocomplete="current-password"
        />
      </p>
      <p>
        password
        <input
          type="password"
          v-model="state.password"
          maxlength="10"
          id="newr_password"
          autocomplete="current-password"
        />
      </p>
    </form>
  </div>
  <button @click="handleLogin">确定</button>
  <h4>welcome to MyNotion...</h4>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const state = reactive({
  username: "",
  password: "",
});

const handleLogin = () => {
  if (state.username != "" && state.password != "") {
    // 发送登录请求
    var xhr = new XMLHttpRequest();
    xhr.open("post", "http://127.0.0.1:8080/api/login", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("username=" + state.username + "&password=" + state.password);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        // 重新定义响应文本
        var res = JSON.parse(xhr.responseText);
        localStorage.setItem("token", res.Token);
        console.log(res);
        if (res.status == 0) {
          router.push("/home/main/start");
          console.log(111);
        } else {
          alert("登录失败");
        }
      }
    };
  } else {
    alert("账号或密码不能为空哦！！！");
  }
};
</script>

<style  scoped>
.user {
  width: 390px;
  height: 130px;
  position: absolute;
  top: 130px;
  left: 150px;
}
.user p {
  float: left;
  width: 390px;
  height: 50px;
  margin: 0;
  margin-bottom: 10px;
  color: #888;
  line-height: 70px;
  font-size: 20px;
}
.signup {
  position: absolute;
  top: 50px;
  left: 75px;

  width: 175px;
  height: 60px;
  color: black;
  border-radius: 45px;
}

.signup:hover {
  cursor: pointer;
}

.signup h3 {
  line-height: 40px;
  font-size: 14px;
  margin: 0 0 0 20px;
}

.login {
  position: absolute;
  top: 50px;
  left: 350px;
  width: 260px;
  height: 60px;
  border-radius: 45px;
  background-color: #f33851;
  color: white;
  cursor: pointer;
}

.login h3 {
  font-size: 14px;
  margin-left: 19px;
  margin: 0 0 0 13px;
}
button {
  padding: 10px;
  margin-top: 285px;
}
h4 {
  margin-top: 35px;
}
</style>