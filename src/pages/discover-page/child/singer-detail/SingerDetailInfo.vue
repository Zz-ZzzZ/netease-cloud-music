<template>
  <TheSingerDetailCard :singer-detail="singerDetail" />
</template>

<script>
import TheSingerDetailCard from "@/components/TheSingerDetailCard";
import { getSingerDescById } from "@/api/singer";
import { getUserInfoById } from "@/api/user";
export default {
  name: "SingerDetailInfo",
  data() {
    return {
      singerDetail: {}
    };
  },
  components: { TheSingerDetailCard },
  async created() {
    let id = this.$route.query.id;
    let singerResult = await getSingerDescById(id);
    console.log("完成1");
    if (singerResult.status === 200) {
      this.singerDetail = singerResult.data;
      let userResult = await getUserInfoById(
        singerResult.data.artist.accountId
      );
      if (userResult.status === 200)
        this.singerDetail.profile = userResult.data.profile;
      console.log("完成2");
    }
  }
};
</script>

<style scoped></style>
