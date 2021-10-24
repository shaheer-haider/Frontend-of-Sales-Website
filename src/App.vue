<template>
    <!-- default for router view is home -->
    <main>
        <NavbarVue></NavbarVue>
        <router-view style="background-color: rgb(186, 221, 250); width: 100%"/>
    </main>
</template>

<script>
    import NavbarVue from "./components/Navbar.vue"

    export default {
        components: {NavbarVue}
    }

</script>

<style>
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: "Noto Sans Display", sans-serif;
    }

    main {
        display: flex;
    }

    .font-18 {
        font-size: 18px
    }

    .font-20 {
        font-size: 20px;
    }

    .flex-sp-between {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .width-400 {
        width: 400px;
    }

    input {
        padding: 5px;
        margin-right: 25px;
        font-size: 16px;
    }

    input[type="date"], input[type="text"], input[type="number"] {
        width: 300px;
    }

    input[type="date"], input[type="button"], input[type="month"] {
        cursor: pointer;
    }

    .pd-l-25 {
        padding-left: 25px;
    }

    .mg-t-50 {
        margin-top: 50px;
    }

    .mg-t-10 {
        margin-top: 10px;
    }

</style>
