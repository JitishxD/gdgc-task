const STORAGE_KEY = "members";
const URL = "https://gdgc-task-jitish.vercel.app/api/v1/getMembers";

export const loadMembersFromStorage = () => {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(data) ? data : null;
  } catch {
    return null; // invalid JSON, storage blocked, etc.
  }
};

export const clearMembersCache = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch {
    return null; // storage blocked (private mode), etc.
  }
};

async function fetchMembers(url = URL, { cache = true } = {}) {
  if (cache) {
    const cached = loadMembersFromStorage();
    if (cached) return cached;
  }

  const res = await fetch(url, {
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    return null; // or throw, depending on UX
  }

  const data = await res.json();
  if (!Array.isArray(data)) {
    return null;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    console.warn("Failed to cache members data in localStorage");
  }

  return data;
}

export default fetchMembers;
