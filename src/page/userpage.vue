<template>
  <div class="background">
    <div class="fcenter">
      <div class="center">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.background {
  background-image: url("../assets/background.jpg");
  background-size: 100%;
  margin: 0;
}

.fcenter {
  display: flex;
  height: 100vh;
  margin: 0;
  justify-content: center;
  align-items: center;
}

.center {
  position: relative;
  height: 400px;
  width: 680px;
  background-color: #fbfbfb;
}

.center h1 {
  position: absolute;
  top: 15px;
  left: 60px;
  font-size: 38px;
  margin: 0;
}

.center h2 {
  position: absolute;
  right: -55px;
  top: 35px;
  font-size: 20px;
  margin: 0;
}

.content {
  float: left;
  position: relative;
  height: 500px;
  width: 450px;
  margin: 0;
}

.content .newr {
  display: block;
  width: 390px;
  height: 300px;
  margin: 90px 0px 0px 60px;
}

.content p {
  position: relative;
  width: 390px;
  height: 50px;
  border-bottom: 1px solid #ccc;
  margin: 0;
  margin-bottom: 10px;
  color: #888;
}

.content p input {
  height: 20px;
  position: absolute;
  top: 25px;
  left: 0px;
  outline: none;
  border: 0px;
  font-size: 20px;
  color: #000000;
  font-weight: bold;
}

.content .picture {
  float: right;
  height: 500px;
  width: 400px;
}

.content button {
  position: absolute;
  top: 395px;
  left: 170px;
  width: 145px;
  height: 40px;
  border-radius: 45px;
  background-color: #f38f9b;
  font-size: 30px;
  border: 0px;
  color: aliceblue;
}

.picture img {
  float: right;
  height: 500px;
  width: 400px;
}

.signup {
  position: absolute;
  top: 340px;
  left: 70px;
  color: white;
  width: 145px;
  height: 40px;
  background-color: #f33851;
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
  top: 340px;
  left: 260px;
  width: 145px;
  height: 40px;
  border-radius: 45px;
  color: #ccc;
  cursor: pointer;
}

#btn {
  cursor: pointer;
  box-shadow: 1px 1px 1px saddlebrown;
}

#btn:hover {
  background-color: #f33851;
}

#btn-login {
  cursor: pointer;
  box-shadow: 1px 1px 1px saddlebrown;
}

#btn-login:hover {
  background-color: #f33851;
}

.login h3 {
  font-size: 14px;
  margin-left: 19px;
  margin: 0 0 0 13px;
}

.bottom {
  border-top: 1px solid #ccc;
  width: 597px;
  height: 50px;
  position: absolute;
  top: 448px;
}

.bottom .connect {
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
  margin-left: 75px;
  width: 165px;
  float: left;
}

.bottom img {
  width: 245px;
  height: 50px;
  float: left;
}
</style>
