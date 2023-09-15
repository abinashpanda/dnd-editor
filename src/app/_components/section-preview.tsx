'use client'

import { forwardRef } from 'react'
import { Section } from '../_utils/sections'

type SectionPreviewProps = React.HTMLAttributes<HTMLDivElement> & {
  section: Section
}

const SectionPreview = forwardRef<HTMLDivElement, SectionPreviewProps>(({ section, ...props }, ref) => {
  return (
    <div ref={ref} {...props} suppressHydrationWarning>
      {section.preview}
    </div>
  )
})

SectionPreview.displayName = 'SectionPreview'

export default SectionPreview
