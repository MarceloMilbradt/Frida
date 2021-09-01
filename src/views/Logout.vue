<script>
export default {
  name: "Logout",
  mounted() {
    this.$store.dispatch("logout");
  },
};
</script>
