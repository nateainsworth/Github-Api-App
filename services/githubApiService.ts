const config = useRuntimeConfig();

export const githubApiService = {

    fetchUserData: (username: String,token:string) => {
        console.log(token);
        const userUrl = ref(`https://api.github.com/users/${username}`)
        const authToken = `bearer ${token? token : config.public.apiToken}`;
        // if api token add header it not don't
        if(token || config.public.apiToken){
            const {data, pending, error} = useLazyFetch(userUrl.value,{
                transform: (DataT) => DataT as GitUser,
                headers: {
                    Authorization: authToken
                }
            });
            return {data,pending,error};
        }else{
            const {data, pending, error} = useLazyFetch(userUrl.value,{
                transform: (DataT) => DataT as GitUser,
            });
            return {data,pending,error};
        }
    },
    fetchUserRepos: (username: String,user:Ref<GitUser | null>,token:string) => {

        const authToken = `bearer ${token? token : config.public.apiToken}`;
         // if api token add header it not don't
        if(token || config.public.apiToken){
            const repoUrl = ref(`https://api.github.com/user/repos?access_token=${authToken}`)
            const {data, pending, error} = useLazyFetch(repoUrl.value,{
                immediate:false,
                watch:[user],
                transform: (DataT) => DataT as Array<GitRepo>,
                headers: {
                    Authorization: authToken
                }
            });
            return {data,pending,error};
        }else{
            const repoUrl = ref(`https://api.github.com/users/${username}/repos`)
            const {data, pending, error} = useLazyFetch(repoUrl.value,{
                immediate:false,
                watch:[user],
                transform: (DataT) => DataT as Array<GitRepo>,
            });
            return {data,pending,error};
        }
    }
};
