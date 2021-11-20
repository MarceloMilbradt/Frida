<template>
  <div>
    <Breadcrumb>
    </Breadcrumb>
    <router-view></router-view>
  </div>
</template>

<script>
import Breadcrumb from "../components/Breadcrumb.vue";
export default {
  components: {
    Breadcrumb,
  },
};
</script>

<style>
</style>