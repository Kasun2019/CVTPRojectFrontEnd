import { useState } from 'react';

interface ProjectModal {
  closeModal: () => void; // Function type definition
}

const ProjectModal: React.FC<ProjectModal> = ({ closeModal }) => {
  const [localFilePath, setLocalFilePath] = useState('');
  const [gitHubLink, setGitHubLink] = useState('');

  // const handleLocalFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const filePath = URL.createObjectURL(file);
  //     setLocalFilePath(filePath);
  //     console.log("filePath")
  //     console.log(file.name)
  //     localStorage.setItem('projectFile', filePath);
  //     closeModal();
  //   }

  //   const files = Array.from(e.target.files);
  //   const paths = files.map(file => file.webkitRelativePath);
    
  // };
  const [filePaths, setFilePaths] = useState('');

  // const handleLocalFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target.files;
  //   if (files) {
  //     const paths = Array.from(files).map(file => file.webkitRelativePath);
  //     console.log(paths);
  //   }
  // };
  const handleLocalFileUpload = () => {
    
      console.log(filePaths);
      localStorage.setItem('projectFile', filePaths);
      closeModal();
  };


  const handleGitHubLinkSubmit = () => {
    if (gitHubLink) {
      localStorage.setItem('gitHubLink', gitHubLink);
      closeModal();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-lg font-bold mb-4">Select Project Source</h2>

        {/* Option 1: Upload Local Project File */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Upload Local Project:</label>
          {/* <input
            type="file"
            webkitdirectory=""
            onChange={handleLocalFileUpload}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 mt-2"
          /> */}
           <input
            type="text"
            onChange={(e) => setFilePaths(e.target.value)}
            className="block w-full p-2 border rounded mt-2"
          />
          <button
            onClick={handleLocalFileUpload}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit Local Link
          </button>
        </div>

        {/* Option 2: Enter GitHub Link */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">GitHub Project Link:</label>
          <input
            type="text"
            value={gitHubLink}
            onChange={(e) => setGitHubLink(e.target.value)}
            placeholder="https://github.com/username/repository"
            className="block w-full p-2 border rounded mt-2"
          />
          <button
            onClick={handleGitHubLinkSubmit}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit GitHub Link
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={closeModal}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProjectModal;
