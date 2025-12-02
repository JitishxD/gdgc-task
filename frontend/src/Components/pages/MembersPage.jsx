import { useEffect, useState } from "react";
import MemberCard from "../MemberCard";
import Filters from "../Header/Filters";
import ParticleBackground from "../../Utils/ParticleBackground";
import fetchMembers, { loadMembersFromStorage } from "../../Utils/fetchMembers";

import { useThemeContext } from "../../hooks/useTheme";

import Header from "../Header/Header";

export default function MembersPage() {
  const URL = "/gdgc-task/members.json";

  const { theme, toggleTheme } = useThemeContext();

  const [members, setMembers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    roles: [],
    skills: [],
    locations: [],
  });

  // Get Members Data
  useEffect(() => {
    //If component unmounts before fetch finishes -> we skip updates.
    let cancelled = false;

    // load from cache first and
    // then asyncly fecth the latest data
    const cached = loadMembersFromStorage();
    if (cached && !cancelled) {
      setMembers(cached);
      setFiltered(cached);
      // 2 sec ka wait so that it shows the splash screen
      setTimeout(() => setLoading(false), 2000);
    }

    (async () => {
      try {
        const data = await fetchMembers(URL, { cache: !cached });
        
        if (cancelled) return;
        setMembers(data);
        setFiltered(data);
        // 2 sec ka wait so that it shows the splash screen
        setTimeout(() => setLoading(false), 2000);
      } catch (err) {
        if (cancelled) return;
        setError(err?.message || "Failed to fetch members");
        setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // filter functionality
  useEffect(() => {
    const lower = search.toLowerCase();

    let list = members.filter((m) => m.name.toLowerCase().includes(lower) || m.bio.toLowerCase().includes(lower));

    const { roles, skills, locations } = filters;

    if (roles.length) {
      list = list.filter((m) => roles.includes(m.role));
    }
    if (skills.length) {
      list = list.filter((m) => m.skills.some((s) => skills.includes(s)));
    }
    if (locations.length) {
      list = list.filter((m) => locations.includes(m.location));
    }

    setFiltered(list);
  }, [search, filters, members]);

  // Loading splash Animation
  if (loading)
    return (
      <div className="p-6 flex justify-center items-center h-64 bg-gray-50 dark:bg-gray-900">
        <div className="animate-ping w-12 h-12 bg-blue-500 rounded-full"></div>
        <h1 className="ml-6 dark:text-gray-100">Fetching Members...</h1>
      </div>
    );

  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <>
      {/* Particle Background */}
      <ParticleBackground />
      <div
        className={`min-h-screen ${
          theme === "light" ? "bg-linear-to-br from-blue-200 via-purple-200 to-pink-200 text-gray-900" : "dark:bg-gray-900 transition-colors duration-300"
        }`}
      >
        <div className="p-6 max-w-6xl mx-auto">
          <Header search={search} setSearch={setSearch} />

          {/* Filters */}
          <div className="mb-6">
            <Filters filters={filters} setFilters={setFilters} members={members} />
          </div>

          {/* Members Grid */}
          <div
            className="
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 
          animate-fadeIn
        "
          >
            {filtered.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
