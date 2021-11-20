<template>
  <div class="feed">
    <el-card class="post" v-for="post in listFeed" :key="post.id" :body-style="{ padding: '0px' }">
      <!-- <img :src="" class="image" /> -->
      <el-image style="width: 100%; height: 180px" :src="post.miniatura" :fit="'cover'"></el-image>
      <div style="padding: 14px">
        <span>{{post.titulo}}</span>
        <div class="bottom">
          <time class="time">{{ post.data}}</time>
          <el-button  @click="()=>viewPost(post.id)" type="text" class="button">Veja mais</el-button>
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
  props: ['limit'],
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
      this.dados = await controller.listarTodosAnonimo(this.limit);
    },
    viewPost(id){
      return this.$router.push({ name: "Post", params:{id} })
    }
  },
  async created() {
    this.listarDados();
  },
};
</script>

<style scoped>
.post {
  text-align: left;
}
.feed {
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
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