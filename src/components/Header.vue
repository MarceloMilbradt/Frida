<template>
    <el-header>
        <el-menu :router="true" :default-active="$route.path" mode="horizontal">
            <el-menu-item
            :key="index"
            :index="rule.path"
            v-for="(rule, index) in $router.options.routes">
            <i :class="rule.icon"></i
            ><span class="menu-item-name">{{ rule.name }}</span>
            </el-menu-item>
        </el-menu>
    </el-header>
</template>