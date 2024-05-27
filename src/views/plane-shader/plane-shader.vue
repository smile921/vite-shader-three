<template>
  <div class="content">
    Plane Shader
    <div ref="canvasRef" class="canvas-center" />
  </div>
</template>

<script lang="ts">
import { WebGLRenderer, PerspectiveCamera, Scene, Color } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { defineComponent, onBeforeUnmount, onMounted, Ref, ref, watch } from 'vue'
import { useRouter } from 'vue-router' 
import useInitialize  from '../../hooks/useInitialize'
import { useGlobalContext, useGlobalProvide } from '../../hooks/useGlobalContext'
import type { GlobalContext } from '../../hooks/useGlobalContext'

export default defineComponent({
  setup() {
    let controls: OrbitControls | null = null
    const globalContext = useGlobalContext() as Ref<GlobalContext>
    const router = useRouter()
    const back = () => {
      // warning： Go to the node that has the permission
      router.push({ name: 'plane-shader' })
    }
    const canvasRef = ref<HTMLDivElement | null>(null)
    let gl: WebGLRenderingContext | null = null
    const initWebGL = () => {
      if (canvasRef.value) { 
        console.log('onMounted begin init WebGL')
      }
    }
    onMounted(() => {
      initWebGL()
    })
    const cleanUpWebGL = () => {
      if (gl) {
        console.log('onBeforeUnmounted begin destroy WebGL')
        gl = null
      }
    }
    onBeforeUnmount(() => {
      cleanUpWebGL()
    })  
    const initializeHandle = (
      scene: Scene,
      camera: PerspectiveCamera,
      renderer: WebGLRenderer
    ) => {
      renderer.setClearColor('#e6fcf5', 1)
      scene.background = new Color("#ddd")
      camera.position.set(0, 2, 4)
      controls = new OrbitControls(camera, renderer.domElement)
    }

    const renderHandle = () => {
      // @ts-nocheck 
      controls?.update()
    }
    const { sceneRef, resize } = useInitialize(canvasRef, initializeHandle, null, renderHandle)

    watch(
      () => globalContext?.value.menuWidth,
      () => {
        resize()
      }
    )

    return {
      back,
    }
  },
})
</script>

<style scoped lang="less">
.content {
  padding-top: 10px; 
  text-align: center;
  margin: auto;
  .canvas-center {
    width: 80%;
    min-width: 900px;
    height: 80vh;
    min-height: 800px;
    margin: auto;
    border: dashed 0.1px skyblue;
  }
}
</style>
