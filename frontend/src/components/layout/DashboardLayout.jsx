import Sidebar from "./Sidebar";
import UserProfile from "./UserProfile";

// Standard workspace layout containing the sidebar and top header
export default function DashboardLayout({ children }) {
  return (
    <div className="h-screen w-screen overflow-hidden flex bg-slate-50/50">
      {/* Reusable Sidebar Navigation */}
      <Sidebar />

      {/* Main workspace container */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top header navigation */}
        <header className="h-14 border-b border-slate-100 bg-white flex items-center justify-end px-8 shrink-0">
          <UserProfile />
        </header>

        {/* Workspace body viewport */}
        <main className="flex-1 overflow-auto p-5 flex flex-col gap-4">
          {children}
        </main>
      </div>
    </div>
  );
}
