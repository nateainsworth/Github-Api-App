<script setup lang="ts">

    // TODO: remove for debug only
    const showRawData = ref(false);

    const username = "nateainsworth";

    const {data: user, pending:pendingUser, error: userError} = githubApiService.fetchUserData(username);

    const {data: repos, pending: pendingRepo, error: repoError} = githubApiService.fetchUserRepos(username,user);
    
    const filteredRepos = ref();

    const order = ref("-")

    const filterCondition: Record<string, (reposValue: GitRepo[]) => GitRepo[]> = {
        'All': (reposValue) => reposValue, // No change needed for 'All' condition
        'Private': (reposValue) => reposValue.filter(repo => !repo.private),
        'Public': (reposValue) => reposValue.filter(repo => repo.private),
        'Alphabetically': (reposValue) => reposValue.slice().sort((a, b) => a.name.localeCompare(b.name)),
        'Date Created': (reposValue) => {
            return reposValue.slice().sort((a, b) => {
                const dateComparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
                return order.value === "+" ? dateComparison : -dateComparison;
            });
        },
        'Recently Updated': (reposValue) => {
            return reposValue.slice().sort((a, b) => {
                const dateComparison = new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
                return order.value === "+" ? dateComparison : -dateComparison;
            });
        },
    };

    const filterRepos = async (key: string) => {
        if(repos.value){
            let repoCopy = JSON.parse(JSON.stringify(repos.value));
            filteredRepos.value = await filterCondition[key](repoCopy);
        }
    }
    
</script>

<template>
    <h1 class="text-3xl grow">Github Rest Api Search</h1>
   
    <!--TODO: REMOVE later in development -->
    <button @click="showRawData = !showRawData">{{ showRawData? "Hide Raw":"Show Raw" }}</button>
    <pre v-if="showRawData">{{pendingRepo}}</pre>

    <div v-if="!pendingUser && !userError">
        <ProfileCard 
        :name="user?.name"
        :bio="user?.bio"
        :avatar="user?.avatar_url"
        :htmlLink="user?.html_url"
        :blog="user?.blog"
        >
            <div v-if="!pendingRepo && !repoError">
                <ElementsDropDown name="Order By" :list="Object.keys(filterCondition)" @change="filterRepos"></ElementsDropDown>
                <div v-for="(index, key) in filteredRepos? filteredRepos : repos" :key="key">
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