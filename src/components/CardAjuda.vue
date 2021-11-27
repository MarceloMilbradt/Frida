<template>
  <el-descriptions :column="2" border class="border-separate">
    <el-descriptions-item :label-class-name="min?'label-min':''" span="1">
      <template #label>
        <font-awesome-icon class="" icon="calendar-alt" />
        Data
      </template>
      {{ formatDate(ajuda.data) }}
    </el-descriptions-item>
    <el-descriptions-item :label-class-name="min?'label-min':''" span="1">
      <template #label>
        <font-awesome-icon class="" icon="info-circle" />
        Status
      </template>
      <el-form-item v-if="edit">
        <el-select v-model="ajuda.status" :default-first-option="true" @change="change">
          <el-option v-for="s in statusEnum" :key="s.value" :label="s.descricao" :value="s.value">
          </el-option>
        </el-select>
      </el-form-item>
      <span v-else>
        {{status.descricao}}
      </span>
    </el-descriptions-item>
    <el-descriptions-item :label-class-name="min?'label-min':''" span="2">
      <template #label>
        <font-awesome-icon class="" icon="user" />
        Nome
      </template>
      {{ ajuda.nome }}
    </el-descriptions-item>
    <el-descriptions-item v-if="ajuda.contato" :label-class-name="min?'label-min':''" span="2">
      <template #label>
        <font-awesome-icon class="" icon="phone-alt" />
        Contato
      </template>
      {{ ajuda.contato }}
    </el-descriptions-item>
    <el-descriptions-item v-if="ajuda.endereco" :label-class-name="min?'label-min':''" span="2">
      <template #label>
        <font-awesome-icon class="" icon="map-marker-alt" />
        Endereco
      </template>
      {{ ajuda.endereco }}
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
import { formatDate } from "../controller/Util";
import * as controller from "../controller/ctlAjuda";
export default {
  name: "CardAjuda",
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
    edit: { type: Boolean, default: false },
    min: { type: Boolean, default: true },
  },
  data() {
    return {      
    };
  },
  computed: {
    statusEnum(){
      return controller.buscarStatusAjuda();
    },
    status() {
      return this.statusEnum.find((s) => s.value === (this.ajuda.status ?? 0));
    },
    ajuda: {
      get() {
        return this.modelValue;
      },
      set(form) {
        this.$emit("update:modelValue", form);
      },
    },
  },
  methods: {
    formatDate(date) {
      return formatDate(date);
    },
    change() {
      var id = this.$route.query.id;
      controller.alterar(id, this.ajuda);
    },
  },
};
</script>

<style>
.border-separate table {
  border-collapse: separate !important;
}
.label-min {
  width: 140px;
}
</style>
<style scoped>
.el-form-item {
  display: flex;
  margin-bottom: 0;
}
.yellow {
  color: orange;
}
.green {
  color: green;
}
.red {
  color: red;
}
</style>
