<template>
  <el-descriptions :column="2" border class="border-separate">
    <el-descriptions-item :label-class-name="min?'label-min':''" span="1">
      <template #label>
        <font-awesome-icon class="" icon="calendar-alt" />
        Data
      </template>
      {{ formatDate(denunciaAnonima.data) }}
    </el-descriptions-item>

    <el-descriptions-item :label-class-name="min?'label-min':''" span="1">
      <template #label>
        Status
        <font-awesome-icon :class="status.color" :icon="status.icon" />
      </template>
      <el-form-item v-if="edit">
        <el-select v-model="denunciaAnonima.status" :default-first-option="true" @change="change">
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
        Envolvidos
      </template>
      {{ denunciaAnonima.envolvidos }}
    </el-descriptions-item>

    <el-descriptions-item :label-class-name="min?'label-min':''" span="2">
      <template #label>
        <font-awesome-icon class="" icon="comment" />
        Motivo
      </template>
      {{ denunciaAnonima.motivo }}
    </el-descriptions-item>

    <el-descriptions-item :label-class-name="min?'label-min':''" span="2">
      <template #label>
        <font-awesome-icon class="" icon="map-marker-alt" />
        Local
      </template>
      {{ denunciaAnonima.local }}
    </el-descriptions-item>

    <el-descriptions-item :label-class-name="min?'label-min':''" span="2">
      <template #label>
        <font-awesome-icon class="" icon="calendar-week" />
        Período
      </template>
      {{ denunciaAnonima.periodo }}
    </el-descriptions-item>

  </el-descriptions>
</template>

<script>
import { formatDate } from "../controller/Util";
import * as controller from "../controller/ctlDenunciaAnonima";
export default {
  name: "CardDenunciaAnonima",
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
      return controller.buscarStatusDenuncia();
    },
    status() {
      return this.statusEnum.find((s) => s.value === (this.denunciaAnonima.status ?? 0));
    },
    denunciaAnonima: {
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
      controller.alterar(this.denunciaAnonima.id, this.denunciaAnonima);
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
