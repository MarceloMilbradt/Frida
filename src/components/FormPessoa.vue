<template>
  <el-card class="box-card">
    <el-container>
      <el-header style="text-align: left" height="1.250em">{{text}}</el-header>
      <el-divider></el-divider>
      <el-main>
        <el-form @validate="validate" :model="form" :label-position="'right'" :label-width="'160px'" ref="form">
          <FormPessoaBase v-model="form" :emailField="emailField"></FormPessoaBase>
          <el-space direction="vertical" fill wrap style="width: 100%">
            <el-divider content-position="right" v-if="form?.endereco">Endereço
              <AddButton v-model="exibeEndereco" />
            </el-divider>
            <el-collapse-transition>
              <FormEndereco v-if="exibeEndereco" v-model="form.endereco"></FormEndereco>
            </el-collapse-transition>
            <el-divider content-position="right" v-if="form?.filiacao">Filiação
              <AddButton v-model="exibeFiliacao" />
            </el-divider>
            <el-collapse-transition>
              <FormFiliacao v-if="exibeFiliacao" v-model="form.filiacao"></FormFiliacao>
            </el-collapse-transition>

            <el-divider v-if="form?.trabalho" content-position="right">Trabalho
              <AddButton v-model="exibeTrabalho" />
            </el-divider>
            <el-collapse-transition>
              <FormProfissao v-if="exibeTrabalho" v-model="form.trabalho"></FormProfissao>
            </el-collapse-transition>
          </el-space>
        </el-form>
        <div style="margin-top: 20px">
          <slot></slot>
        </div>
      </el-main>
    </el-container>
  </el-card>
</template>

<script>
import FormEndereco from "./FormEndereco.vue";
import FormProfissao from "./FormProfissao.vue";
import FormFiliacao from "./FormFiliacao.vue";
import FormPessoaBase from "./FormPessoaBase.vue";
import AddButton from "./AddRemoveButton.vue";

export default {
  components: {
    FormEndereco,
    FormFiliacao,
    FormProfissao,
    FormPessoaBase,
    AddButton,
  },
  name: "FormPessoa",
  emits: ["update:modelValue", "form-validate"],
  data() {
    return {
      exibeEndereco: false,
      exibeTrabalho: false,
      exibeFiliacao: false,
      isValid: {},
    };
  },
  props: {
    text: String,
    storeId: String,
    emailField: Boolean,
    modelValue: Object,
  },
  computed: {
    form: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
  methods: {
    async validate(p, v) {
      this.isValid[p] = v;
      let valid = Object.values(this.isValid).every((v) => v);
      if (this.form) this.form.valid = valid;
      this.$emit("form-validate", valid);
      return valid
    },
  },
};
</script>

<style scoped>
.box-card {
  margin: 0 0 1.25em 0;
}
</style>