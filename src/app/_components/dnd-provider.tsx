'use client'

import { DndContext, KeyboardSensor, PointerSensor, rectIntersection, useSensor, useSensors } from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useStore } from '../_stores'
import SortableProvider from './sortable-provider'

type ProviderProps = {
  children: React.ReactNode
}

export default function DndProvider({ children }: ProviderProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const { addSectionAtIndex, swapSections } = useStore((store) => ({
    addSectionAtIndex: store.addSectionAtIndex,
    swapSections: store.swapSections,
  }))

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragEnd={({ active, over }) => {
        if (
          active.id.toString().startsWith('draggable-preview:') &&
          over?.id.toString().startsWith('section-droppable:')
        ) {
          const sectionId = active.id.toString().replace('draggable-preview:', '')
          const droppableIndex = Number.parseInt(over.id.toString().replace('section-droppable:', ''))
          addSectionAtIndex(sectionId, droppableIndex)
        }

        if (active.id.toString().startsWith('page-section:') && over?.id.toString().startsWith('page-section:')) {
          const fromId = Number.parseInt(active.id.toString().split(':')[2])
          const toId = Number.parseInt(over.id.toString().split(':')[2])
          swapSections(fromId, toId)
        }
      }}
    >
      <SortableProvider>{children}</SortableProvider>
    </DndContext>
  )
}
