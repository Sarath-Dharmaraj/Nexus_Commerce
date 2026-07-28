export default function Home() {
  return (
    <div className="px-8 py-6 flex flex-col justify-around gap-5">
      <div className="bg-[url('/background_home.png')] bg-cover bg-center bg-no-repeat h-100 border rounded-md flex flex-col items-start justify-center gap-3 text-white px-16 ">
        <span className="text-4xl mb-2">Curated Execelle</span>
        <span>
          Discover the season's defining pieces. Institutional confidence
        </span>
        <span>meets high-end trail.</span>
        <div className="bg-black px-6 py-2 mt-4">Explore Collection</div>
      </div>
    </div>
  );
}
