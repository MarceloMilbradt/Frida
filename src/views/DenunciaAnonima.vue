<template>
    <FormDenunciaAnonima @clickSubmit="onClickSaveSubmit"/>
</template>

<script>
import FormDenunciaAnonima from "../components/FormDenunciaAnonima.vue";
import * as controller from "../controller/ctlDenunciaAnonima";

export default {
  components: {
    FormDenunciaAnonima,
  },
  methods: {
    onClickSaveSubmit(id, denunciaAnonima) {
          controller.incluir(denunciaAnonima).then(() => {
            this.$router.push({ path: "/" });
          })
    }
  },
};
</script>
<style>
</style>