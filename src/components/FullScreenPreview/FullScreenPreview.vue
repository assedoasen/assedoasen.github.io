<template>
  <!-- FullScreenPreview / Full Screen Preview -->
  <transition name="slide-fade-fullscreen">
    <div class="fullscreen-container fullscreen-preview">
      <button type="button" @click="close" class="btn-close d-flex align-items-center justify-content-center bg-primary">
        <i class="fa fa-times text-white" style="font-size: 200%;" aria-hidden="true"></i>
      </button>
      <div class="image-container-fullscreen">
        <img :src="$store.state.fullScreenPreview" alt="Image">
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  methods: {
    close() {
      this.$store.dispatch("setFullScreenPreview", null)
    }
  },
  mounted() {
    this.$helpers.handleBodyOverflow(true, false)
  },
  beforeDestroy() {
    this.$helpers.handleBodyOverflow(false, false)
  }
}
</script>

<style lang="scss">
  .fullscreen-preview {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 1082;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(150deg, rgb(50, 50, 50) 0%, rgb(140, 140, 140) 100%);

    .image-container-fullscreen {
      img {
        object-fit: contain;
        max-width: 100vw;
        max-height: 100vh;
      }
    }

    .btn-close {
      z-index: 999;
      position: absolute;
      right: 52px;
      top: 52px;
      width: 66px;
      height: 66px;
      opacity: 1;
      border: none;
      border-radius: 50%;
      will-change: transform;
      transition: transform 1s ease;
      outline: none;
      &:hover {
        transform: rotate(180deg);
      }
    }
  }
</style>
