import { RouteRecordRaw } from 'vue-router'
// import IndexLayout from '../layout/page-layout.vue'
import { tool as circleShader } from './circle-shader'
import { tool as circleShader } from './circle-shader'
import { tool as planeShader } from './plane-shader'
import { tool as planeShader } from './plane-shader'
// import { ToolCategory } from './tools.types'
import { tool as homePage } from './home-page'

export const toolRoutes: RouteRecordRaw[] = [
      //
      homePage,
      circleShader,
      planeShader,
    ]
