'use client'

import { useDraggable } from '@dnd-kit/core'
import SectionPreview from './section-preview'

type DraggableSectionPreviewProps = React.ComponentProps<typeof SectionPreview>

export default function DraggableSectionPreview(props: DraggableSectionPreviewProps) {
  const { setNodeRef, listeners, attributes } = useDraggable({
    id: `draggable-preview:${props.section.id}`,
    data: {
      type: 'section-preview',
    },
  })

  return <SectionPreview {...props} ref={setNodeRef} {...listeners} {...attributes} />
}
