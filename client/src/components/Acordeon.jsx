import {useState} from "react";

// eslint-disable-next-line react/prop-types
const Acordeon = ({ title, children  }) => {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-lg shadow-md my-2 bg-black bg-opacity-30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-3  hover:bg-opacity-20 transition-colors"
      >
        <span className="text-left font-medium">{title}</span>
        <svg
          className={`w-5 h-5 transform transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="p-3 border-t ">
          {children}
        </div>
      )}
    </div>
  );
};

export default Acordeon;
