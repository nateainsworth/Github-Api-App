<script setup lang="ts">

    const username = "nateainsworth";
    const userUrl = ref(`https://api.github.com/users/${username}`)
    const {data: user, pending:pendingUser, error: userError} = await useLazyFetch(userUrl.value,{
        transform: (DataT) => DataT as GitUser,
    });

    const repoUrl = ref(`https://api.github.com/users/${username}/repos`)
    const {data: repos, pending: pendingRepo, error: repoError} = await useLazyFetch(repoUrl.value,{
        immediate:false,
        watch:[user],
        transform: (DataT) => DataT as Array<GitRepo>,
    });

    const showRawData = ref(false);
</script>

<template>
    <h1 class="text-3xl grow">Github Rest Api Search</h1>
    <div v-if="!pendingUser && !userError">
        <!--TODO: REMOVE later in development -->
        <button @click="showRawData = !showRawData">{{ showRawData? "Hide Raw":"Show Raw" }}</button>
        <pre v-if="showRawData">{{ repos }}</pre>

        <ProfileCard 
        :name="user?.name"
        :bio="user?.bio"
        :avatar="user?.avatar_url"
        :htmlLink="user?.html_url"
        :blog="user?.blog"
        >
            <div></div>
            <div v-if="!pendingRepo && !repoError">
                <ElementsDropDown name="Order By" :list="['All','Private','Public','Date Created','Recently Updated']"></ElementsDropDown>
                <div v-for="(index, key) in repos" :key="key">
                    <p>{{index.name}}</p>
                </div>
                
            </div>
            <div v-else-if="repoError">Unable to Find any Repositories</div>
            <div v-else>Loading Repositories</div>
    
        </ProfileCard>
    </div>
    <div v-else-if="userError">Unable to Find User</div>
    <div v-else>Loading User Info</div>
    
</template>