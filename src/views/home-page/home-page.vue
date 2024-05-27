<template>
  <div class="content" ref="contentRef">
    home page
    <div class="grid">
      <ACard @click="goToCircle">
        <span>circle</span>
      </ACard>
      <ACard @click="goToPlane">
        <span>plane</span>
      </ACard>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const contentRef = ref<HTMLDivElement | null>(null)
    const back = () => {
      // warning： Go to the node that has the permission
      router.push({ name: 'home' })
    }
    const goToCircle = () => {
      router.push({ path: '/circle-shader' })
    }

    const goToPlane = () => {
      router.push({ path: '/plane-shader' })
    }
    onMounted(()=>{
      if(contentRef.value){
        console.log(contentRef.value)
      }
    })

    return {
      back,
      goToCircle,
      goToPlane,
      contentRef,
    }
  },
})
</script>

<style scoped lang="less">
.content {
  // padding-top: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -95px;
  margin-top: -121px;
  text-align: center;
}
</style>
