<script setup lang="ts">
const props = defineProps({
    primary: {
        type: Boolean,
        default: true,
    },
    href:{
        type:String,
        default: "#"
    },
    target:{
        type:String,
        default:"_self"
    },
    name:String,
})

const buttonName = toRef(props.name);
</script>
<template>
    <a :href="props.href" 
       class=" 
        inline-flex 
        items-center 
        px-4 py-2 
        text-sm 
        font-medium 
        text-center 
        rounded-lg 
        focus:ring-4 
        focus:outline-none"
        :target="props.target"
        
        :class="{'bg-emerald-500 text-white hover:bg-emerald-700 focus:ring-emerald-300' : props.primary,
                 'text-slate-900 bg-white border border-slate-300 hover:bg-slate-100 focus:ring-slate-200': !props.primary }"
        >
        {{ buttonName }}
        <slot></slot>
    </a>
</template>