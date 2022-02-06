<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>

export default {
  beforeMount(){
    //  if(window.location.protocol === "http:" || window.location.href === "https://www.planning.monkey-school.ch/"){
		// 		window.location.href=`${this.$store.state.HOST}`
		// 	}
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}


</style>
