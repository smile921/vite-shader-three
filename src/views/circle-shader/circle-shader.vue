<template>
  <div class="content">
    Circle shader
    <div ref="containerRef" class="canvas-center" />
  </div>
</template>

<script lang="ts">
import { WebGLRenderer, PerspectiveCamera, Scene } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { defineComponent, onBeforeUnmount, onMounted, Ref, ref, watch } from 'vue'
import { useRouter } from 'vue-router' 
import useInitialize  from '../../hooks/useInitialize'
import { useGlobalContext, useGlobalProvide } from '../../hooks/useGlobalContext'
import type { GlobalContext } from '../../hooks/useGlobalContext'
import { Color } from 'three'
import { GridHelper } from 'three'
import { Material } from 'three'
import GUI from 'lil-gui'
import { Vector3 } from 'three'

export default defineComponent({
  setup() {
    let controls: OrbitControls | null = null
    const globalContext = useGlobalContext() as Ref<GlobalContext>
    const router = useRouter()
    const back = () => {
      // warning： Go to the node that has the permission
      router.push({ name: 'circle-shader' })
    }
    const containerRef = ref<HTMLDivElement | null>(null)
    let gl: WebGLRenderingContext | null = null
    const initWebGL = () => {
      // debugger
      if (containerRef.value) { 
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
      camera.lookAt(new Vector3(0, 0, 0))
      scene.add(camera)
      controls = new OrbitControls(camera, renderer.domElement)

      // debugger
      // 添加网格地面
      const gridHelper = new GridHelper(15, 15);
      (gridHelper.material as Material).opacity = 0.2;
      (gridHelper.material as Material).transparent = true;
      scene.add(gridHelper);
      const gui = new GUI();
      scene.add(gui)
      
    }

    const renderHandle = () => {
      // @ts-nocheck 
      controls?.update()
    }
    // debugger
    const { sceneRef, resize } = useInitialize(containerRef, initializeHandle, null, renderHandle)

    watch(
      () => globalContext?.value.menuWidth,
      () => {
        resize()
      }
    )

    return {
      back,
      containerRef,
    }
  },
})
</script>

<style scoped lang="less">
.content {
  padding-top: 10px;
  // position: absolute;
  // top: 50%;
  // left: 50%;
  // margin-left: -95px;
  // margin-top: -121px;
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
