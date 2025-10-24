import type { NextPage } from 'next'

import { ContainerComponent } from '@/app/shared/ui/container'
import { NotFoundComponent } from '@/app/shared/ui/not-found'

// component
const NotFound: NextPage = () => {
  // return
  return (
    <ContainerComponent className='grid h-full items-center justify-center'>
      <NotFoundComponent />
    </ContainerComponent>
  )
}

export default NotFound
