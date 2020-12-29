<template>
  <span>{{ tweenValue }}</span>
</template>

<script>
// const TWEEN = require("./Tween.js");
import TWEEN from './Tween.js'
export default {
  name: 'animate_integer',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      tweenValue: 0
    }
  },
  watch: {
    value: function (newValue, oldValue) {
      this.tween(oldValue, newValue)
    }
  },
  computed: {},
  methods: {
    tween: function (startValue, endValue) {
      var vm = this
      function animate () {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }
      new TWEEN.Tween({ tweeningValue: startValue })
        .to({ tweeningValue: endValue }, 500)
        .onUpdate(function () {
          vm.tweenValue = this._object.tweeningValue.toFixed(0)
        })
        .start()

      animate()
    }
  },
  created () {},
  mounted () {
    this.tween(0, this.value)
  }
}
</script>
