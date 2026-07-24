import { EditProfileDialog } from "@/components/dialogs/EditProfileDialog";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Package,
  Briefcase,
  HandHeart,
  Heart,
  Moon,
  Sun,
  LogOut,
  Edit2,
  CheckCircle2,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { StatCard } from "@/components/ui/Cards";
import { FadeIn } from "@/components/ui/Animations";

const timeline = [
  {
    icon: Package,
    title: "Borrowed Drill Machine",
    desc: "From Apartment 4B",
    time: "2 days ago",
    color: "text-olive-600",
  },
  {
    icon: Heart,
    title: "Donated Winter Clothes",
    desc: "To community donation drive",
    time: "1 week ago",
    color: "text-red-600",
  },
  {
    icon: Briefcase,
    title: "Offered Math Tutoring",
    desc: "3 sessions completed",
    time: "2 weeks ago",
    color: "text-blue-600",
  },
  {
    icon: HandHeart,
    title: "Volunteered for Medicine Pickup",
    desc: "Helped Apartment 8B",
    time: "3 weeks ago",
    color: "text-orange-600",
  },
];

export function ProfilePage() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [editOpen, setEditOpen] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("userProfile");

    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="space-y-6">

      {/* Header */}
      <FadeIn>
        <div className="card relative overflow-hidden">

          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-olive-50 to-olive-100/50 dark:from-olive-900/20 dark:to-olive-900/10" />

          <div className="relative pt-8">

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">

              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white dark:border-neutral-900 bg-olive-100">

                {profile?.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-olive-700 font-serif text-2xl">
                    {(profile?.name || user?.name || "R").charAt(0)}
                  </div>
                )}

              </div>

              <div className="flex-1">

                <div className="flex items-center gap-2">

                  <h1 className="font-serif text-2xl">
                    {profile?.name || user?.name || "Community Resident"}
                  </h1>

                  <span className="badge-olive">
                    {user?.role || "Resident"}
                  </span>

                </div>

                <p className="text-sm text-neutral-500 mt-1">
                  {user?.communityName || "Green Valley Residency"}
                </p>

                {profile?.occupation && (
                  <p className="text-xs text-neutral-400 mt-1">
                    {profile.occupation}
                  </p>
                )}

              </div>

              <button
                onClick={() => setEditOpen(true)}
                className="btn-secondary"
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>

            </div>

            {profile?.bio && (
              <p className="text-sm text-neutral-500 mt-4">
                {profile.bio}
              </p>
            )}

            {profile?.emergency && (
              <p className="text-sm text-neutral-500 mt-2">
                📞 Emergency Contact: {profile.emergency}
              </p>
            )}

          </div>

        </div>
      </FadeIn>

      {/* Statistics */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <StatCard
          icon={Package}
          label="Items Shared"
          value={user?.stats.itemsShared || 5}
          color="olive"
        />

        <StatCard
          icon={CheckCircle2}
          label="Items Borrowed"
          value={user?.stats.itemsBorrowed || 3}
          color="blue"
        />

        <StatCard
          icon={Briefcase}
          label="Services Offered"
          value={user?.stats.servicesOffered || 1}
          color="orange"
        />

        <StatCard
          icon={HandHeart}
          label="Help Requests"
          value={user?.stats.helpRequests || 2}
          color="red"
        />

      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Timeline Starts Here */}
        <FadeIn delay={0.1} className="lg:col-span-2">
  <div>
    <h2 className="font-serif text-lg mb-3">
      Activity Timeline
    </h2>

    <div className="card p-0 divide-y divide-neutral-100 dark:divide-neutral-800">

      {timeline.map((item, i) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-start gap-3 p-4"
          >
            <div
              className={`w-9 h-9 rounded-xl bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center ${item.color}`}
            >
              <Icon className="w-4 h-4" />
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium">
                {item.title}
              </p>

              <p className="text-xs text-neutral-500">
                {item.desc}
              </p>
            </div>

            <span className="text-xs text-neutral-400">
              {item.time}
            </span>
          </motion.div>
        );
      })}

    </div>
  </div>
</FadeIn>

{/* Settings */}

<FadeIn delay={0.15}>
  <div>

    <h2 className="font-serif text-lg mb-3">
      Settings
    </h2>

    <div className="card p-0 divide-y divide-neutral-100 dark:divide-neutral-800">

      <button
        onClick={toggleTheme}
        className="w-full flex items-center gap-3 p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800"
      >
        <div className="w-9 h-9 rounded-xl bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center">

          {theme === "light" ? (
            <Moon className="w-4 h-4" />
          ) : (
            <Sun className="w-4 h-4" />
          )}

        </div>

        <div className="flex-1 text-left">
          <p className="text-sm font-medium">
            Theme
          </p>

          <p className="text-xs text-neutral-400 capitalize">
            {theme} mode
          </p>
        </div>
      </button>

      <button
        onClick={() => {
          logout();
          navigate("/");
        }}
        className="w-full flex items-center gap-3 p-4 hover:bg-red-50 text-red-600"
      >
        <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
          <LogOut className="w-4 h-4" />
        </div>

        <div className="flex-1 text-left">
          <p className="text-sm font-medium">
            Logout
          </p>
        </div>

      </button>

    </div>

  </div>
</FadeIn>

</div>

{editOpen && (
  <EditProfileDialog
    user={{
      ...user,
      ...profile,
    }}
    onClose={() => setEditOpen(false)}
    onSave={(updatedUser) => {
      localStorage.setItem(
        "userProfile",
        JSON.stringify(updatedUser)
      );

      setProfile(updatedUser);
      setEditOpen(false);
    }}
  />
)}

</div>
  );
}