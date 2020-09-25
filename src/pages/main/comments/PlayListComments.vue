<template>
  <CommentsCard
    :comments="commentsArray"
    :total="commentsObj.total"
    @pullingUp="pullingUp"
  />
</template>

<script>
import CommentsCard from "@/pages/discover-page/child/comments/CommentsCard";
import { getPlayListCommentsById } from "@/api/song";
export default {
  name: "PlayListComments",
  data() {
    return {
      commentsObj: {},
      commentsArray: [],
      offset: 1
    };
  },
  methods: {
    async pullingUp() {
      this.offset += 1;
      const { comments } = await getPlayListCommentsById(
        this.$route.params.id,
        30,
        this.offset
      );
      if (comments.length > 0) {
        this.commentsArray.push(...comments);
      }
    },
    async initListComments() {
      this.commentsObj = await getPlayListCommentsById(this.$route.params.id);
      let hotArray = this.commentsObj.hotComments;
      hotArray.forEach(item => {
        item["isHot"] = true;
      });
      this.commentsArray = this.commentsArray.concat(
        hotArray,
        this.commentsObj.comments
      );
    }
  },
  components: { CommentsCard },
  created() {
    this.initListComments();
  }
};
</script>

<style scoped></style>
