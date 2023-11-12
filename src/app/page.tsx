import PageWrapper from '@/components/PageWrapper'
import Image from 'next/image'

export default function Home() {
  return (
    <PageWrapper className='flex flex-col items-center text-center justify-center mb-12 mt-28 sm:mt-40'>
      <div className='flex max-w-fit items-center justify-center space-x-2 mx-auto mb-4 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50'>
        <p className='text-sm font-semibold text-gray-700'>
          DocuInquire is now public
        </p>
      </div>
    </PageWrapper>
  )
}
