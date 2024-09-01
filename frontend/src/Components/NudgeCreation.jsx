import React, { useState } from "react";

const NudgeCreation = () => {
  const initialState = {
    nudgeType: "",
    tag: "",
    title: "",
    image: "",
    scheduledDate: "",
    timing: { from: "", to: "" },
    description: "",
    viewIcon: "",
    invitationText: "",
  };

  const [nudge, setNudge] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNudge((prev) => {
      if (name.includes(".")) {
        const [mainKey, subKey] = name.split(".");
        return {
          ...prev,
          [mainKey]: {
            ...prev[mainKey],
            [subKey]: value,
          },
        };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add API call here to submit form
      alert("Nudge created successfully");
      setNudge(initialState);
    } catch (error) {
      alert("Failed to create nudge");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-8 bg-white shadow-lg rounded-lg space-y-6"
    >
      <div className="flex flex-col">
        <label className="mb-1 text-gray-700 font-semibold" htmlFor="nudgeType">
          Nudge Type
        </label>
        <select
          name="nudgeType"
          value={nudge.nudgeType}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Nudge Type</option>
          <option value="Events">Events</option>
          <option value="Articles">Articles</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-gray-700 font-semibold" htmlFor="tag">
          Tag
        </label>
        <input
          type="text"
          name="tag"
          value={nudge.tag}
          onChange={handleChange}
          placeholder="Tag"
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-gray-700 font-semibold" htmlFor="title">
          Title (60 char max)
        </label>
        <input
          type="text"
          name="title"
          value={nudge.title}
          onChange={handleChange}
          maxLength="60"
          placeholder="Title (60 char max)"
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-gray-700 font-semibold" htmlFor="image">
          Choose Image
        </label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) =>
            setNudge({ ...nudge, image: URL.createObjectURL(e.target.files[0]) })
          }
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-gray-700 font-semibold" htmlFor="scheduledDate">
          Scheduled Date
        </label>
        <input
          type="date"
          name="scheduledDate"
          value={nudge.scheduledDate}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-gray-700 font-semibold" htmlFor="timing.from">
          Timing From
        </label>
        <input
          type="time"
          name="timing.from"
          value={nudge.timing.from}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-gray-700 font-semibold" htmlFor="timing.to">
          Timing To
        </label>
        <input
          type="time"
          name="timing.to"
          value={nudge.timing.to}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-gray-700 font-semibold" htmlFor="description">
          Description
        </label>
        <textarea
          name="description"
          value={nudge.description}
          onChange={handleChange}
          placeholder="Description"
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        ></textarea>
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-gray-700 font-semibold" htmlFor="viewIcon">
          Choose Icon
        </label>
        <input
          type="file"
          name="viewIcon"
          accept="image/*"
          onChange={(e) =>
            setNudge({ ...nudge, viewIcon: URL.createObjectURL(e.target.files[0]) })
          }
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-gray-700 font-semibold" htmlFor="invitationText">
          One-line Invitation
        </label>
        <input
          type="text"
          name="invitationText"
          value={nudge.invitationText}
          onChange={handleChange}
          placeholder="Enter one-line invitation"
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex space-x-4">
        <button
          type="button"
          className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition-colors"
        >
          Preview
        </button>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Publish Now
        </button>
      </div>
    </form>
  );
};

export default NudgeCreation;
