'use client'

import { useDroppable } from '@dnd-kit/core'
import { VariantProps, cva } from 'class-variance-authority'
import { PackagePlusIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const variants = cva(
  'text-medium flex items-center justify-center gap-2 text-xs text-muted-foreground after:content-[attr(data-placeholder)] data-[drop-over]:bg-muted data-[drop-over]:px-4 data-[drop-over]:py-2 data-[drop-over]:after:hidden',
  {
    variants: {
      variant: {
        slot: '-mt-px h-px data-[drop-over]:h-auto',
        'full-page': 'h-full',
      },
    },
    defaultVariants: {
      variant: 'slot',
    },
  },
)

type SectionDroppableProps = VariantProps<typeof variants> & {
  droppableIndex: number
  placeholder?: string
}

export default function SectionDroppable({ droppableIndex, variant, placeholder }: SectionDroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: `section-droppable:${droppableIndex}`,
  })

  return (
    <div
      ref={setNodeRef}
      className={cn(variants({ variant }))}
      data-drop-over={isOver || null}
      data-placeholder={placeholder}
    >
      {isOver ? (
        <>
          <PackagePlusIcon className="h-5 w-5" />
          <span>Drop section to add</span>
        </>
      ) : null}
    </div>
  )
}
