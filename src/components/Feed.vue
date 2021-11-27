<template>
  <div class="header" v-if="$store.getters.getLogged">
    <el-button type="success" @click="handleAdd()">Incluir</el-button>
  </div>
  <div class="feed">
    <el-card class="post" v-for="post in listFeed" :key="post.id" :body-style="{ padding: '0px' }">
      <!-- <img :src="" class="image" /> -->
      <el-image style="width: 100%; height: 180px" :src="post.miniatura" :fit="'cover'"></el-image>
      <div style="padding: 14px">
        <span>{{post.titulo}}</span>
        <div class="bottom">
          <time class="time">{{ post.data}}</time>
          <div v-if="$store.getters.getLogged">
            <el-button type="danger" size="small" @click="DeletePost(post.id)">
              <font-awesome-icon icon="trash-alt" />
            </el-button>
            <el-button type="primary" size="small" @click="EditPost(post.id)">
              <font-awesome-icon icon="edit" />
            </el-button>
          </div>
          <el-button v-else @click="()=>viewPost(post.id)" type="text" class="button">Veja mais</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { formatRelativeDate } from "../controller/Util";
import * as controller from "../controller/ctlPosts";
export default {
  data() {
    return {
      dados: [],
    };
  },
  props: ["limit"],
  computed: {
    listFeed() {
      return this.dados.map((d) => {
        d.data = formatRelativeDate(d.data);
        return d;
      });
    },
  },
  methods: {
    async listarDados() {
      if (!this.$store.getters.getLogged)
        this.dados = await controller.listarTodosAnonimo(this.limit);
      else this.dados = await controller.listarTodos();
    },
    viewPost(id) {
      return this.$router.push({ name: "Post", params: { id } });
    },
    async DeletePost(id) {
      await controller.excluir(id);
      this.dados = [];
      await this.listarDados();
    },
    async EditPost(id) {
      return this.$router.push({ name: "CriarPosts", params: { id } });
    },
    async NewPost() {
      return this.$router.push({ name: "CriarPosts" });
    },
  },
  async created() {
    this.listarDados();
  },
};
</script>

<style scoped>
.header {
  margin: 1em 0;
  text-align: right;
}

.post {
  text-align: left;
}

.feed {
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
@media (max-width: 960px) {
  .feed {
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr 1fr;
  }
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>