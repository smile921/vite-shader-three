import { ArrowsShuffle } from '@vicons/tabler'
import { defineTool } from '../tool'

export const tool = defineTool({
  name: 'Plane shader',
  path: '/plane-shader',
  description: '',
  keywords: ['plane', 'shader'],
  component: () => import('./plane-shader.vue'),
  icon: ArrowsShuffle,
  createdAt: new Date('2024-05-24'),
})
