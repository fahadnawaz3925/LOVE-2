import Image from "next/image"

export default function PersonCard({ person }) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105">
      <div className="relative h-48">
        {person.image ? (
          <Image
            src={person.image || "/placeholder.svg"}
            alt={person.name}
            layout="fill"
            objectFit="cover"
            className="transition-opacity duration-300 ease-in-out hover:opacity-75"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-pink-500 to-yellow-500 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">No Image</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
          {person.name}
        </h2>
        <p className="text-gray-300">{person.country ? `From: ${person.country}` : "Country unknown"}</p>
        <p className="text-gray-300">{person.birthDate ? `Born: ${person.birthDate}` : "Birth date unknown"}</p>
      </div>
    </div>
  )
}

