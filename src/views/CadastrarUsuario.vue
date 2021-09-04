<template>
  <FormPessoa :emailField="true" ref="user" :text="'Usuario'" @form-validate="setValid" v-model="usuario">
    <FormFooter @btn-click-next="onClick" @btn-click-prev="changeTab(-1)" :hide="[true, false]" :text="['', 'Salvar']" />
  </FormPessoa>
</template>

<script>
import FormPessoa from "../components/FormPessoa.vue";
import FormFooter from "../components/FormFooter.vue";
import * as controller from "../controller/ctlUsuario";

export default {
  name: "CadastroUser",
  components: {
    FormPessoa,
    FormFooter,
  },
  data() {
    return {
      usuario: {
        endereco: {},
        trabalho: false,
        filiacao: {},
      },
      loading: false,
    };
  },
  methods: {
    setValid(valid) {
      this.usuario.valid = valid;
    },
    async onClick() {
      this.usuario.valid = await this.$refs.user.validate()
      if (!this.usuario.valid) return;
      // createCredentials(this.model.email, this.model.senha).then(() => {
      //   this.model.email = "";
      //   this.model.senha = "";
      // });
      controller.incluir(this.usuario);
    },
  },
};
</script>