<script>
export default {
  functional: true,
  props: {
    nodes: { required: true },
  },
  render (createElement, context) {
    return context.props.nodes
  },
}
</script>

<style lang="stylus" scoped>

</style>
