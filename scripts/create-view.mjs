import { mkdir, readFile, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const currentDirname = dirname(fileURLToPath(import.meta.url));

const toolsDir = join(currentDirname, '..', 'src', 'views');
// eslint-disable-next-line no-undef
const toolName = process.argv[2];

if (!toolName) {
  throw new Error('Please specify a toolname.');
}

const toolNameCamelCase = toolName.replace(/-./g, (x) => x[1].toUpperCase());
const toolNameTitleCase = toolName[0].toUpperCase() + toolName.slice(1).replace(/-/g, ' ');
const toolDir = join(toolsDir, toolName);

await mkdir(toolDir);
console.log(`Directory created: ${toolDir}`);

const createToolFile = async (name, content) => {
  const filePath = join(toolDir, name);
  await writeFile(filePath, content.trim());
  console.log(`File created: ${filePath}`);
};

createToolFile(
  `${toolName}.vue`,
  `
<template>
  <div class="content">
    Plane Shader
    <div ref="canvasRef" class="canvas-center" />
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

export default defineComponent({
  setup() {
    let controls: OrbitControls | null = null
    const globalContext = useGlobalContext() as Ref<GlobalContext>
    const router = useRouter()
    const back = () => {
      // warning： Go to the node that has the permission
      router.push({ name: '${toolName}' })
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


`,
);

createToolFile(
  `index.ts`,
  `
import { ArrowsShuffle } from '@vicons/tabler'
import { defineTool } from '../tool'

export const tool = defineTool({
  name: '${toolNameTitleCase}',
  path: '/${toolName}',
  description: '',
  keywords: ['${toolName.split('-').join("', '")}'],
  component: () => import('./${toolName}.vue'),
  icon: ArrowsShuffle,
  createdAt: new Date('${new Date().toISOString().split('T')[0]}'),
})

`,
);

// createToolFile(`${toolName}.service.ts`, ``);
// createToolFile(
//   `${toolName}.service.test.ts`,
//   `
// import { expect, describe, it } from 'vitest';
// // import { } from './${toolName}.service';
// //
// // describe('${toolName}', () => {
// //
// // })
// `,
// );



const toolsIndex = join(toolsDir, 'index.ts');
const indexContent = await readFile(toolsIndex, { encoding: 'utf-8' }).then((r) => r.split('\n'));

indexContent.splice(3, 0, `import { tool as ${toolNameCamelCase} } from './${toolName}'`);
writeFile(toolsIndex, indexContent.join('\n'));
console.log(`Added import in: ${toolsIndex}`);
