<template>
  <el-card class="box-card">
    <el-container>
      <h3>
        Formulário de Denúncia Anônima
      </h3>
      <el-header style="text-align: center" height="20px">Precisamos de algumas informações para realizarmos a denúncia!</el-header>
      <el-divider></el-divider>
      <el-main>
        <el-form :model="form" :label-position="'top'" label-width="70px" :rules="rules" ref="form">
      
          <el-row>
            <el-col :span="24">
              <TextField v-model="form.motivo" prop="motivo" label="Qual fato você deseja comunicar na Denúncia?"/>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <TextField v-model="form.envolvidos" label="Quem são os envolvidos no fato ?" placeholder="Separe os nomes por vírgula (,) caso seja mais de uma pessoa"/>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <TextField v-model="form.local" label="Em que local ocorreu esse fato ?"/>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <TextField v-model="form.periodo" label="Quando ocorreu esse fato ?" placeholder="Período / data aproximada do(s) evento(s)"/>
            </el-col>
          </el-row>
          
          <el-row>
            <el-col :span="24">
              <el-button icon="el-icon-check" @click="clickSubmit" type="primary" plain>
                <span class="">Enviar</span>
              </el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-main>
    </el-container>
  </el-card>
</template>

<script>
import TextField from "./TextField.vue";
import * as controller from "../controller/ctlDenunciaAnonima";

export default {
  components: {
    TextField,
  },
  name: "FormPessoa",
  props: {
    text: String,
    anonimo: Boolean,
  },
  data() {
    return {
      id: null,
      form: {
        motivo: "",
        local: "",
        envolvidos: "",
        periodo: "",
        data: new Date()
      },
    };
  },
  computed: {
    rules() {
      return {
        motivo: [
          {
            required: !this.anonimo,
            message: "Informe ao menos o motivo da denúncia!",
            trigger: "blur",
          },
        ],
      };
    },
  },
  async created() {
    var id = this.$route.query.id;
    if (id) {
      var dados = await controller.bucarPorId(id);
      this.form = dados;
      this.id = id;
    }
  },
  methods: {
    clickSubmit() {
      this.$emit('clickSubmit', this.id, this.form);
    },
  },
};
</script>

<style scoped>
i {
  font-size: 2.5em;
}
.el-row {
  align-items: flex-end;
}
.box-card {
  width: 37.5em;
  margin: auto;
}
@media (max-width: 800px) {
  .box-card {
    width: 90vw;
  }
}
</style>