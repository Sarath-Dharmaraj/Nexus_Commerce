import { useLoaderData } from "react-router-dom";

export default function Home() {
  const data = useLoaderData();
  console.log(data);

  return (
    <div className="px-8 py-6 flex flex-col justify-around gap-5">
      <div className="flex flex-col justify-around gap-8">
        {/* Banner for current trends and offers */}
        <div className="bg-[url('/background_home.png')] bg-cover bg-center bg-no-repeat h-100 border rounded-md flex flex-col items-start justify-center gap-3 text-white px-16 ">
          <span className="text-4xl mb-2">Curated Execelle</span>
          <span>
            Discover the season's defining pieces. Institutional confidence
          </span>
          <span>meets high-end trail.</span>
          <div className="bg-black px-6 py-2 mt-4">Explore Collection</div>
        </div>
        {/* sort and filter */}
        <div className="w-full border-b border-slate-400 flex justify-end">
          <span className="px-3  py-2 ">Sort & Filter</span>
        </div>
        <div className="flex flex-col items-start justify-around gap-4">
          {[1, 2].map((card, key) => (
            <div key={key} className="flex flex-col gap-4">
              <div className="">{"Title card"}</div>
              <div className="flex items-start justify-around gap-1">
                <div className="flex flex-col justify-around gap-1">
                  <div>Nexus Lab</div>
                  <div>chronos handbag</div>
                  <div>$499.0</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
