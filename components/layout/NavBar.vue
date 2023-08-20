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
            <div class="navbar-nav nav-btns grid grid-cols-2 place-content-center p-4">
                <label for="github-search" class="mb-2 text-sm font-medium text-slate-900 sr-only">Search Github (Required)</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <IconsSearch/>
                    </div>
                    <input 
                    type="search" 
                    id="github-search" 
                    v-model="usernameValue"
                    @keydown.enter="$emit('searchChange')" 
                    alt="Github Profile Name"
                    class="block w-full p-4 pl-10 text-sm text-slate-900 border border-slate-300 rounded-l-lg bg-slate-50 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none" 
                    placeholder="Search Github (Required)..." 
                    required>
                </div>
                <label for="token-search" class="mb-2 text-sm font-medium text-slate-900 sr-only">Access Token</label>
                <div class="relative">
                    <input 
                    type="password" 
                    id="token-search" 
                    v-model="tokenValue"
                    @keydown.enter="$emit('searchChange')"
                    alt="Github Access Token"
                    class="block w-full p-4 text-sm text-slate-900 border border-slate-300 rounded-r-lg bg-slate-50 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none" 
                    placeholder="Access Token" 
                    required>
                </div>
            </div>
        </div>
    </nav>
</template>