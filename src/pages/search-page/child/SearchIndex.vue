<template>
  <div>
    <van-search
      v-model="value"
      shape="round"
      background="#ff4757"
      placeholder="请输入搜索关键词"
      clearable
    />
  </div>
</template>

<script>
export default {
  name: "SearchIndex",
  data() {
    return {
      value: ""
    };
  }
};
</script>

<style scoped></style>
