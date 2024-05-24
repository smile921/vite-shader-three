import { ArrowsShuffle } from '@vicons/tabler'
import { defineTool } from '../tool'

export const tool = defineTool({
  name: 'Home page',
  path: '/home-page',
  description: '',
  keywords: ['home', 'page'],
  component: () => import('./home-page.vue'),
  icon: ArrowsShuffle,
  createdAt: new Date('2024-05-24'),
})
