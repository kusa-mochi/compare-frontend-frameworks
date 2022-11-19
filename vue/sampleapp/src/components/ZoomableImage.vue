<template>
  <div class="zoomable-image">
    <img
      :src="src"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchCancel"
      class="content-image"
      :style="{ width: imageWidth + 'px', height: imageHeight + 'px' }"
    />
    <div class="debug-label">
      {{ ratio }}, {{ imageWidth }}, {{ imageHeight }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Position {
  x: number;
  y: number;
}

export default defineComponent({
  data() {
    return {
      imageWidthBeforePinch: 0,
      imageHeightBeforePinch: 0,
      imageWidth: 640,
      imageHeight: 427,
      ratio: 1,
      touchStartPositionX: 0,
      touchStartPositionY: 0,
      isTouching: false,
      initLengthBetweenTouches: 0,
    };
  },
  methods: {
    calcLengthBetweenTwoPoints(p1: Position, p2: Position): number {
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      return d;
    },
    calcLengthBetweenTouches(touches: TouchList): number {
      const p1: Position = {
        x: touches[0].pageX,
        y: touches[0].pageY,
      };
      const p2: Position = {
        x: touches[1].pageX,
        y: touches[1].pageY,
      };
      const length = this.calcLengthBetweenTwoPoints(p1, p2);
      return length;
    },
    onTouchStart(e: TouchEvent) {
      e.preventDefault();
      const numTouchPoints: number = e.touches.length;
      if (numTouchPoints > 1) {
        // calc the length between touch points.
        this.initLengthBetweenTouches = this.calcLengthBetweenTouches(
          e.touches
        );
        this.imageWidthBeforePinch = this.imageWidth;
        this.imageHeightBeforePinch = this.imageHeight;
      } else if (numTouchPoints === 1) {
        this.isTouching = true;
      }
    },
    onTouchMove(e: TouchEvent) {
      e.preventDefault();
      const numTouchPoints: number = e.touches.length;
      if (numTouchPoints > 1) {
        // calc the length between touch points.
        const currentLengthBetweenTouches = this.calcLengthBetweenTouches(
          e.touches
        );
        this.ratio =
          currentLengthBetweenTouches / this.initLengthBetweenTouches;
        this.imageWidth = this.ratio * this.imageWidthBeforePinch;
        this.imageHeight = this.ratio * this.imageHeightBeforePinch;
      } else if (this.isTouching === true) {
        // do nothing.
      }
    },
    onTouchEnd(e: TouchEvent) {
      this.isTouching = false;
      this.initLengthBetweenTouches = 0;
      this.imageWidthBeforePinch = 0;
    },
    onTouchCancel(e: TouchEvent) {
      this.isTouching = false;
      this.initLengthBetweenTouches = 0;
      this.imageHeightBeforePinch = 0;
    },
  },
  name: "ZoomableImage",
  props: {
    src: {
      type: String,
      required: true,
      default: "",
    },
  },
});
</script>

<style lang="scss">
.zoomable-image {
  position: relative;

  .content-image {
    position: absolute;
    top: 0;
    left: 0;
  }

  .debug-label {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
