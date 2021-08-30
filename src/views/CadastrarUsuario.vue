<template>
  <div class="login">
    <el-card>
      <h2>Cadastrar Usuário</h2>
      <el-form
        class="login-form"
        :model="model"
        :rules="rules"
        ref="form"
        @submit.prevent="login"
        :label-position="'right'"
        label-width="3.750em"
      >
        <el-row :gutter="20">
          <el-col :span="15" :xs="24" :sm="24" :md="11" :lg="12" :xl="12">
            <TextField v-model="model.nome" label="Nome" />
          </el-col>
          <el-col :span="15" :xs="24" :sm="24" :md="11" :lg="12" :xl="12">
            <TextField v-model="model.usuario" label="Usuário" />
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="15" :xs="24" :sm="24" :md="11" :lg="12" :xl="12">
            <el-form-item :label="'Senha'">
              <el-input
                v-model="model.senha"
                size="large"
                type="password"
                prefix-icon="fas fa-lock"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button @click="onClick" type="success">Cadastrar</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import TextField from "../components/TextField.vue";
import * as controller from "../controller/ctlUsuario";

export default {
  name: "login",
  components: {
    TextField,
  },
  data() {
    return {
      model: {
        nome: "",
        usuario: "",
        senha: "",
      },
      loading: false,
      rules: {
        usuario: [
          {
            required: true,
            message: "Usuário é obrigatório",
            trigger: "blur",
          },
          {
            min: 5,
            message: "O usuário precisa ter pelomenos 5 caracteres",
            trigger: "blur",
          },
        ],
        senha: [
          { required: true, message: "Senha é obrigatório", trigger: "blur" },
          {
            min: 5,
            message: "A senha precisa ter pelomenos 5 caracteres",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    async onClick() {
      let valid = await this.$refs.form.validate();
      if (!valid) return;

      controller.incluir(this.model);
    },
  },
};
</script>