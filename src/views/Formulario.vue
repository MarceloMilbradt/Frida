<template>
  <h3>
    Formulário de Avaliação de Risco em Violência Doméstica e Familiar contra a
    Mulher
  </h3>

  <el-form ref="form" :model="questions">
    <el-form-item prop="nome">
      <el-input v-model="form.nome" placeholder="Nome"></el-input>
    </el-form-item>
    <div v-bind:key="question.id" v-for="question in questions">
      <Question v-model="question.answer" :alternatives="question.alternatives" :question="question" @change="changeAnswer" />
    </div>
  </el-form>

  <el-card>
    <h4>Resumo da Avaliação de Risco FRIDA</h4>
    <p>
      Abaixo é informada o totalizador de respostas agrupado por 
      "<b>Não</b>", 
      "<b>NS/NA</b> (Não se Aplica/Não Informado)"
      e "<b>Sim</b>"
      informados no Formulário de Avaliação FRIDA, assim como o resultado do Grau de Risco detectado nesse formulário.
    </p>
    <el-progress type="circle" :percentage="this.progresso.percNao" status="success">
      <span class="percentage-label">Não</span>
    </el-progress>

    <el-progress type="circle" :percentage="this.progresso.percNSeNA" status="warning">
      <span class="percentage-label">NS/NA</span>
    </el-progress>

    <el-progress type="circle" :percentage="this.progresso.percSim" status="exception">
      <span class="percentage-label">Sim</span>
    </el-progress>
    <el-divider>
      <p>Grau de Risco: <b>{{this.form.resultado.riscoDescricao}}</b></p>
    </el-divider>
  </el-card>

  <el-button class="botao-salvar" @click="onClick" type="success">Salvar</el-button>
</template>

<script>
import Question from "../components/Question";
import * as controller from "../controller/ctlFormulario";

