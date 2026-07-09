import { useSelector } from "react-redux";
import { ChevronDown } from "lucide-react";
import { selectUser } from "../../features/auth/authSelectors";

// Displays the logged-in user profile with dropdown trigger
export default function UserProfile() {
  const reduxUser = useSelector(selectUser);

  // Retrieve user from localStorage (populated during login)
  let localUser = null;
  try {
    const stored = localStorage.getItem("user");
    if (stored) localUser = JSON.parse(stored);
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
  }

  // Use dynamic user name, fallback to "Kajal Sharma"
  const displayName =
    reduxUser?.name ||
    localUser?.name ||
    reduxUser?.username ||
    localUser?.username ||
    "User";

  // Initial letter of the first name
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="flex items-center gap-3 cursor-pointer select-none py-1.5 px-3 rounded-xl hover:bg-slate-50 transition duration-200">
      {/* Profile avatar circle */}
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-700 text-white font-bold text-sm shadow-sm">
        {initial}
      </div>

      {/* Profile Name & indicator */}
      <div className="flex items-center gap-1.5">
        <span className="text-[14px] font-semibold text-slate-800">
          {displayName}
        </span>
        <ChevronDown size={14} className="text-slate-400" />
      </div>
    </div>
  );
}
