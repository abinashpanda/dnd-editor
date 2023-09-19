'use client'

import { useFloating, autoUpdate, offset, autoPlacement } from '@floating-ui/react'
import { CSS } from '@dnd-kit/utilities'
import { Section } from '../_utils/sections'
import { GripIcon, Trash2Icon } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { useStore } from '../_stores'
import { useSortable } from '@dnd-kit/sortable'

type PageSectionProps = {
  section: Section
  sectionIndex: number
}

export default function PageSection({ section, sectionIndex }: PageSectionProps) {
  const timeout = useRef<NodeJS.Timeout>()
  const [visible, setVisible] = useState(false)
  const handleMouseEnter = useCallback(() => {
    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      setVisible(true)
    }, 25)
  }, [])
  const handleMouseLeave = useCallback(() => {
    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      setVisible(false)
    }, 25)
  }, [])

  const { refs, floatingStyles } = useFloating({
    placement: 'left-start',
    whileElementsMounted: autoUpdate,
    middleware: [
      offset({
        mainAxis: -38,
        crossAxis: 4,
      }),
      autoPlacement({
        allowedPlacements: ['left-start', 'left', 'left-end'],
      }),
    ],
  })

  const removeSectionAtIndex = useStore((store) => store.removeSectionAtIndex)

  const { setNodeRef, setActivatorNodeRef, listeners, attributes, isDragging, transform, transition } = useSortable({
    id: `page-section:${section.id}:${sectionIndex}`,
    data: {
      type: 'page-section',
    },
  })

  const dragStyle: React.CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  }

  return (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative after:pointer-events-none after:absolute after:inset-0 after:bg-muted/20 after:opacity-0 hover:after:opacity-100"
        ref={setNodeRef}
        style={dragStyle}
      >
        <div ref={refs.setReference}>{section.section}</div>
      </div>
      <div
        ref={refs.setFloating}
        style={floatingStyles}
        className={cn('z-10 space-y-2 rounded-md border bg-background p-1', visible ? 'opacity-100' : 'opacity-0')}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          className="flex items-center justify-center p-1"
          onClick={() => {
            removeSectionAtIndex(sectionIndex)
          }}
        >
          <Trash2Icon className="h-4 w-4" />
        </button>
        <button
          className="flex items-center justify-center p-1"
          ref={setActivatorNodeRef}
          {...listeners}
          {...attributes}
        >
          <GripIcon className="h-4 w-4" />
        </button>
      </div>
    </>
  )
}
