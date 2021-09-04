<template>
  <FormPessoa :emailField="true" ref="usr" v-model="form" text="Usuario">
    <FormFooter
      @btn-click-prev="onClick"
      :hide="[true,false]"
      :text="['','Salvar']"
    />
  </FormPessoa>
</template>

<script>
import FormPessoa from "../components/FormPessoa.vue";
import FormFooter from "../components/FormFooter.vue";
import * as controller from "../controller/ctlUsuario";

export default {
  name: "login",
  components: {
    FormPessoa,
    FormFooter
  },
  data() {
    return {
      email: "",
      form: {
        endereco: {},
        trabalho: false,
        filiacao: {},
      },
      loading: false,
    };
  },
  methods: {
    async onClick() {
      let valid = await this.$refs.usr.validate();
      let data = this.$refs.usr.$data.form;
      if (!valid) return;

      // createCredentials(this.model.email, this.model.senha).then(() => {
      //   this.model.email = "";
      //   this.model.senha = "";
      // });
      controller.incluir(data);
    },
  },
};
</script>