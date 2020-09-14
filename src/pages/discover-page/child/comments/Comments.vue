<template>
  <TheCommentsCard
    :comments="commentsObj.comments"
    :hot-comments="commentsObj.hotComments"
    :total="commentsObj.total"
    @pullingUp="pullingUp"
  />
</template>

<script>
import TheCommentsCard from "@/components/TheCommentsCard";
import { getPlayListCommentsById } from "@/api/song";
export default {
  name: "Comments",
  data() {
    return {
      commentsObj: {},
      offset: 0
    };
  },
  methods: {
    async pullingUp() {
      this.offset += 30;
      const { comments } = await getPlayListCommentsById(
        this.$route.params.id,
        30,
        this.offset
      );
      this.commentsObj.comments.push(...comments);
    },
    async initListComments() {
      this.commentsObj = await getPlayListCommentsById(this.$route.params.id);
    }
  },
  components: { TheCommentsCard },
  created() {
    this.initListComments();
  }
};
</script>

<style scoped></style>
