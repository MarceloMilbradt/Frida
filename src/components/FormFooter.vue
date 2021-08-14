<template>
  <footer>
    <div>
      <el-button
        v-if="!hide[0]"
        :type="type[0] ?? 'default'"
        @click="onClick('prev')"
        >{{ text[0] ?? "Voltar" }}</el-button
      >
    </div>
    <div>
        <el-button
      v-if="!hide[1]"
      :type="type[1] ?? 'primary'"
      @click="onClick('next')"
      >{{ text[1] ?? "Avançar" }}</el-button
    >
    </div>
  </footer>
</template>

<script>
export default {
  name: "FormFooter",
  props: {
    hide: {
      type: Array,
      default: () => [false, false],
    },
    type: {
      type: Array,
      default: () => ["default", "primary"],
    },
    text: {
      type: Array,
      default: () => ["Voltar", "Avançar"],
    },
  },
  methods: {
    onClick(dir) {
      this.$emit(`btn-click-${dir}`);
    },
  },
};
</script>
<style scoped>
footer {
  display: flex;
  justify-content: space-between;
}
</style>