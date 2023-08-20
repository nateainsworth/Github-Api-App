<script setup lang="ts">
const props = defineProps(['usernameValue', 'tokenValue']);
const emit = defineEmits(['update:usernameValue', 'update:tokenValue','searchChange']);

const usernameValue = computed({
  get() {
    return props.usernameValue
  },
  set(value) {
    emit('update:usernameValue', value)
  }
})

const tokenValue = computed({
  get() {
    return props.tokenValue
  },
  set(value) {
    emit('update:tokenValue', value)
  }
})

</script>

<template>
    <nav class="navbar shadow-lg sticky top-0 w-full z-10 bg-white">
        <div class="max-w-6xl mx-auto">
            <div class="navbar-nav nav-btns flex place-content-center p-4">
                <label for="github-search" class="mb-2 text-sm font-medium text-slate-900 sr-only">Search Github (Required)</label>
                <div class="relative grow">
                    <input 
                    type="search" 
                    id="github-search" 
                    v-model="usernameValue"
                    @keydown.enter="$emit('searchChange')" 
                    alt="Github Profile Name"
                    class="block w-full p-4 text-sm text-slate-900 border border-slate-300 rounded-l-lg bg-slate-50 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none" 
                    placeholder="Search Github (Required)..." 
                    required>
                </div>
                <label for="token-search" class="mb-2 text-sm font-medium text-slate-900 sr-only">Access Token</label>
                <div class="relative grow">
                    <input 
                    type="password" 
                    id="token-search" 
                    v-model="tokenValue"
                    @keydown.enter="$emit('searchChange')"
                    alt="Github Access Token"
                    class="block w-full p-4 text-sm text-slate-900 border border-slate-300 bg-slate-50 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none" 
                    placeholder="Access Token" 
                    required>
                </div>
                <ElementsButton class="text-white w-12 radius-override items-center" @click="$emit('searchChange')"><IconsSearch class=" text-white h-6 w-6"/></ElementsButton>
            </div>
        </div>
    </nav>
</template>
<style scoped>
  .radius-override{
    border-top-left-radius: 0rem;
    border-bottom-left-radius: 0rem;
  }
</style>