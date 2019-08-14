<template>
  <div id="app">
    <div id="nav">
      <!--<router-link to="/Login">Login</router-link> |
      <router-link to="/register">Register</router-link>-->
    </div>
    <router-view/>
  </div>
</template>
<style lang="stylus">
#app
  position: absolute
  top: 0
  left 0
  height 100vh
  width 100vw
  overflow hidden
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50

#nav
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983
</style>
