<template>
  <div>
    <TheSearchBar
      :default-keyword="defaultKeyword"
      :suggest-list="suggestList"
      :search-value="searchValue"
      @searchInput="searchInput"
      @searchConfirm="searchConfirm"
      @setKeyword="setKeyword"
    />
    <div class="search-hot-container">
      <div class="container-history" v-if="showHistory">
        <div class="history-delete">
          <h3>搜索历史</h3>
          <div @touchstart="clearKeyword">
            <BaseIcon icon="delete" />
          </div>
        </div>
        <div class="history-label">
          <p
            v-for="(item, index) in historyKeywordsList"
            :key="index"
            @click="setKeyword(item)"
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
  getSearchDefaultKeyword,
  getHotSearch,
  getSearchSuggestByKeyword
} from "@/api/search";
import TheSearchBar from "@/components/TheSearchBar";
import { throttle, trim } from "@/utils/utils";

export default {
  name: "SearchHot",
  components: { TheSearchBar },
  data() {
    return {
      hotList: [],
      historyKeywordsList: [],
      defaultKeyword: "",
      suggestList: [],
      searchValue: "",
      showHistory: false
    };
  },
  methods: {
    clearKeyword() {
      this.$dialog
        .confirm({
          message: "确定清除历史搜索记录?",
          confirmButtonColor: "#ff4757"
        })
        .then(() => {
          this.historyKeywordsList = [];
          localStorage.removeItem("keyword");
        });
    },
    searchInput(keyword) {
      this.searchValue = keyword;
      throttle(async function() {
        let str = trim(keyword);
        if (str) {
          const {
            result: { allMatch }
          } = await getSearchSuggestByKeyword(str);
          this.suggestList = allMatch;
        }
      }, 500).call(this);
    },
    searchConfirm(keyword) {
      if (trim(keyword)) {
        this.setKeyword(keyword);
      }
    },
    setKeyword(keyword) {
      this.addLocalStorage(keyword);
      this.navToResult(keyword);
    },
    navToResult(keyword) {
      this.$router.push({ path: `/search/result/${keyword}` });
    },
    addLocalStorage(keyword) {
      let keywordArr = JSON.parse(localStorage.getItem("keyword"));
      if (keywordArr) {
        // 检查关键词是否已存在历史中，若存在则先移除此关键词
        const haveKeywordIndex = keywordArr.indexOf(keyword);
        if (haveKeywordIndex > -1) {
          keywordArr.splice(haveKeywordIndex, 1);
        }
        keywordArr.unshift(keyword);
        localStorage.setItem("keyword", JSON.stringify(keywordArr));
      } else {
        localStorage.setItem("keyword", JSON.stringify([keyword]));
      }
    }
  },
  watch: {
    historyKeywordsList(list) {
      this.showHistory = list.length > 0;
    }
  },
  async created() {
    const {
      data: { showKeyword }
    } = await getSearchDefaultKeyword();
    this.defaultKeyword = showKeyword;
    const { data } = await getHotSearch();
    this.hotList = data;
    let historyKeywords = JSON.parse(localStorage.getItem("keyword"));
    if (historyKeywords) this.historyKeywordsList = historyKeywords;
  }
};
</script>

<style scoped lang="scss">
.search-hot-container {
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
          //line-height: 0.35rem;
          //line-height: 0.29rem;
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
          color: $content;
        }
      }
    }
  }
}
</style>
