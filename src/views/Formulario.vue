<template>
  <div>
    <Menu :items="items"></Menu>
  </div>
  <div v-bind:key="question.id" v-for="question in questions">
    <Question
      v-bind:alternatives="question.alternatives"
      v-bind:question="question"
      @radio-change="changeAwnser"
    />
  </div>
</template>

<script>
import Question from "../components/Question";
import Menu from "../components/Menu";
export default {
  name: "App",
  components: {
    Question,
    Menu
  },
  methods: {
    changeAwnser(q_id, awnser) {
      this.questions = this.questions.map((q) =>
        q.id == q_id ? { ...q, awnser } : q
      );
    },
  },
  data() {
    return {
      items: [
        {
          to: "/",
          text: "Home",
        },
      ],
      questions: [
        {
          text: "Questão 1",
          id: 1,
        },
        {
          text: "Questão 2",
          id: 2,
        },
        {
          text: "Questão 3",
          id: 3,
          alternatives: [
            {
              value: 1,
              text: "Alternativa 1",
            },
            {
              value: 2,
              text: "Alternativa 2",
            },
          ],
        },
        {
          text: "Questão 4",
          id: 4,
        },
      ],
    };
  },
};
</script>

<style>
.el-radio__inner::after {
  width: 8px;
  height: 8px;
}
.el-radio__inner {
  width: 18px;
  height: 18px;
}
</style>
