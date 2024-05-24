 
import { defineTool } from '../tool'
import { AlignJustified } from '@vicons/tabler'

export const tool = defineTool({
  name: 'not-found',
  path: '/not-found',
  description: 'not found',
  keywords: ['not', 'found'],
  component: () => import('./not-found.vue'),
  icon: AlignJustified,
  createdAt: new Date('2024-01-31'),
})

