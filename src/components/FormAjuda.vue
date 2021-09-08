<template>
  <el-card class="box-card">
    <el-container>
      <el-header style="text-align: center" height="20px">Precisamos de algumas informações suas para podermos te
        ajudar!</el-header>
      <el-divider></el-divider>
      <el-main>
        <el-form :model="form" :label-position="'top'" label-width="70px" :rules="rules" ref="form">
          <el-row>
            <el-col :span="24">
              <TextField :fontSize="'20px'" prop="nome" label="Nome" v-model="form.nome" />
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <TextField v-model="form.contato" label="Como podemos entrar em contato ?" />
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="geo ? 19 : 17">
              <TextField v-model="form.endereco" label="Onde podemos te encontrar ?" />
            </el-col>
            <el-col :span="geo ? 4 : 6">
              <el-button v-if="!geo" class="geo" :type="!geo ? 'info' : 'success'" icon="el-icon-location-outline" @click="getGeo" round>
                <span class="geo-text">Localização</span>
              </el-button>
              <CircleCheck v-if="geo" color="green" size="2" style="width: 2.25em; height: 2.25em; margin-bottom: 1.25em" />
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-button icon="el-icon-check" @click="$emit('clickSubmit', form)" type="primary" plain>
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
import { CircleCheck } from "@element-plus/icons";
import * as geolocation from "../controller/MapBoxs";

export default {
  components: {
    TextField,
    CircleCheck,
  },
  name: "FormPessoa",
  props: {
    text: String,
    anonimo: Boolean,
  },
  data() {
    return {
      form: {
        nome: "",
        endereco: "",
        contato: "",
        data: new Date().toISOString(),
        coords: {
          latitude: "",
          longitude: "",
        },
      },
      geo: false,
    };
  },
  computed: {
    rules() {
      return {
        nome: [
          {
            required: !this.anonimo,
            message: "Informe ao menos seu nome!",
            trigger: "blur",
          },
        ],
      };
    },
  },
  methods: {
    async setGeo({ latitude, longitude }) {
      console.log(latitude, longitude);
      const ends = await geolocation.getLocation(latitude, longitude);
      const endereco = ends?.place_name ?? "";
      this.form = { ...this.form, endereco, coords: { latitude, longitude } };
      this.geo = true;
    },
    getGeo() {
      return navigator.geolocation.getCurrentPosition(
        (geo) => this.setGeo(geo.coords),
        console.log,
        {
          enableHighAccuracy: true,
        }
      );
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
.geo {
  margin-bottom: 1.375em;
}
.box-card {
  width: 37.5em;
  margin: auto;
}
@media (max-width: 800px) {
  .box-card {
    width: 90vw;
  }
  .geo-text {
    display: none;
  }
}
</style>