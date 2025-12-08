const deriveOptions = (list, picker) =>
  [...new Set(
    (list || [])
      .flatMap(item => {
        const val = picker(item);
        return Array.isArray(val) ? val : [val];
      })
      .filter(Boolean)
  )].sort();

export default function Filters({ filters, setFilters, members = [] }) {
  const roles = deriveOptions(members, m => m.role);
  const skills = deriveOptions(members, m => m.skills);
  const locations = deriveOptions(members, m => m.location);

  const toggleValue = (key, value) => {
    const current = filters[key] || [];
    const next = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];

    setFilters({ ...filters, [key]: next });
  };

  const Section = ({ title, items, keyName }) => {
    const activeValues = filters[keyName] || [];

    return (
      <div className="flex flex-col gap-2 min-w-40">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          {title}
        </p>

        <div className="flex flex-wrap gap-2">
          {items.length === 0 ? (
            <span className="text-xs text-gray-400">None</span>
          ) : (
            items.map(item => {
              const active = activeValues.includes(item);

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleValue(keyName, item)}
                  className={`px-3 py-1 rounded text-sm border transition-colors ${
                    active
                      ? "bg-purple-600 text-white border-purple-600"
                      : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {item}
                </button>
              );
            })
          )}
        </div>

        {activeValues.length > 0 && (
          <button
            type="button"
            onClick={() => setFilters({ ...filters, [keyName]: [] })}
            className="self-start text-xs mt-1 text-purple-600 hover:underline"
          >
            Clear
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="flex gap-6 mt-2 flex-wrap">
      <Section title="Roles" items={roles} keyName="roles" />
      <Section title="Skills" items={skills} keyName="skills" />
      <Section title="Locations" items={locations} keyName="locations" />
    </div>
  );
}
