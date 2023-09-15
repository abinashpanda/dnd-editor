'use client'

import { DragOverlay, DropAnimation, defaultDropAnimationSideEffects, useDndContext } from '@dnd-kit/core'
import { useStore } from '../_stores'
import { useMemo } from 'react'
import SectionPreview from './section-preview'
import {} from '@dnd-kit/sortable'

const dropAnimation: DropAnimation = {
  duration: 100,
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.4',
      },
    },
  }),
}

export default function PageSectionSortableOverlay() {
  const sections = useStore((store) => store.sections)
  const { active } = useDndContext()

  const section = useMemo(() => {
    if (active && active.id.toString().startsWith('page-section:')) {
      const sectionId = active.id.toString().split(':')[1]
      return sections[sectionId]
    }
  }, [active, sections])

  if (section) {
    return (
      <DragOverlay dropAnimation={dropAnimation}>
        <div className="w-[60vw] shadow-xl">{section.section}</div>
      </DragOverlay>
    )
  }

  return null
}
