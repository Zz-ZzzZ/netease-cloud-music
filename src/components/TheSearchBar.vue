<template>
  <div class="search-bar">
    <van-search
      v-model.trim="value"
      :placeholder="defaultKeyword"
      clearable
      autofocus
      input-align="center"
      left-icon=""
      @input="searchInput"
      @search="searchConfirm"
      @clear="searchClear"
    />
    <transition name="suggest">
      <div
        class="search-suggest"
        v-show="showSuggest && suggestList.length > 0"
      >
        <div
          class="suggest-container"
          v-for="(item, index) in suggestList"
          :key="index"
          @touchstart="$emit('setKeyword', item.keyword)"
        >
          <van-icon name="search" size="0.35rem" color="#9295a1" />
          <div class="container-keyword">{{ item.keyword }}</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["searchValue", "defaultKeyword", "suggestList"],
  name: "TheSearchBar",
  data() {
    return {
      value: this.searchValue,
      showSuggest: false
    };
  },
  watch: {
    searchValue() {
      this.searchValue ? (this.showSuggest = true) : (this.showSuggest = false);
      this.value = this.searchValue;
    }
  },
  methods: {
    searchInput(keyword) {
      this.$emit("searchInput", keyword);
    },
    searchConfirm(keyword) {
      this.$emit("searchConfirm", keyword);
    },
    searchClear(keyword) {
      this.$emit("searchClear", keyword);
    }
  }
};
</script>

<style scoped lang="scss">
.search-bar {
  width: 100%;
  height: 54px;
  position: relative;

  .search-suggest {
    width: 90%;
    background: #ffffff;
    margin: 0 auto;
    box-shadow: $shadow;
    position: relative;
    z-index: 10;

    .suggest-container {
      height: 0.9rem;
      border-bottom: 0.5px solid $border;
      padding: 0 0.2rem;
      @include flex-box(row, flex-start, center);

      .container-keyword {
        flex: 1;
        margin-left: 0.2rem;
        font-size: 0.27rem;
        color: $content;
        @include text-one-ellipsis;
      }
    }
  }
}

/deep/.van-search__content {
  box-shadow: $shadow;
}
.suggest-enter,
.suggest-leave-to {
  opacity: 0;
}
.suggest-enter-active,
.suggest-leave-active {
  transition: opacity 0.5s;
}
.suggest-enter-to,
.suggest-leave {
  opacity: 1;
}
</style>
