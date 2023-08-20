<script setup lang="ts">
    const username = ref("nateainsworth");
    const token = ref()
    const userKey = ref(0);

    // changes the key value essentially unmounting the component and remounting it
    const UserRerender = () => {
        userKey.value++;
    };
</script>

<template>
    <LayoutNavBar v-model:username-value="username" v-model:token-value="token" :onSearchChange="UserRerender" ></LayoutNavBar>
    <div class="p-4 pt-8 max-w-6xl mx-auto">
        <h1 class="text-3xl grow mb-4">Github Rest Api Search</h1>
        <LayoutUserCard v-if="username" :user-name="username" :auth-token="token" :key="userKey"/>
        <div v-else class="w-full h-56 flex text-center align-middle justify-center items-center"><h2 class="text-xl grow">Please enter a Github profile to search.</h2></div>
    </div>
</template>