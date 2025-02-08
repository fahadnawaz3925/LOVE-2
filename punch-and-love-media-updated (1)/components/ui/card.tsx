interface CardProps {
  title: string;
  content: string;
  image?: string;
}

export default function Card({ title, content, image }: CardProps) {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800">
      {image && <img src={image} alt={title} className="rounded-t-lg w-full h-32 object-cover" />}
      <h2 className="text-xl font-semibold mt-2">{title}</h2>
      <p className="text-gray-700 dark:text-gray-300">{content}</p>
    </div>
  );
}
