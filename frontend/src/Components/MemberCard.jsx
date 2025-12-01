export default function MemberCard({ member }) {
  return (
    <div
      className="
      group
      p-4 rounded-2xl shadow-lg
      bg-white dark:bg-gray-800
      border border-gray-200 dark:border-gray-700
      hover:shadow-2xl transition-all duration-300
      hover:-translate-y-1
    "
    >
      <div className="overflow-hidden rounded-xl">
        <img
          src={member.photo}
          className="
            w-full h-44 object-cover rounded-xl
            transition-transform duration-300
            group-hover:scale-105
          "
        />
      </div>

      <h2 className="text-xl font-semibold mt-3 tracking-wide text-gray-900 dark:text-gray-100">{member.name}</h2>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{member.role}</p>

      <div className="flex flex-wrap gap-2 mt-2">
        {member.skills.map((s) => (
          <span
            key={s}
            className="
              text-xs px-2 py-1 rounded-full
              bg-blue-100 dark:bg-blue-900/30
              text-blue-700 dark:text-blue-300
              border border-blue-200 dark:border-blue-700
            "
          >
            {s}
          </span>
        ))}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{member.bio}</p>
    </div>
  );
}
