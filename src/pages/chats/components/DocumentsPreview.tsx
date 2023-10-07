import React from 'react';

function DocumentsPreview({ selectedFiles, removeFile, closePreview, uploadPreview }) {
  const handleRemoveFile = (e, index) => {
    e.preventDefault();
    removeFile(index);
  };

  if (selectedFiles?.length === 0) {
    return null;
  }

  return (
    <div className="grid absolute -top-[11rem] rounded-md right-0 w-full p-3 bg-[#747474]/[0.1] backdrop-brightness-50 backdrop-blur-sm ">
      <div className="flex flex-wrap gap-x-4">
        {selectedFiles.map((file, index) => (
          <div
            key={index}
            className="relative p-2 rounded-md bg-black/[0.4] border-gray-50/50 border-2 border-dotted"
          >
            {/* Document Name */}
            <p className="text-white">{file.name}</p>
            <button
              onClick={(e) => handleRemoveFile(e, index)}
              className=" bg-gray-50/95  text-black/50 text-[14px] leading-2 h-4 w-4 flex items-center justify-center rounded-full mx-auto"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-x-5 mt-3">
        <button
          onClick={closePreview}
          className="bg-gray-100 px-3 py-1 shadow text-[13px] rounded-md"
        >
          Close preview
        </button>
        <button
          onClick={uploadPreview}
          className="bg-sirp-online text-white px-3 py-1 shadow text-[13px] rounded-md"
        >
          Upload
        </button>
      </div>
    </div>
  );
}

export default DocumentsPreview;
