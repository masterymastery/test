<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png" />
        <HelloWorld style="display:none" msg="Welcome to Your Vue.js App" />
        <div>
            <router-link to="/">hello</router-link>
            <router-link to="byebye">byebye</router-link>
        </div>
        <button @click="$store.state.count++">state</button>
        <button @click="$store.commit('add')">commit=>mutation</button>
        <button @click="$store.dispatch('add')">dispatch=>action</button>
        {{ $store.state.count }}
        {{ $store.getters.doubleCount }}
        <router-view />
    </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
    name: 'App',
    components: {
        HelloWorld,
    },
    mounted() {
        // console.log(this)
    },
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
</style>
