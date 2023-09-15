'use client'

import { DragOverlay, DropAnimation, defaultDropAnimationSideEffects, useDndContext } from '@dnd-kit/core'
import { useStore } from '../_stores'
import { useMemo } from 'react'
import SectionPreview from './section-preview'

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

export default function SectionPreviewOverlay() {
  const sections = useStore((store) => store.sections)
  const { active } = useDndContext()

  const section = useMemo(() => {
    if (active && active.id.toString().startsWith('draggable-preview:')) {
      const sectionId = active.id.toString().replace('draggable-preview:', '')
      return sections[sectionId]
    }
  }, [active, sections])

  if (section) {
    return (
      <DragOverlay dropAnimation={dropAnimation}>
        <SectionPreview section={section} />
      </DragOverlay>
    )
  }

  return null
}
