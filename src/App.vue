<template>
  <div>
    <div>主应用容器</div>
    <a href="./app-react/">我的</a>
    <div id="content" class="content"></div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.content {
  border: 1px solid #ccc;
  height: 300px;

}
</style>
