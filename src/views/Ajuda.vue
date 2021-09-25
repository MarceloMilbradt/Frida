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
    onClickSaveSubmit(id, ajuda) {
          controller.incluir(ajuda).then(() => {
            this.$router.push({ path: "/" });
          })
    }
  },
};
</script>
<style>
</style>