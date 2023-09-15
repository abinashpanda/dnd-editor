import { create } from 'zustand'
import { SECTIONS, Section } from '../_utils/sections'

type State = {
  sections: Record<string, Section>
  pageSectionsOrder: string[]
  addSectionAtIndex: (sectionId: string, index: number) => void
  removeSectionAtIndex: (index: number) => void
}

export const useStore = create<State>((set) => ({
  sections: SECTIONS.reduce(
    (acc, section) => ({
      ...acc,
      [section.id]: section,
    }),
    {} as Record<string, Section>,
  ),
  pageSectionsOrder: [],
  addSectionAtIndex: (sectionId, index) => {
    set((state) => {
      const section = state.sections[sectionId]
      if (!section) {
        return state
      }
      const pageSectionsOrder = [...state.pageSectionsOrder]
      pageSectionsOrder.splice(index, 0, sectionId)
      return { pageSectionsOrder }
    })
  },
  removeSectionAtIndex: (index) => {
    set((state) => {
      const pageSectionsOrder = [...state.pageSectionsOrder]
      pageSectionsOrder.splice(index, 1)
      return { pageSectionsOrder }
    })
  },
}))
