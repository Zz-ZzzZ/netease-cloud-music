<script>
export default {
  props: ["text", "highText"],
  name: "BaseHighLight",
  methods: {
    getHighText() {
      // 检查文本空值
      if (!this.text) {
        return <span>{this.text}</span>;
      }
      // 将文本与高亮关键词一律转为小写
      const text = this.text;
      const highText = this.highText;

      // 查找高亮关键词在文本中的下标
      const highTextIndexOf = text.indexOf(highText);

      // 大于-1则代表找到了
      if (highTextIndexOf > -1) {
        // 截取距关键词的前部分
        const textFormatBefore = text.substr(0, highTextIndexOf);
        // 截取关键词
        const textFormatCenter = text.substr(highTextIndexOf, highText.length);
        // 截取距关键词的后部分
        // 截取后部分开始下标由查找高亮关键词在文本中的下标 + 截取关键词的长度
        const textFormatAfter = text.substr(
          highTextIndexOf + textFormatCenter.length,
          text.length
        );

        return (
          <span>
            {textFormatBefore}
            <span class="is-highText">{textFormatCenter}</span>
            {textFormatAfter}
          </span>
        );
      } else {
        return <span>{this.text}</span>;
      }
    }
  },
  render() {
    return this.getHighText();
  }
};
</script>

<style scoped lang="scss">
.is-highText {
  color: #517eaf;
}
</style>
