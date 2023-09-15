import { create } from 'zustand'
import { SECTIONS, Section } from '../_utils/sections'

type State = {
  sections: Record<string, Section>
  pageSectionsOrder: string[]
  addSectionAtIndex: (sectionId: string, index: number) => void
  removeSectionAtIndex: (index: number) => void
  swapSections: (fromIndex: number, toIndex: number) => void
}

function moveElement<T extends any>(arr: T[], fromIndex: number, toIndex: number) {
  if (fromIndex < 0 || fromIndex >= arr.length || toIndex < 0 || toIndex >= arr.length) {
    return [...arr] // return a copy of the array if indexes are out of bounds
  }

  const result = [...arr] // create a copy of the array

  const [element] = result.splice(fromIndex, 1) // remove the element from the source position
  result.splice(toIndex, 0, element) // insert the element at the target position

  return result
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
      const pageSectionsOrder = moveElement(state.pageSectionsOrder, fromIndex, toIndex)
      console.log(pageSectionsOrder, fromIndex, toIndex)
      return { pageSectionsOrder }
    })
  },
}))
