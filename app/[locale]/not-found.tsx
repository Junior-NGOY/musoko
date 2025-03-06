'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'

export default function NotFound() {
  const t = useTranslations('NotFound')

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <div className='p-6 rounded-lg shadow-md w-full max-w-md text-center'>
        <h1 className='text-3xl font-bold mb-4'>
          {t('title')}
        </h1>
        <p className='text-destructive mb-6'>
          {t('description')}
        </p>
        <Link href="/" passHref>
          <Button
            variant='default'
            className='mt-4'
          >
            {t('returnHome')}
          </Button>
        </Link>
      </div>
    </div>
  )
}