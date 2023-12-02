import NavBar from "@/components/navbar"

export default function Home() {
  return (
    <main className="flex h-[800px] flex-col items-center">
        <NavBar />
        <div className="h-[300px] w-full flex flex-col justify-center items-center text-center gap-12">
          <p className="text-4xl font-extrabold">AI: The <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-red-300 to-yellow-300">Ultimate Empowerment</span> Partner for Your Team.</p>
          <p className="w-full px-72 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla iusto numquam assumenda provident. Officiis esse saepe cumque numquam tempora odio illo dolorum error inventore alias! Aspernatur ducimus exercitationem omnis tempora.</p>
        </div>
    </main>
  )
}
