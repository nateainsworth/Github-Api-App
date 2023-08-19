<script setup lang="ts">
    const props = defineProps({
        name:String,
        list:Array<String>,
    })

    const open = ref(false);

</script>
<template>
    <div @focusout="open = false">
        <ElementsButton @click="open = !open" :name="props.name">
            <IconsDownArrow/>
        </ElementsButton>
        <div 
        v-if="open"
        class="z-10 bg-white divide-y divide-slate-100 rounded-lg shadow w-44">
            <ul class="py-2 text-sm text-slate-700">
                <ElementsDdItem v-for="(option, key ) in list" :key="key" @click="open = false">{{option}}</ElementsDdItem>
            </ul>
        </div>
    </div>
</template>