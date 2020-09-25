<template>
  <div class="search-index">
    <div class="search-index-bar">
      <van-search
        v-model.trim="value"
        shape="round"
        background="#ff4757"
        :placeholder="defaultKeyword"
        clearable
        autofocus
        input-align="center"
        left-icon=""
        @input="searchInput"
        @search="searchConfirm"
      />
      <transition name="suggest">
        <div class="search-suggest" v-show="showSuggest">
          <div
            class="suggest-container"
            v-for="(item, index) in suggestList"
            :key="index"
            @touchstart="setKeyWord(item.keyword)"
          >
            <van-icon name="search" size="0.35rem" color="#9295a1" />
            <div class="container-keyword">{{ item.keyword }}</div>
          </div>
        </div>
      </transition>
    </div>
    <div class="search-index-container">
      <div class="container-history" v-if="historyKeywordsList.length > 0">
        <div class="history-delete">
          <h3>搜索历史</h3>
          <div @touchstart="clearHistoryKeyword">
            <BaseIcon icon="delete" />
          </div>
        </div>
        <div class="history-label">
          <p
            v-for="(item, index) in historyKeywordsList"
            :key="index"
            @click="$router.push({ path: `search-result/${item}` })"
          >
            {{ item }}
          </p>
        </div>
      </div>
      <div class="container-hot">
        <h3>热搜榜</h3>
        <div class="hot-flex" v-for="(item, index) in hotList" :key="index">
          <div class="hot-index" :class="index + 1 < 5 ? 'index-is-top4' : ''">
            {{ index + 1 }}
          </div>
          <div class="hot-keyword">
            <div class="keyword1">
              <div style="flex: 1">
                <span :class="index < 3 ? 'hot-keyword-is-top3' : ''">
                  {{ item.searchWord }}
                </span>
                <img
                  :src="item.iconUrl"
                  :style="{ width: item.iconType === 5 ? '0.2rem' : '' }"
                />
              </div>
              <p class="keyword-score">{{ item.score }}</p>
            </div>
            <p class="keyword2">{{ item.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getDefaultSearchKeyword,
  getHotSearch,
  getSuggestByKeyword
} from "@/api/search";
import { throttle, trim } from "@/utils/utils";

export default {
  name: "SearchIndex",
  data() {
    return {
      value: "",
      defaultKeyword: "",
      hotList: [],
      showSuggest: false,
      suggestList: [],
      historyKeywordsList: []
    };
  },
  watch: {
    value() {
      this.value ? (this.showSuggest = true) : (this.showSuggest = false);
    }
  },
  methods: {
    searchInput: throttle(async function() {
      let str = trim(this.value);
      if (str) {
        const {
          result: { allMatch }
        } = await getSuggestByKeyword(str);
        this.suggestList = allMatch;
      }
    }, 500),
    searchConfirm(keyword) {
      this.setKeyWord(keyword);
    },
    setKeyWord(keyword) {
      this.addHistoryKeyword(keyword);
      this.$router.push({ path: `/search-result/${keyword}` });
    },
    addHistoryKeyword(keyword) {
      let historyKeywords = JSON.parse(localStorage.getItem("historyKeywords"));
      if (historyKeywords) {
        historyKeywords.unshift(keyword);
        localStorage.setItem(
          "historyKeywords",
          JSON.stringify(historyKeywords)
        );
      } else {
        localStorage.setItem("historyKeywords", JSON.stringify([keyword]));
      }
    },
    clearHistoryKeyword() {
      this.$dialog
        .confirm({
          message: "确定清空全部历史记录?",
          confirmButtonColor: "#ff4757"
        })
        .then(() => {
          localStorage.removeItem("historyKeywords");
          this.$router.go(0);
        });
    }
  },
  async created() {
    const {
      data: { realkeyword }
    } = await getDefaultSearchKeyword();
    this.defaultKeyword = realkeyword;
    const { data } = await getHotSearch();
    this.hotList = data;
    let historyKeywords = JSON.parse(localStorage.getItem("historyKeywords"));
    if (historyKeywords) this.historyKeywordsList = historyKeywords;
  }
};
</script>

<style scoped lang="scss">
.search-index {
  width: 100%;
  height: 100%;
  color: $title;

  &-bar {
    width: 100%;
    height: 54px;
    position: relative;

    .search-suggest {
      width: 90%;
      height: 6rem;
      background: #ffffff;
      margin: 0 auto;
      box-shadow: 1px 1px 15px $content;

      .suggest-container {
        height: 1rem;
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

  &-container {
    width: $container-width;
    height: calc(100% - 54px);
    margin: 0 auto;
    overflow-y: scroll;

    .container-history {
      width: 100%;
      padding-top: 0.2rem;

      .history-delete {
        @include flex-box(row, space-between, center);
      }

      .history-label {
        margin-top: 0.3rem;
        overflow-x: auto;
        @include flex-box(row, flex-start, center);

        p {
          flex: none;
          font-size: 0.28rem;
          line-height: 0.28rem;
          background-color: #f3f3f3;
          margin-right: 0.2rem;
          padding: 0.12rem 0.22rem;
          border-radius: 20px;
        }
      }
    }

    .container-hot {
      width: 100%;
      margin-top: 0.4rem;

      .hot-flex {
        margin: 0.3rem 0;
        @include flex-box(row, flex-start, center);

        .hot-index {
          width: 0.5rem;
          font-size: 0.25rem;
          text-align: center;
          color: $content;
        }

        .index-is-top4 {
          color: $red;
        }

        .hot-keyword-is-top3 {
          font-weight: bold;
        }

        .hot-keyword {
          flex: 1;
          margin-left: 0.2rem;

          .keyword1 {
            height: 0.5rem;
            @include flex-box(row, flex-start, center);

            span {
              font-size: 0.29rem;
              margin-bottom: 0.05rem;
            }

            img {
              margin-left: 0.1rem;
              width: 0.5rem;
            }

            .keyword-score {
              color: $content;
            }
          }

          .keyword2 {
            height: 0.3rem;
            color: $content;
          }
        }
      }
    }
  }
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
