<script setup lang="ts">
    const props = defineProps({
        name: String,
        bio: String,
        avatar: String,
        htmlLink: String,
        blog: String,
    })

</script>
<template>
    <div class="w-full bg-white border border-slate-200 rounded-lg shadow">
        <div class="flex flex-col w-full items-center mt-10">
            <img class="w-36 h-36 mb-3 rounded-full shadow-lg" :src="props.avatar" alt="Profile Avatar"/>
            <h3 class="text-xl text-slate-900 mb-1">{{props.name}}</h3>
            <span class="text-sm text-slate-500 px-2 text-center">{{ props.bio }}</span>
            <div class="flex mt-4 space-x-3 md:mt-6">
               <ElementsButton v-if="props.blog"  :href="props.blog" :target="'_blank'" name="Blog"/>
               <ElementsButton :href="props.htmlLink" :target="'_blank'" name="View on Github" />
            </div>
            <div class="flex mt-4 space-x-3 md:mt-6 bg-slate-100 w-full p-10">
                <slot></slot>
            </div>
        </div>
    </div>
</template>