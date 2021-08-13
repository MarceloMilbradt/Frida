<template>
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
export default {
  name: "App",
  components: {
    Question
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
          text: " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio dolore consequatur voluptas. Fugit qui aut dolorum esse consectetur sapiente ducimus consequuntur fugiat minima, harum nam autem ad temporibus atque omnis.",
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
