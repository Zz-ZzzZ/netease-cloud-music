<template>
  <TheCommentsCard
    :comments="commentsArray"
    :total="commentsObj.total"
    @pullingUp="pullingUp"
  />
</template>

<script>
import TheCommentsCard from "@/components/TheCommentsCard";
import { getSongCommentsById } from "@/api/song";
export default {
  name: "SongComments",
  data() {
    return {
      commentsObj: {},
      commentsArray: [],
      offset: 0
    };
  },
  methods: {
    async pullingUp() {
      this.offset += 30;
      const { comments } = await getSongCommentsById(
        this.$route.params.id,
        30,
        this.offset
      );
      if (comments.length > 0) {
        this.commentsArray.push(...comments);
      }
    },
    async initListComments() {
      this.commentsObj = await getSongCommentsById(this.$route.params.id);
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
  components: { TheCommentsCard },
  created() {
    this.initListComments();
  }
};
</script>

<style scoped></style>
