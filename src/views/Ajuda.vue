<template>
    <FormAjuda @clickSubmit="onClickSaveSubmit"/>
</template>

<script>
import FormAjuda from "../components/FormAjuda.vue";
import * as controller from "../controller/ctlAjuda";

export default {
  components: {
    FormAjuda,
  },
  methods: {
    onClickSaveSubmit(form) {
      controller.incluir(form)
    },
  },
};
</script>
<style>
</style>