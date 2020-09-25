<template>
  <div>
    <van-search
      v-model.trim="value"
      shape="round"
      background="#ff4757"
      clearable
      input-align="center"
      left-icon=""
      @input="searchInput"
      @search="searchConfirm"
    />
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { getSearchResultByKeyword } from "@/api/search";

export default {
  name: "SearchResult",
  data() {
    return {
      value: "",
      searchResult: []
    };
  },
  methods: {
    searchInput() {},
    searchConfirm() {}
  },
  async created() {
    this.value = this.$route.params.keyword;
    const { result } = await getSearchResultByKeyword(
      this.$route.params.keyword,
      30,
      1,
      1018
    );
    this.searchResult = result;
  }
};
</script>

<style scoped lang="scss"></style>
