<template>
  <div class="bass-talk">
    <img :src="imgUrl" />
    <div class="talk-main">
      <div class="title"># {{ title }}</div>
      <div class="count">
        <span>{{ follow }}人关注</span>
        <span class="divider"> | </span>
        <span>{{ join }}参与</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["imgUrl", "title", "follow", "join"],
  name: "BaseTalk"
};
</script>

<style scoped lang="scss">
.bass-talk {
  margin-bottom: 0.2rem;
  @include flex-box(row, flex-start, center);

  img {
    width: 1.5rem;
    height: 1.5rem;
    object-fit: cover;
    border-radius: $default-radius;
    margin-right: 0.2rem;
  }

  .talk-main {
    .title {
      font-size: 0.3rem;
    }
    .count {
      color: $content;
      margin-top: 0.15rem;
      @include flex-box(row, flex-start, center);
    }
    .divider {
      color: $divider;
      margin-left: 0.1rem;
      margin-right: 0.1rem;
    }
  }
}
</style>
