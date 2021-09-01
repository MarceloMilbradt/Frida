<template>
  <div class="login">
    <el-card>
      <h2>Login</h2>
      <el-form
        class="login-form"
        :model="model"
        :rules="rules"
        ref="form"
        @submit.prevent="login"
      >
        <el-alert
          title="Falha no login"
          type="error"
          description="Usuario ou senhas incorretos!"
          show-icon
          v-if="fail"
        >
        
        </el-alert>
        <el-form-item prop="usuario">
          <el-input
            v-model="model.usuario"
            placeholder="Usuário"
            prefix-icon="fas fa-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="senha">
          <el-input
            v-model="model.senha"
            placeholder="Senha"
            type="password"
            prefix-icon="fas fa-lock"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            class="login-button"
            type="primary"
            native-type="submit"
            block
            >Login</el-button
          >
        </el-form-item>
        <!-- <a class="novo-usuario" href="CadastrarUsuario">Criar novo usuário</a> -->
        <!-- <router-link class="link" to="CadastrarUsuario"
          >Criar novo usuário</router-link
        > -->
      </el-form>
    </el-card>
  </div>
</template>

<script>
import * as controller from "../controller/ctlUsuario";
export default {
  name: "login",
  data() {
    return {
      fail: false,
      model: {
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
    async login() {
      this.fail = false;
      let valid = await this.$refs.form.validate();
      if (!valid) return;

      this.loading = true;

      await this.$store.dispatch("login", {
        email: this.model.usuario,
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
.novo-usuario {
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
  margin-bottom:  1.063em;
  text-align: left;
}
</style>