export default {
  name: "App",
  components: {
    Question,
  },
  methods: {
    changeAnswer() {
      this.montarGraficoProgresso();
    },
    montarGraficoProgresso() {
      this.montarFormulario();

      var calculaPerc = (total) => {
        return Number((total * 100 / 19).toFixed(2))
      }

      this.progresso = {
        percNao: calculaPerc(this.form.resultado.totalNao),
        percNSeNA: calculaPerc(this.form.resultado.totalNaoSabe + this.form.resultado.totalNaoAplica),
        percSim: calculaPerc(this.form.resultado.totalSim),
      }
    },
    onClick() {
      if (this.isFormularioValido()) {
        this.montarFormulario();
        if (this.id) {
          controller.alterar(this.id, this.form).then(() => {
            this.$router.push({ path: "ListarAvaliacao" });
          });
        } else {
          controller.incluir(this.form).then(() => {
            this.$router.push({ path: "ListarAvaliacao" });
          });
        }
      }
    },
    isFormularioValido() {
      let questaoInvalida = this.questions.find(x => x.answer == undefined);
      if (questaoInvalida) {
        this.$message.error("Questão " + questaoInvalida.id + " é obrigatória");
        return false;
      }
      return true;
    },
    montarFormulario() {
      for (const q of this.questions) {
        this.form.resposta["r_" + q.id] = q.answer;
      }
      this.form.resultado = this.geraResultado(this.form.resposta);
    },
    geraResultado(respostas) {
      var resp = Object.values(respostas);
      var counts = {};
      for (var num of resp) {
          counts[num] = counts[num] ? counts[num] + 1 : 1;
      }

      var totalSim = counts[1] || 0;
      var totalNao = counts[2] || 0;
      var totalNaoSabe = counts[3] || 0;
      var totalNaoAplica = counts[4] || 0;
      var totalNSeNA = totalNaoSabe + totalNaoAplica;
      var risco = '';

      switch (totalSim) {
          case 0:
          case 1:
          case 2:
              risco = (totalNSeNA > 0) ? 'M' : 'B';
              break;
          case 3:
              risco = (totalNSeNA > 7) ? 'M' : 'B';
              break;
          case 4:
              risco = (totalNSeNA > 3) ? 'M' : 'B';
              break;
          case 5:
              risco = (totalNSeNA == 10) ? 'E' : 'M';
              break;
          case 6:
              risco = (totalNSeNA > 7 && totalNSeNA < 11) ? 'E' : 'M';
              break;
          case 7:
              risco = (totalNSeNA > 5 && totalNSeNA < 11) ? 'E' : 'M';
              break;
          case 8:
              risco = (totalNSeNA > 3 && totalNSeNA < 11) ? 'E' : 'M';
              break;
          case 9:
              risco = (totalNSeNA > 1 && totalNSeNA < 11) ? 'E' : 'M';
              break;
          default:
              risco = 'E';
              break;
      }

      return {
          totalSim: totalSim,
          totalNao: totalNao,
          totalNaoSabe: totalNaoSabe,
          totalNaoAplica: totalNaoAplica,
          totalNSeNA: totalNSeNA,
          risco: risco,
          riscoDescricao: (risco == 'E') ? 'Elevado' : (risco == 'M') ? 'Médio' : 'Baixo'
      };
    }
  },
  data() {
    return {
      id: null,
      form: {
        nome: "",
        data: new Date().toISOString(),
        resposta: {},
        resultado: {
          riscoDescricao: 'Não Classificado',
        },
      },
      progresso: {},
      items: [
        {
          to: "/",
          text: "Home",
        },
      ],
      questions: [
        {
          text: "Questão 1 - A violência vem aumentando de gravidade e/ou de frequência no último mês?",
          id: 1,
        },
        {
          text: "Questão 2 - A senhora/você está grávida ou teve bebê nos últimos 18 meses?",
          id: 2,
        },
        {
          text:
            "Questão 3 - A senhora/você tem filhos(as) com o(a) agressor(a)? (caso não tenham filhos em comum, registre não se aplica)." +
            " Em caso afirmativo, estão vivendo algum conflito com relação à guarda dos filhos, visitas ou pagamento de pensão pelo agressor?",
          id: 3,
        },
        {
          text:
            "Questão 4 - O(A) agressor(a) persegue a senhora/você, demonstra ciúmes excessivo, tenta controlar sua vida e as coisas que você faz? " +
            " (aonde você vai, com quem conversa, o tipo de roupa que usa, etc.)",
          id: 4,
        },
        {
          text:
            "Questão 5 - A senhora/você se separou recentemente do(a) agressor(a), tentou ou tem intenção de se separar?" +
            "\n Especifique: Separou □ Tentou □ Manifestou intenção □",
          /*outrasAlternativas: [
            {
              value: 1,
              text: "Separou",
            },
            {
              value: 2,
              text: "Tentou",
            },
            {
              value: 2,
              text: "Manifestou intenção",
            },
          ],*/
          id: 5,
        },
        {
          text:
            "Questão 6 - O(A) agressor(a) também é violento com outras pessoas (familiares, amigos, colegas etc.)" +
            "\n Especifique: Crianças □ Outros familiares □ Outras pessoas □",
          id: 6,
        },
        {
          text:
            "Questão 7 - A senhora/ você possui algum animal doméstico? (caso não tenha animal doméstico, registre não se aplica)" +
            "\n Em caso afirmativo, o(a) agressor(a) maltrata ou agride o animal?",
          id: 7,
        },
        {
          text: "Questão 8 - O(A) agressor(a) já a agrediu fisicamente outras vezes?",
          id: 8,
        },
        {
          text: "Questão 9 - Alguma vez o(a) agressor(a) tentou estrangular, sufocar ou afogar a senhora/você?",
          id: 9,
        },
        {
          text: "Questão 10 - O(A) agressor(a) já fez ameças de morte ou tentou matar a senhora/você?",
          id: 10,
        },
        {
          text:
            "Questão 11 - O(A) agressor(a) já usou, ameaçou usar arma de fogo contra a senhora/você ou tem fácil acesso a uma arma?" +
            "\n Especifique: Usou □ Ameaçou usar □ Tem fácil acesso □",
          id: 11,
        },
        {
          text: "Questão 12 - O(A) agressor(a) já a ameaçou ou feriu com outro tipo de arma ou instrumento?",
          id: 12,
        },
        {
          text:
            "Questão 13 - A senhora/você necessitou de atendimento médico e/ou internação após algumas dessas agressões?" +
            "\n Especifique: Atendimento médico □ Internação",
          id: 13,
        },
        {
          text: "Questão 14 - O(A) agressor(a) é usuário de drogas e/ou bebidas alcóolicas",
          id: 14,
        },
        {
          text: "Questão 15 - O(A) agressor(a) faz uso de medicação controlada para alguma doença mental/psiquiátrica?",
          id: 15,
        },
        {
          text:
            "Questão 16 - A senhora/você já teve ou tem medida protetiva de urgência? (caso não tenha tido medidas protetivas de urgência antes, registre não se aplica)." +
            " O(A) agressor(a) já descumpriu medida protetiva de afastamento ou proibição de contato?",
          id: 16,
        },
        {
          text: "Questão 17 - O(A) agressor(a) já ameaçou ou tentou se matar alguma vez?",
          id: 17,
        },
        {
          text: "Questão 18 - O(A) agressor(a) já obrigou a senhora/você a ter relações sexuais contra a sua vontade?",
          id: 18,
        },
        {
          text: "Questão 19 - O(A) agressor(a) está com dificuldades financeiras, está desempregado ou tem dificuldade de se manter no emprego?",
          id: 19,
        },
      ],
    };
  },
  async created() {
    try {
      var id = this.$route.query.id;
      if (id) {
        var dados = await controller.bucarPorId(id);
        this.form = dados;
        this.id = id;

        for (var [key, answer] of Object.entries(dados.resposta)) {
          var q_id = key.replace('r_', '') - 1;
          this.questions[q_id].answer = answer;
        }
        this.montarGraficoProgresso();
      }
    }
    catch (ex) {
      console.error("Erro ao Buscar Valores", ex);
    }
  },
};
</script>

<style>
.el-radio__inner::after {
  width: 0.5em;
  height: 0.5em;
}
.el-radio__inner {
  width: 1.125em;
  height: 1.125em;
}
</style>

<style scoped>
.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}

.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 18px;
}

.el-progress {
  margin-top: 10px;
  margin-left: 10px;
}

.botao-salvar {
  margin-top: 10px;
}
</style>
