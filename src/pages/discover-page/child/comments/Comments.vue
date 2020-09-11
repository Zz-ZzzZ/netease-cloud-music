<template>
  <TheCommentsCard :comments="comments" />
</template>

<script>
import TheCommentsCard from "@/components/TheCommentsCard";
import { getPlayListCommentsById } from "@/api/song";
export default {
  name: "Comments",
  data() {
    return {
      comments: {}
    };
  },
  components: { TheCommentsCard },
  async created() {
    const id = this.$route.params.id;
    this.comments = await getPlayListCommentsById(id);
  }
};
</script>

<style scoped></style>
