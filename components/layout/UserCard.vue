<script setup lang="ts">

    const props = defineProps({
        userName:{
            type:String,
            default:null
        },
        authToken:{
            type:String,
            default:null
        }
    })

    console.log(props.authToken);

    // TODO: remove for debug only
    const showRawData = ref(false);

    // fetch data from Github
    const {data: user, pending:pendingUser, error: userError} = githubApiService.fetchUserData(props.userName, props.authToken);
    const {data: repos, pending: pendingRepo, error: repoError} = githubApiService.fetchUserRepos(props.userName,user, props.authToken);
    
    
    const filteredRepos = ref();

    // TODO: update for alphabetically switching
    // for switching order of date created and recently Updated 
    const order = ref("-")

    // Filter repo results or return all values for All
    const filterCondition: Record<string, (reposValue: GitRepo[]) => GitRepo[]> = {
        'All': (reposValue) => reposValue,
        'Private': (reposValue) => reposValue.filter(repo => repo.visibility == "private"),
        'Public': (reposValue) => reposValue.filter(repo => repo.visibility == "public"),
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
   
    <!--TODO: REMOVE later in development
    <button @click="showRawData = !showRawData">{{ showRawData? "Hide Raw":"Show Raw" }}</button>
    <pre v-if="showRawData">{{repos}}</pre>
     -->
    
    <div v-if="!pendingUser && !userError">
        <ElementsProfileCard 
        :name="user?.name"
        :bio="user?.bio"
        :avatar="user?.avatar_url"
        :htmlLink="user?.html_url"
        :blog="user?.blog"
        >
            <div v-if="!pendingRepo && !repoError">
                <ElementsDropDown name="Filter" :list="Object.keys(filterCondition)" @change="filterRepos"></ElementsDropDown>
                <div v-for="(index, key) in filteredRepos? filteredRepos : repos" :key="key" class="w-full">
                    <ElementsRepoCard 
                    :name="index?.name"
                    :description="index?.description"
                    :html-url="index?.html_url"
                    :created-at="index?.created_at"
                    :updated-at="index?.updated_at"
                    :visibility="index?.private"
                    />
                </div>   
            </div>
            <div v-else-if="repoError" class="p-4">Unable to Find any Repositories</div>
            <div v-else>
                <LoadingRepoCard v-for="n in 10"/>
            </div>
        </ElementsProfileCard>
    </div>
    <div v-else-if="userError" class="my-9">Unable to Find User</div>
    <div v-else><LoadingProfileCard/></div>
    
</template>