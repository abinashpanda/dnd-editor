'use client'

import DraggableSectionPreview from './_components/draggable-section-preview'
import DndProvider from './_components/dnd-provider'
import SectionPreviewOverlay from './_components/section-preview-overalay'
import { useStore } from './_stores'
import EditorCanvas from './_components/editor-canvas'
import { GlobeIcon } from 'lucide-react'
import PageSectionSortableOverlay from './_components/page-section-sortable-overlay'
import { useMeasure } from '@uidotdev/usehooks'

export default function Page() {
  const [ref, { width }] = useMeasure<HTMLDivElement>()

  return (
    <DndProvider>
      <div className="flex h-screen overflow-hidden">
        <div className="w-[240px] border-r p-3">
          {Object.values(useStore.getState().sections).map((section) => {
            return (
              <div className="p-1" key={section.id}>
                <DraggableSectionPreview section={section} />
              </div>
            )
          })}
        </div>
        <div className="flex-1 bg-muted p-4">
          <div className="flex h-full flex-col space-y-2 rounded-md border bg-background p-2">
            <div className="flex items-center space-x-2 rounded-md border bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
              <GlobeIcon className="h-3 w-3" />
              <div className="flex-1">sample.tealfeed</div>
            </div>
            <div className="flex-1 overflow-hidden" ref={ref}>
              <EditorCanvas />
            </div>
          </div>
        </div>
      </div>
      <SectionPreviewOverlay />
      <PageSectionSortableOverlay width={width ?? 0} />
    </DndProvider>
  )
}
