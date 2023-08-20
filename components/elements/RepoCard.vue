<script setup lang="ts">
    const props = defineProps({
        name: String,
        description: String,
        htmlUrl: String,
        createdAt: String,
        updatedAt: String,
        visibility: Boolean,

    })

    const dayjs = useDayjs()

    const parseDate = (date:string) => {

        return dayjs(date).format("DD/MM/YYYY HH:mm")
    }
</script>
<template>
    <div class="w-full bg-white border border-slate-200 rounded-lg shadow my-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 p-2 ">
            <div class=""> {{ props.name }}</div>
            <div class="flex md:justify-end">
                <ElementsButton :href="props.htmlUrl" :target="'_blank'" name="View On Git"/>
            </div>
            <div class=""> {{ props.description }}</div>
            <div class="flex text-sm md:justify-end items-end">Created: {{ parseDate(props.createdAt as string) }} Last Updated: {{ parseDate(props.updatedAt as string) }}</div>
            

        </div>
    </div>
</template>