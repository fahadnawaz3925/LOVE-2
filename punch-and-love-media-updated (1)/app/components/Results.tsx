import PersonCard from "./PersonCard"

export default function Results({ results }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {results.map((person) => (
        <PersonCard key={person.pageid} person={person} />
      ))}
    </div>
  )
}

