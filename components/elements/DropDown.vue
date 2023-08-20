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
    <div @mouseleave="open = false">
        <p>{{ name }}:</p>
        <ElementsButton @click="open = !open" :name="props.list ? props.list[selectedOption] as string : ''">
            <IconsDownArrow/>
        </ElementsButton>
        <div 
        v-if="open"
        class="z-10 bg-white divide-y divide-slate-100 rounded-lg shadow w-44">
            <ul class="py-2 text-sm text-slate-700">
                <li v-for="(option, key ) in props.list" :key="key">
                    <p class="block px-4 py-2 hover:bg-slate-100" @click="changeOption(key,option)">{{option}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>