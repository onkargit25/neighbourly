import { useState } from "react";
import { X } from "lucide-react";

export function LendItemDialog({
  onClose,
}: {
  onClose: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deposit, setDeposit] = useState("");

  const handleSubmit = () => {
    const newItem = {
      id: Date.now().toString(),
      title,
      description,
      deposit: Number(deposit),
      category: "tools",
      available: true,
      ownerId: "current-user",
      ownerName: "You",
      communityId: "c1",
      image:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800",
      createdAt: new Date().toISOString(),
    };

    const oldItems = JSON.parse(
      localStorage.getItem("marketResources") || "[]"
    );

    oldItems.unshift(newItem);

    localStorage.setItem(
      "marketResources",
      JSON.stringify(oldItems)
    );

    window.dispatchEvent(new Event("market-updated"));

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center">

      <div className="bg-white rounded-3xl p-6 w-full max-w-lg">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-serif">
            Lend Item
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <input
          className="input-field mb-4"
          placeholder="Item Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="input-field mb-4"
          placeholder="Description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="input-field mb-6"
          placeholder="Deposit"
          value={deposit}
          onChange={(e) => setDeposit(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="btn-primary w-full"
        >
          Publish Item
        </button>

      </div>

    </div>
  );
}