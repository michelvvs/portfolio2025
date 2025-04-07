function App() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="fixed h-12 w-full bg-emerald-500">
        <div>dsd</div>
      </div>
      <div className="h-screen bg-emerald-500 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="flex justify-between gap-8">
            <div className="content-center text-left">
              <h1 className="font-poppins text-8xl uppercase text-white">
                Michel Victor
              </h1>
              <h3 className="font-poppins text-3xl text-white">
                Javascript / Typescript. React | Next | Node | Nest
              </h3>
              <h5 className="mt-8 font-poppins text-xl text-white">
                Rio de Janeiro, Brasil
              </h5>
            </div>
            <div>
              <img src="public/gpt-mario1.png" alt="" className="size-96" />
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen bg-white sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40"></div>
    </div>
  )
}

export default App
