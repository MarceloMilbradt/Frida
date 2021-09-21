<template>
  <div class="login">
    <el-card>
      <h2>Login</h2>
      <el-form class="login-form" :model="model" :rules="rules" ref="form" @submit.prevent="login">
        <el-alert title="Falha no login" type="error" description="E-mail ou senhas incorretos!" show-icon v-if="fail">
        </el-alert>
        <el-form-item prop="email">
          <el-input v-model="model.email" placeholder="E-mail" prefix-icon="fas fa-user"></el-input>
        </el-form-item>
        <el-form-item prop="senha">
          <el-input v-model="model.senha" placeholder="Senha" type="password" prefix-icon="fas fa-lock"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" class="login-button" type="primary" native-type="submit" block>Login</el-button>
        </el-form-item>
        <a class="novo-link" href="#" @click="resetSenha">Esqueci a senha</a>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { resetSenha } from "../controller/AuthService";
export default {
  name: "login",
  data() {
    return {
      fail: false,
      model: {
        email: "",
        senha: "",
      },
      loading: false,
      rules: {
        email: [
          { required: true, message: "E-mail é obrigatório", trigger: "blur" },
        ],
        senha: [
          { required: true, message: "Senha é obrigatório", trigger: "blur" },
          {
            min: 6,
            message: "A senha precisa ter pelomenos 6 caracteres",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    resetSenha: function() {
      resetSenha(this.model.email);
    },
    async login() {
      this.fail = false;
      let valid = await this.$refs.form.validate();
      if (!valid) return;

      this.loading = true;

      await this.$store.dispatch("login", {
        email: this.model.email,
        password: this.model.senha,
      });

      this.loading = false;

      this.fail = !this.$store.getters.getLogged;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-button {
  width: 100%;
  margin-top: 2.5em;
}
.login-form {
  width: 18.125em;
}
.novo-link {
  margin-top: 0.625em;
}
</style>
<style scoped>
.el-button--primary {
  background: rgb(0, 124, 137);
  border-color: rgb(0, 124, 137);
}
.login .el-input__prefix {
  background: rgb(238, 237, 234);
  left: 0;
  height: calc(100% - 0.125em);
  left: 0.063em;
  top: 0.063em;
  border-radius: 0.188em;
}
.login .el-input input {
  padding-left: 2.188em;
}
.login .el-card {
  padding-top: 0;
  padding-bottom: 1.875em;
}
h2 {
  font-family: "Open Sans";
  letter-spacing: 0.063em;
  font-family: Roboto, sans-serif;
  padding-bottom: 1.25em;
}
a {
  color: rgb(0, 124, 137);
  text-decoration: none;
}
.login .el-card {
  width: 21.25em;
  display: flex;
  justify-content: center;
}
.el-alert {
  margin-bottom: 1.063em;
  text-align: left;
}
</style>
