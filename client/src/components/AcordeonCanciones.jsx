import { useState } from "react";

// eslint-disable-next-line react/prop-types
const Acordeon = ({ title, children, artista }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-3 pl-10  hover:bg-opacity-20 transition-colors"
      >
        <div className="flex flex-col sm:flex-row gap- items-start sm:items-center sm:justify-center justify-start gap-2">
          <span className="text-left font-medium">{title}</span>
          <p className="text-left font-light text-sm">{artista}</p>
        </div>
        <svg
          className={`w-5 h-5 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && <div className="">{children}</div>}
    </div>
  );
};

export default Acordeon;
