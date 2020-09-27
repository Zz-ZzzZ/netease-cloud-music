<template>
  <div class="content-card">
    <div class="card-top">
      <h2>
        <slot name="top-left"></slot>
      </h2>
      <div class="top-more">
        <slot name="top-right"></slot>
      </div>
    </div>

    <div class="card-bottom">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheLayoutCardContainer"
};
</script>

<style scoped lang="scss">
.content-card {
  width: 100%;
  margin: 0.3rem 0;
  font-size: 0.22rem;

  .card-top {
    width: 100%;
    @include flex-box(row, space-between, center);

    .top-title {
      font-size: 0.32rem;
      font-weight: 700;
      color: $title;
    }
  }

  .card-bottom {
    width: 100%;
    margin-top: 0.2rem;
  }
}
</style>
