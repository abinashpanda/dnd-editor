export type Section = {
  id: string
  section: React.ReactElement
  preview: React.ReactElement
}

export const SECTIONS: Section[] = [
  {
    id: 'red-section',
    section: <div className="h-[400px] bg-red-300" />,
    preview: <div className="aspect-video rounded-md bg-red-300" />,
  },
  {
    id: 'amber-section',
    section: <div className="h-[400px] bg-amber-300" />,
    preview: <div className="aspect-video rounded-md bg-amber-300" />,
  },
  {
    id: 'blue-section',
    section: <div className="h-[400px] bg-blue-300" />,
    preview: <div className="aspect-video rounded-md bg-blue-300" />,
  },
  {
    id: 'purple-section',
    section: <div className="h-[400px] bg-purple-300" />,
    preview: <div className="aspect-video rounded-md bg-purple-300" />,
  },
]
