<template>
  <el-button
    :type="value ? 'danger' : 'success'"
    @click="btnChangeValue"
    :icon="value ? 'el-icon-close' : 'el-icon-plus'"
    size="mini"
    style="margin: 0 0 0 0.938em"
    plain
    ><slot></slot
  ></el-button>
</template>

<script>
export default {
  name: "AddRemoveButton",
  emits: ["update:modelValue"],
  props: {
    modelValue: Boolean,
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
  methods: {
    btnChangeValue() {
      this.value = !this.value;
      this.$emit("btn-change");
    },
  },
};
</script>

<style>
</style>