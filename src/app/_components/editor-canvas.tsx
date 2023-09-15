'use client'

import { Fragment } from 'react'
import { useStore } from '../_stores'
import SectionDroppable from './section-droppable'
import PageSection from './page-section'

export default function EditorCanvas() {
  const { pageSectionsOrder, sections } = useStore((store) => ({
    pageSectionsOrder: store.pageSectionsOrder,
    sections: store.sections,
  }))

  return (
    <div className="h-full overflow-auto rounded-md">
      <>
        {pageSectionsOrder.map((sectionId, index) => {
          const section = sections[sectionId]
          if (section) {
            return (
              <Fragment key={`${sectionId}-${index}`}>
                <SectionDroppable variant="slot" droppableIndex={index} />
                <PageSection sectionIndex={index} section={section} />
              </Fragment>
            )
          }

          return null
        })}
        <SectionDroppable
          droppableIndex={pageSectionsOrder.length}
          variant={pageSectionsOrder.length === 0 ? 'full-page' : 'slot'}
          placeholder={pageSectionsOrder.length === 0 ? 'Add section to get started' : undefined}
        />
      </>
    </div>
  )
}
