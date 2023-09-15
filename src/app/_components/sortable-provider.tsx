'use client'

import { useDndContext } from '@dnd-kit/core'
import { useStore } from '../_stores'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'

type ProviderProps = {
  children: React.ReactNode
}

export default function SortableProvider({ children }: ProviderProps) {
  const pageSectionsOrder = useStore((store) => store.pageSectionsOrder)

  const { active } = useDndContext()

  return (
    <SortableContext
      disabled={active?.id.toString().startsWith('draggable-preview:') ? true : false}
      strategy={rectSortingStrategy}
      items={pageSectionsOrder.map((sectionId, order) => `page-section:${sectionId}:${order}`)}
    >
      {children}
    </SortableContext>
  )
}
