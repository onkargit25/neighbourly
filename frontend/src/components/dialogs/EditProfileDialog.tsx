import { useState } from "react";
import { X } from "lucide-react";

interface Props {
  user: Record<string, any>;
  onClose: () => void;
 onSave: (user: Record<string, any>) => void;
}

export function EditProfileDialog({
  user,
  onClose,
  onSave,
}: Props) {
  const [form, setForm] = useState({
    name: user?.name || "",
    occupation: user?.occupation || "",
    mobile: user?.mobile || "",
    bio: user?.bio || "",
    apartment: user?.apartment || "",
    photo:
      user?.photo ||
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
  });

  const change = (key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-4">

      <div className="bg-white rounded-3xl w-full max-w-lg p-6">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-serif">
            Edit Profile
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="flex justify-center mb-5">
          <img
            src={form.photo}
            alt=""
            className="w-24 h-24 rounded-full object-cover border"
          />
        </div>

        <div className="space-y-4">

          <input
            className="input-field"
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              change("name", e.target.value)
            }
          />

          <input
            className="input-field"
            placeholder="Occupation"
            value={form.occupation}
            onChange={(e) =>
              change("occupation", e.target.value)
            }
          />

          <input
            className="input-field"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={(e) =>
              change("mobile", e.target.value)
            }
          />

          <input
            className="input-field"
            placeholder="Apartment Number"
            value={form.apartment}
            onChange={(e) =>
              change("apartment", e.target.value)
            }
          />

          <textarea
            rows={4}
            className="input-field"
            placeholder="Bio"
            value={form.bio}
            onChange={(e) =>
              change("bio", e.target.value)
            }
          />

        </div>

        <div className="flex gap-3 mt-6">

          <button
            onClick={onClose}
            className="flex-1 rounded-xl border py-3"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="flex-1 btn-primary"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}