<template>
  <div v-if="false"></div>
</template>

<script>
import { createWidgetMixin } from "vue-instantsearch/vue3/es";

const connectRefresh =
  (renderFn, unmountFn) =>
  (widgetParams = {}) => ({
    init() {
      renderFn({ refresh: {} }, true);
    },

    render({ instantSearchInstance }) {
      const refresh = instantSearchInstance.refresh.bind(instantSearchInstance);
      renderFn({ refresh }, false);
    },

    dispose() {
      unmountFn();
    },
  });

export default {
  props: {
    delay: {
      type: Number,
      default: 2500, // (1 seconds)
    },
  },
  name: "StateRefresher",
  mixins: [createWidgetMixin({ connector: connectRefresh })],
  created() {
    this.timerId = setTimeout(() => {
      console.log("Refresh")
      this.state.refresh();
    }, this.delay);
  },
};
</script>