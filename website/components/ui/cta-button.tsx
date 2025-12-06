'use client'

import React from 'react'
import { Button } from './button'
import { cn } from '@/lib/utils'

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  asChild?: boolean
}

export function CTAButton({ 
  className, 
  children,
  asChild,
  ...props 
}: CTAButtonProps) {
  return (
    <Button
      className={cn(
        'bg-sky-500 hover:bg-sky-600 text-white',
        'shadow-md hover:shadow-lg hover:shadow-sky-500/20', // ✅ Glow plus subtil (30 → 20)
        'transition-all duration-500', // ✅ Transition plus longue (300 → 500)
        'hover:scale-102', // ✅ Zoom réduit (105 → 102)
        className
      )}
      asChild={asChild}
      {...props}
    >
      {children}
    </Button>
  )
}