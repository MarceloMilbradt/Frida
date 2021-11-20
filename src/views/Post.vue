<template>
  <el-card class="post-summary">
    <el-image :preview-src-list="srcList" class="img-post" :initial-index="1" style="width: 100%; height: 190px" :src="post.miniatura" :fit="'cover'"></el-image>
    <el-header style="text-align: left;" height="1.250em">
      <div class="post-title"> <span style="font-size: 2em;">{{post.titulo}}</span><span style="font-size: .7em;"> {{post.data?.toDate()?.toLocaleString()}} </span>
      </div>
    </el-header>
    <el-divider></el-divider>
    <div v-html="post.conteudo"></div>
  </el-card>
</template>

<script>
import * as controller from "../controller/ctlPosts";
export default {
  data() {
    return {
      post: {},
      srcList: [],
    };
  },
  methods: {
    async find() {
      let id = this.$route.params.id;
      if (id) {
        let dados = await controller.bucarPorIdAnonimo(id);
        this.post = { ...dados };
        this.id = id;
        this.srcList.push(this.post.miniatura);
      }
    },
  },
  created() {
     this.find();
  },
};
</script>

<style scoped>
.post-summary {
  min-height: 80vh;
}
.img-post {
  margin-bottom: 20px;
}
.post-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>