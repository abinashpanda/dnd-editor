'use client'

import { DndContext, closestCenter, rectIntersection } from '@dnd-kit/core'
import { useStore } from '../_stores'

type DndProviderProps = {
  children: React.ReactNode
}

export default function DndProvider({ children }: DndProviderProps) {
  const addSectionAtIndex = useStore((store) => store.addSectionAtIndex)

  return (
    <DndContext
      collisionDetection={rectIntersection}
      onDragStart={(event) => {
        console.dir(event)
      }}
      onDragEnd={({ active, over }) => {
        if (
          active.id.toString().startsWith('draggable-preview:') &&
          over?.id.toString().startsWith('section-droppable:')
        ) {
          const sectionId = active.id.toString().replace('draggable-preview:', '')
          const droppableIndex = Number.parseInt(over.id.toString().replace('section-droppable:', ''))
          addSectionAtIndex(sectionId, droppableIndex)
        }
      }}
    >
      {children}
    </DndContext>
  )
}
