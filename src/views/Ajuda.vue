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
      if (id) {
          controller.alterar(id, ajuda).then(() => {
            this.$router.push({ path: "ListarAjuda" });
          });
        } else {
          controller.incluir(ajuda).then(() => {
            this.$router.push({ path: "ListarAjuda" });
          });
        }
    },
  },
};
</script>
<style>
</style>