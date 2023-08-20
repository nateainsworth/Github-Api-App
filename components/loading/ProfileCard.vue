<template>
     <div class="w-full bg-white border border-slate-200 rounded-lg shadow ">
        <div class="flex flex-col w-full items-center mt-10 animate-pulse">
            <div class="w-36 h-36 mb-3 rounded-full shadow-lg bg-slate-200"></div>
            <div class="h-9 w-1/4 bg-slate-200 rounded-md"> </div>
            <div class="w-full flex items-center flex-col mt-4">
                <div class="h-3 w-1/2 bg-slate-200 px-2 rounded-md mb-4"></div>
                <div class="h-3 w-1/2 bg-slate-200 px-2 rounded-md"></div>
            </div>
            <div class="w-full flex items-center mt-4 md:mt-6 justify-center">
                <div class="h-9 w-1/6 bg-slate-200 rounded-md m-2"> </div>
                <div class="h-9 w-1/6 bg-slate-200 rounded-md m-2"> </div>
            </div>
            <h3 class="text-2xl text-left w-full pl-9 mt-9"><div class="h-9 w-1/6 bg-slate-200 rounded-md"> </div></h3>
            <div class="mt-4 bg-slate-100 w-full p-10">
                <slot></slot>
            </div>
        </div>
    </div>
</template>