import { ArrowsShuffle } from '@vicons/tabler'
import { defineTool } from '../tool'

export const tool = defineTool({
  name: 'Circle shader',
  path: '/circle-shader',
  description: '',
  keywords: ['circle', 'shader'],
  component: () => import('./circle-shader.vue'),
  icon: ArrowsShuffle,
  createdAt: new Date('2024-05-24'),
})
