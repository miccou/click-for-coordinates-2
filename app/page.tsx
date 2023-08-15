import Map from './components/map'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-row items-stretch justify-between p-6 bg-red-50 gap-6">
      <div className="flex w-full bg-green-50"><Map /></div>
      <div className="flex flex-col justify-between w-32  bg-blue-50">
        <div>1</div>
        <div>2</div>
      </div>

    </main>
  )
}
