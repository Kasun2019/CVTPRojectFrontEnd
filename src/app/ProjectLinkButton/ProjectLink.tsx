"use client";
import { useState } from 'react';
import ProjectModal from './ProjectModal';

const ProjectLinkButton = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="mt-4 flex flex-col items-center justify-center">
      <button
        onClick={openModal}
        className="inline-flex items-center justify-center gap-2.5 rounded-full border border-primary px-10 py-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
      >
        <span>
          <svg
            className="fill-current"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_182_46495)">
              <path d="M18.875 11.4375C18.3125 10.8438 17.5625 10.5312 16.75 10.5312C16.125 10.5312" fill="" />
            </g>
            <defs>
              <clipPath id="clip0_182_46495">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </span>
        Upload Project
      </button>

      {showModal && (
        <ProjectModal closeModal={closeModal} />
      )}
    </div>
  );
};

export default ProjectLinkButton;
