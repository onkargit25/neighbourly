import Logo from "@/assets/logos/logo.png";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Briefcase,
  FileText,
  Phone,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ProfileSetupPage() {
  const navigate = useNavigate();

  const [occupation, setOccupation] = useState("");
  const [bio, setBio] = useState("");
  const [emergency, setEmergency] = useState("");

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  };

  const handleContinue = () => {
  const profileData = {
    occupation,
    bio,
    emergency,
    profileImage,
  };

  localStorage.setItem(
    "userProfile",
    JSON.stringify(profileData)
  );

  navigate("/join-community");
};

  return (
    <div className="min-h-screen bg-neutral-50/50 dark:bg-neutral-950 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6 md:p-8"
        >
          <div className="flex items-center mb-6">
          <button onClick={() => navigate("/")} className="flex items-center">
         <img
          src={Logo}
           alt="Neighbourly Logo"
            className="h-12 w-auto"
           />
          </button>
          </div>

          <h1 className="font-serif text-2xl mb-1">Complete your profile</h1>
          <p className="text-sm text-neutral-500 mb-6">Tell your neighbours a bit about yourself.</p>

          <div className="space-y-5">
 {/* Photo upload */}
         
<div className="flex flex-col items-center">

  <input
    type="file"
    accept="image/*"
    ref={fileInputRef}
    onChange={handleImageUpload}
    className="hidden"
  />

  <div
    onClick={() => fileInputRef.current?.click()}
    className="relative group cursor-pointer"
  >
    {profileImage ? (
      <img
        src={profileImage}
        alt="Profile"
        className="w-24 h-24 rounded-full object-cover border-4 border-olive-200 shadow-lg"
      />
    ) : (
      <div className="w-24 h-24 rounded-full bg-olive-50 border-2 border-dashed border-olive-300 flex items-center justify-center group-hover:bg-olive-100 transition-all duration-300">
        <Camera className="w-8 h-8 text-olive-500" />
      </div>
    )}

    {/* Small Camera Badge */}
    <div className="absolute bottom-0 right-0 bg-olive-700 rounded-full p-2 shadow-lg">
      <Camera className="w-4 h-4 text-white" />
    </div>
  </div>

  <button
    type="button"
    onClick={() => fileInputRef.current?.click()}
    className="mt-4 px-5 py-2 rounded-xl bg-olive-700 text-white text-sm font-medium hover:bg-olive-800 transition"
  >
    Upload Photo
  </button>

  <p className="text-xs text-neutral-400 mt-2">
    JPG, PNG or JPEG • Max 5 MB
  </p>

</div>

            {/* Occupation */}
            <div>
              <label className="block text-sm font-medium mb-1.5">Occupation</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  value={occupation}
                  onChange={e => setOccupation(e.target.value)}
                  placeholder="Enter your occupation"
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium mb-1.5">Short Bio</label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-4 h-4 text-neutral-400" />
                <textarea
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  placeholder="Write a short bio about yourself..."
                  rows={3}
                  className="input-field pl-10 resize-none"
                />
              </div>
            </div>

            {/* Emergency contact */}
            <div>
              <label className="block text-sm font-medium mb-1.5">Emergency Contact (Optional)</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  value={emergency}
                  onChange={e => setEmergency(e.target.value)}
                  placeholder="Enter emergency contact number"
                  className="input-field pl-10"
                />
              </div>
              <p className="text-xs text-neutral-400 mt-1">Only visible to your community secretary.</p>
            </div>

            <button onClick={handleContinue} className="btn-primary w-full text-base py-3">
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
