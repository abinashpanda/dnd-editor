'use client'

import { useFloating, autoUpdate, offset, autoPlacement } from '@floating-ui/react'
import { Section } from '../_utils/sections'
import { Trash2Icon } from 'lucide-react'
import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { useStore } from '../_stores'

type PageSectionProps = {
  section: Section
  sectionIndex: number
}

export default function PageSection({ section, sectionIndex }: PageSectionProps) {
  const [visible, setVisible] = useState(false)

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

  const timeout = useRef<NodeJS.Timeout>()

  return (
    <>
      <div
        ref={refs.setReference}
        onMouseEnter={() => {
          timeout.current = setTimeout(() => {
            setVisible(true)
          }, 25)
        }}
        onMouseLeave={() => {
          clearTimeout(timeout.current)
          timeout.current = setTimeout(() => {
            setVisible(false)
          }, 25)
        }}
        className="relative after:pointer-events-none after:absolute after:inset-0 after:bg-muted/20 after:opacity-0 hover:after:opacity-100"
      >
        {section.section}
      </div>
      <div
        ref={refs.setFloating}
        style={floatingStyles}
        className={cn('z-10 space-y-2 rounded-md border bg-background p-2', visible ? 'opacity-100' : 'opacity-0')}
        onMouseEnter={() => {
          timeout.current = setTimeout(() => {
            setVisible(true)
          }, 25)
        }}
        onMouseLeave={() => {
          clearTimeout(timeout.current)
          timeout.current = setTimeout(() => {
            setVisible(false)
          }, 25)
        }}
      >
        <button
          className="flex items-center justify-center"
          onClick={() => {
            removeSectionAtIndex(sectionIndex)
          }}
        >
          <Trash2Icon className="h-4 w-4" />
        </button>
      </div>
    </>
  )
}
