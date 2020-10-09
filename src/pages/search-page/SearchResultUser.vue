<template>
  <div v-if="searchResult">
    <BaseUser
      v-for="item in searchResult.userprofiles"
      :key="item.id"
      :img-url="item.avatarUrl"
      :name="item.nickname"
      :followed="item.followed"
      :description="item.description"
    />
  </div>
</template>

<script>
import SEARCH_MIXIN from "@/utils/search-result-mixin";
import BaseUser from "@/components/BaseUser";

export default {
  name: "SearchResultUser",
  components: { BaseUser },
  mixins: [SEARCH_MIXIN],
  created() {
    this.getSearchResult(1002);
  }
};
</script>

<style scoped lang="scss">
/deep/.base-user {
  height: 1.2rem !important;
  img {
    width: 1.2rem !important;
  }
}
</style>
