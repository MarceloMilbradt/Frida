<template>
  <FormPessoa
    :emailField="true"
    ref="user"
    :text="'Usuario'"
    @form-validate="setValid"
    v-model="usuario"
  >
    <FormFooter
      @btn-click-next="onClick"
      @btn-click-prev="voltarListaUsuario"
      :hide="[false, false]"
      :text="['Voltar', 'Salvar']"
    />
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
      id: null,
      usuario: {
        endereco: {},
        trabalho: false,
        filiacao: {},
      },
      loading: false,
    };
  },
  async created() {
    var id = this.$route.query.id;
    if (id) {
      var dados = await controller.bucarPorId(id);
      this.usuario = dados;
      this.id = id;
    }
  },
  methods: {
    async onClick() {
      let valid = await this.$refs.user.validate();
      console.log("valid =", valid);
      //if (!valid) return;

      if (this.id) {
        controller.alterar(this.id, this.usuario).then(() => {
          this.$router.push({ path: "ListarUsuario" });
        });
      } else {
        controller.incluir(this.usuario).then(() => {
          this.$router.push({ path: "ListarUsuario" });
        });
      }
    },
    voltarListaUsuario() {
      this.$router.push({ path: "ListarUsuario" });
    },
  },
};
</script>
