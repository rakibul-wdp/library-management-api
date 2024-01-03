"use client";

export default function Button() {
  return (
    <div className="mt-5">
      <button
        onClick={() => console.log("I have clicked here")}
        className="bg-green-500 rounded-sm p-2"
      >
        Click here
      </button>
    </div>
  );
}
