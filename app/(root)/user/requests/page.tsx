"use client"
import RequestsPage from '@/components/RequestsPage'

export default function Page() {

  return (
    <>
      <section className='pink_container !min-h-[230px] pink_container-alt'>
        <h1 className='heading'>Requests</h1>
      </section>
      <RequestsPage/>
    </>
  )
}