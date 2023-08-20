<script setup lang="ts">
    const props = defineProps({
        name:String,
        list:Array<String>,
    })

    const emit = defineEmits<{
        (event: 'change', option: string):void
    }>();

    const open = ref(false);

    const selectedOption = ref<number>(0);

    const changeOption = (key:number, option:String) => {
        selectedOption.value = key;
        open.value = false; 
        emit('change',option as string);
    }

</script>
<template>
    <div @mouseleave="open = false" class="flex items-center relative justify-end">
        <p class="pr-4">{{ name }}:</p>
        <ElementsButton id="filter-button" class="w-44 justify-between" @click="open = !open" :name="props.list ? props.list[selectedOption] as string : ''">
            <IconsDownArrow/>
        </ElementsButton>
        <div 
        v-if="open"
        class="z-10 bg-white divide-y divide-slate-100 rounded-lg shadow w-44 absolute inset-y-full">
            <ul class="py-2 text-sm text-slate-700 bg-white">
                <li v-for="(option, key ) in props.list" :key="key" :id="'filter-option-' + key" @click="changeOption(key,option)">
                    <p class="block px-4 py-2 hover:bg-slate-100" >{{option}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>