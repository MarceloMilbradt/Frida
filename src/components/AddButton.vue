<template>
  <div :title="title" class="add-button" @click="btnChangeValue">
    <i class="el-icon-circle-plus-outline"></i>
    <div>{{label}}</div>
  </div>
</template>

<script>
export default {
  name: "AddButton",
  emits: ["update:modelValue","btn-change"],
  props: {
    modelValue: Boolean,
    title:String,
    label:String,
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
      this.$emit("btn-change",this.value);
    },
  },
};
</script>

<style>


.add-button {
  border: none;
  overflow: hidden;
  text-decoration: none;
  color: #44c767;
  background-color: inherit;
  text-align: center;
  cursor: pointer;
  margin: 5px 30px;
  white-space: nowrap;
  display: block;
  font-size: 3rem;
  border: #44c767 dashed thin;
  transition: all 0.2s ease-in;
  padding: 20px;
  transform: scale(1.03);
}

.add-button:hover {
  transform: scale(1.03);
  box-shadow: 0 5px 15px rgba(145, 92, 182, 0.4);
  border-style: solid;
}
.add-button div {
  font-size: 1rem;
}
</style>