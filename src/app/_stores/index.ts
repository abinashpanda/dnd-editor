import { create } from 'zustand'
import { SECTIONS, Section } from '../_utils/sections'

type State = {
  sections: Record<string, Section>
  pageSectionsOrder: string[]
  addSectionAtIndex: (sectionId: string, index: number) => void
  removeSectionAtIndex: (index: number) => void
  swapSections: (fromIndex: number, toIndex: number) => void
}

function arrayMove<T>(array: T[], from: number, to: number): T[] {
  const newArray = array.slice()
  newArray.splice(to < 0 ? newArray.length + to : to, 0, newArray.splice(from, 1)[0])

  return newArray
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
  swapSections: (fromIndex: number, toIndex: number) => {
    set((state) => {
      const pageSectionsOrder = arrayMove(state.pageSectionsOrder, fromIndex, toIndex)
      console.log(pageSectionsOrder, fromIndex, toIndex)
      return { pageSectionsOrder }
    })
  },
}))
