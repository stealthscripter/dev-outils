type TagsProps = {
    tags: string[];
  };
  export default function Tag({ tags }: TagsProps) {
    return (
      <ul className="flex flex-wrap gap-x-2 gap-y-2">
        {tags.map((tag) => (
          <li key={tag} className="text-xs border border-gray-300 px-2 rounded-xl text-gray-500">{tag}</li>
        ))}
      </ul>
    );
  }
  