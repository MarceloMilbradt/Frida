<template>
  <!-- <el-card class="box-card"> -->
  <el-container>
    <el-header style="text-align: left" height="1.250em">{{text}}</el-header>
    <el-divider></el-divider>
    <el-main style="text-align: left">
      <el-form @validate="validate" :model="form" :label-position="'right'" :label-width="'160px'" ref="form">

        <div :key="agressao.key" v-for="agressao in agressoes">

          <el-form-item :label="agressao.label">
            <el-switch v-model="agressao.selected" @change="(v)=>uncheck(agressao.key,v)"></el-switch>
          </el-form-item>

          <el-collapse-transition>
            <el-form-item v-if="findTags(agressao.label)">
              <el-checkbox-group v-model="form.agressao">
                <el-checkbox :label="subtipo" :name="agressao.key" :key="subtipo" v-for="subtipo in agressao.subtipos" border></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-collapse-transition>

        </div>

        <el-card shadow="hover">
          <div class="container">
            <el-tag :closable="tag.closable" :effect="tag.effect" :key="tag.tag" v-for="tag in form.tags?.map(remapTags)" :disable-transitions="false" @close="removeTag(tag.tag)">
              {{tag.tag}}
            </el-tag>
            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="mini" @keypress.enter.stop.prevent="handleInputConfirm" @blur="handleInputConfirm" maxlength="50">
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ Nova Tag</el-button>
          </div>

        </el-card>

      </el-form>
      <div style="margin-top: 20px">
        <slot></slot>
      </div>
    </el-main>
  </el-container>
  <!-- </el-card> -->
</template>

<script>
export default {
  components: {},
  name: "FormAdicinal",
  emits: ["update:modelValue", "form-validate"],
  data() {
    return {
      isValid: {},
      fisica: false,
      agressoes: [
        {
          label: "Violência Física",
          key: "fisica",
          selected: false,
          subtipos: [
            "Espancamento",
            "Atirar objetos, sacudir e apertar os braços",
            "Estrangulamento ou sufocamento",
            "Lesões com objetos cortantes ou perfurantes",
            "Ferimentos causados por queimaduras ou armas de fogo",
            "Tortura",
          ],
        },
        {
          label: "Violência Psicológica",
          key: "psicologica",
          selected: false,
          subtipos: [
            "Ameaças",
            "Constrangimento",
            "Humilhação",
            "Manipulação",
            "Isolamento (proibir de estudar e viajar ou de falar com amigos e parentes)",
            "Vigilância constante",
            "Perseguição contumaz",
            "Insultos",
            "Chantagem",
            "Exploração",
            "Limitação do direito de ir e vir",
            "Ridicularização",
            "Tirar a liberdade de crença",
            "Distorcer e omitir fatos para deixar a mulher em dúvida sobre a sua memória e sanidade (gaslighting)",
          ],
        },
        {
          label: "Violência Sexual",
          key: "sexual",
          selected: false,
          subtipos: [
            "Estupro",
            "Obrigar a mulher a fazer atos sexuais que causam desconforto ou repulsa",
            "Impedir o uso de métodos contraceptivos ou forçar a mulher a abortar",
            "Forçar matrimônio, gravidez ou prostituição por meio de coação, chantagem, suborno ou manipulação",
            "Limitar ou anular o exercício dos direitos sexuais e reprodutivos da mulher",
          ],
        },
        {
          label: "Violência Patrimonial",
          key: "patrimonial",
          selected: false,
          subtipos: [
            "Controlar o dinheiro",
            "Deixar de pagar pensão alimentícia",
            "Destruição de documentos pessoais",
            "Furto, extorsão ou dano",
            "Estelionato",
            "Privar de bens, valores ou recursos econômicos",
            "Causar danos propositais a objetos da mulher ou dos quais ela goste",
          ],
        },
        {
          label: "Violência Moral",
          key: "moral",
          selected: false,
          subtipos: [
            "Acusar a mulher de traição",
            "Emitir juízos morais sobre a conduta",
            "Fazer críticas mentirosas",
            "Expor a vida íntima",
            "Rebaixar a mulher por meio de xingamentos que incidem sobre a sua índole",
            "Desvalorizar a vítima pelo seu modo de se vestir",
          ],
        },
      ],
      inputVisible: false,
      inputValue: "",
    };
  },
  props: {
    text: String,
    storeId: String,
    modelValue: Object,
  },
  computed: {
    form: {
      get() {
        let value = this.modelValue;
        if (value.agressao == null) value.agressao  = [];
        return value;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
  methods: {
    async validate(p, v) {
      this.isValid[p] = v;
      let valid = Object.values(this.isValid).every((v) => v);
      if (this.form) this.form.valid = valid;
      this.$emit("form-validate", valid);
      return valid;
    },

    uncheck(key, v) {
      let agressao = this.agressoes.find((a) => a.key === key);

      if (v) {
        if (!this.form.tags) this.form.tags = [];
        this.form.tags = [...this.form.tags, agressao.label];
        return;
      }
      let newAgressoes = this.form.agressao.filter(
        (a) => !agressao.subtipos.includes(a)
      );
      this.removeTag(agressao.label);
      this.form.agressao = [...newAgressoes];
    },

    removeTag(tag) {
      let newTags = this.form.tags.filter((t) => t !== tag);
      this.form.tags = [...newTags];
      return this.form.tags;
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        if (!this.form.tags) this.form.tags = [];
        this.form.tags = [...this.form.tags, inputValue];
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    findTags(tag) {
      let agressao = this.agressoes.find((a) => a.label === tag);
      let used = this.form.tags?.includes(agressao.label);
      if (!agressao.selected) agressao.selected = used;
      return used;
    },
    remapTags(tag) {
      let agressao = this.agressoes.find((a) => a.label === tag);
      if (agressao) {
        return {
          tag,
          effect: "dark",
          closable: false,
        };
      }
      return {
        tag,
        effect: "light",
        closable: true,
      };
    },
  },
};
</script>

<style scoped>
.box-card {
  margin: 0 0 1.25em 0;
}
.el-checkbox-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  text-align: left;
}
.el-checkbox {
  overflow-wrap: break-word;
  white-space: pre-wrap;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  height: unset;
  margin-left: unset !important;
}
.container {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>