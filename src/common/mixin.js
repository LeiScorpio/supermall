import BackTop from 'components/content/backTop/BackTop'
export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.detailscroll.scrollTo(0, 0, 300)
    },
  },
  components: {
    BackTop
  }
}
