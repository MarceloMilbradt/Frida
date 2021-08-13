<template>
  <el-card class="box-card">
    <template #header>
      <h3>{{ question.text }}</h3>
    </template>
    <el-radio-group
      class="radio-group"
      v-model="val"
      @change="(val) => $emit('radio-change', question.id, val)"
    >
      <div v-bind:key="alternative.value" v-for="alternative in alternatives">
        <el-radio :label="alternative.value">{{ alternative.text }}</el-radio>
      </div>
    </el-radio-group>
  </el-card>
</template>

<script>
export default {
  name: "Question",
  emits: ["radio-change"],
  props: {
    question: Object,
    alternatives: {
      type: Array,
      default() {
        return [
          {
            value: 1,
            text: "Sim",
          },
          {
            value: 2,
            text: "Não",
          },
          {
            value: 3,
            text: "Não sei",
          },
          {
            value: 4,
            text: "Não se aplica",
          },
        ];
      },
    },
  },
  data() {
    return {
      val: 0,
    };
  },
};
</script>

<style scoped>
.radio-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}
h3 {
  font-size: 1em;
  text-align: left;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  margin: 20px 0 20px 0;
}
</style>