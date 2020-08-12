<template>
  <ThePlayListDetailCard
    :play-list-detail="playListDetail"
    class="play-list-detail"
  />
</template>

<script>
import ThePlayListDetailCard from "@/components/ThePlayListDetailCard";
import { getPlayListDetailById } from "@/api/song";
export default {
  name: "PlayListDetailInfo",
  data() {
    return {
      playListDetail: {}
    };
  },
  components: { ThePlayListDetailCard },
  async mounted() {
    let id = this.$route.query.id;
    let result = await getPlayListDetailById(id);
    if (result.status === 200) {
      this.playListDetail = result.data.playlist;
      this.a = true;
    }
    console.log(result);
  }
};
</script>

<style scoped lang="scss"></style>
