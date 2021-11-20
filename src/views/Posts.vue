<template>
  <el-card class="left">
    <el-form ref="form" :model="post" label-width="190px">
      <el-form-item label="Titulo">
        <el-input v-model="post.titulo"></el-input>
      </el-form-item>
      <el-form-item label="Data para o post">
        <el-date-picker v-model="post.data" type="datetime" placeholder="Selecione a data do post" :shortcuts="shortcuts">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="Miniatura" v-if="!hasImage">
        <el-upload action="#" v-model="post.miniatura" accept="image/png, image/jpeg" list-type="picture-card" :thumbnail-mode="true" :on-preview="handlePictureCardPreview" :multiple="false" :on-remove="handleRemove" :auto-upload="false" :limit="1" :on-change="uploadMiniatura"></el-upload>
      </el-form-item>
      <el-image v-if="hasImage" style="margin:0 0 10px 190px; width: 180px; height: 180px" :src="post.miniatura" :fit="'cover'"></el-image>
      <editor ref="editor" v-model="post.conteudo" api-key="0f97olkaavor0s31mig8vuwnt15lsznfdq6961xh84qo4vm6" :init="editorInit" />
    </el-form>
    <el-button style="float: right; margin: 10px" type="primary" @click="save">
      Salvar
    </el-button>
  </el-card>
  <el-dialog v-model="dialogVisible">
    <img width="100%" height="100%" :src="dialogImageUrl" alt="" />
  </el-dialog>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import { upload, incluir, alterar, bucarPorId } from "../controller/ctlPosts";
export default {
  name: "Posts",
  components: {
    editor: Editor,
  },
  data() {
    return {
      editorInit: {
        height: 500,
        language: "pt_BR",
        plugins:
          "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link template table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
        toolbar_sticky: true,
        autosave_ask_before_unload: true,
        autosave_interval: "30s",
        autosave_prefix: "{path}{query}-{id}-",
        importcss_append: true,
        autosave_restore_when_empty: false,
        file_picker_types: "image",
        automatic_uploads: false,
        image_advtab: true,
        file_picker_callback: this.inputFile,
      },
      tempFile: null,
      dialogVisible: false,
      dialogImageUrl: "",
      hasImage: false,
      id:null,
      post: {
        conteudo: "",
        titulo: "",
        data: new Date(),
        miniatura: "",
      },
      shortcuts: [
        {
          text: "Hoje",
          value: new Date(),
        },
        {
          text: "Amanha",
          value: () => {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24);
            return date;
          },
        },
        {
          text: "Semana que vem",
          value: () => {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
            return date;
          },
        },
      ],
    };
  },
  methods: {
    async save() {
      if (this.id != null) {
        alterar(this.id,this.post);
      } else {
        const { url, id } = await upload(this.tempFile);
        this.post.miniatura = url;
        incluir(this.post);
      }
    },
    inputFile(cb, value, meta) {
      var input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      const editor = this.$refs.editor;
      input.onchange = function () {
        var file = this.files[0];

        var reader = new FileReader();
        reader.onload = async () => {
          const { url } = await upload(file);
          cb(url, { title: file.name, text: file.name });
        };
        reader.readAsDataURL(file);
      };

      input.click();
    },
    async uploadMiniatura(file) {
      this.tempFile = file.raw;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async find() {
      let id = this.$route.params.id;
      if (id) {
        let dados = await bucarPorId(id);
        this.hasImage = dados.miniatura != null;
        this.post = { ...dados, id };
        this.post.data = this.post.data.toDate();
        this.id = id;
        // this.getImage(this.post.miniatura);
      }
    },
    // getImage(ulr) {
    //   var canvas = document.createElement("canvas");
    //   var context = canvas.getContext("2d");
    //   var img = document.createElement("img");
    //   img.src = ulr;
    //   canvas.height = img.naturalHeight;
    //   canvas.width = img.naturalWidth;
    //   context.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
    //   var base64String = canvas.toDataURL();
    //   return base64String;
    // },
  },
  created() {
    this.find();
  },
};
</script>

<style scoped>
.left {
  text-align: left;
}
</style>
<style>
.el-dialog__body img {
  width: 100%;
  height: 100%;
}
</style>