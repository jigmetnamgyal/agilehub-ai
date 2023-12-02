import NavBar from "@/components/navbar"

export default function Home() {
  return (
    <main className="flex h-auto flex-col items-center">
        <NavBar />
        <div className="h-[400px] w-full flex flex-col justify-center items-center text-center gap-12">
          <p className="text-4xl font-extrabold">AI: The <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-red-300 to-yellow-300">Ultimate Empowerment</span> Partner for Your Team.</p>
          <p className="w-full px-72 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla iusto numquam assumenda provident. Officiis esse saepe cumque numquam tempora odio illo dolorum error inventore alias! Aspernatur ducimus exercitationem omnis tempora.</p>

          <a className="btn bg-yellow-300 text-black rounded-[5px] px-10 hover:text-white hover:bg-transparent hover:border-2 hover:border-yellow-300">Start Using Jaggle</a>
        </div>
        
        <div className="mockup-browser border border-base-300 w-[80%] h-[600px]">
          <div className="mockup-browser-toolbar">
            <div className="input border border-base-300">https://www.jaggleai.com</div>
          </div>
          <div className="flex justify-center px-4 py-16 border-t border-base-300">
        </div>
      </div>
    </main>
  )
}
