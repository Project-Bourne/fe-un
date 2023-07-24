function ImagesPreview({selectedImages, removeImage, closePreview, uploadPreview }){
    const handleRemoveImage = (e, index) => {
        e.preventDefault();
        removeImage(index);
    }


    if(selectedImages?.length === 0){
        return null;
    }

    return(
        <div className="grid absolute -top-[11rem] rounded-md right-0 w-full p-3 bg-[#747474]/[0.1] backdrop-brightness-50 backdrop-blur-sm ">
            <div className="flex flex-wrap gap-x-4">
                {selectedImages.map((imageDataUrl, index) => (
                <div key={index} className="relative p-2 rounded-md bg-black/[0.4] border-gray-50/50 border-2 border-dotted">
                    {/* Image Preview */}
                    <img
                    src={imageDataUrl}
                    alt={`Preview ${index + 1}`}
                    className="rounded-md"
                    style={{ maxWidth: '70px', height: '50px' ,marginBottom: '10px' }}
                    />
                    <button onClick={(e) => handleRemoveImage(e, index)} className=" bg-gray-50/95  text-black/50 text-[14px] leading-2 h-4 w-4 flex items-center justify-center rounded-full mx-auto">&times;</button>
                </div>
                ))}
            </div>
            <div className="flex justify-end gap-x-5 mt-3">
                <button onClick={closePreview} className="bg-gray-100 px-3 py-1 shadow text-[13px] rounded-md">Close preview</button>  
                <button onClick={uploadPreview} className="bg-sirp-online text-white px-3 py-1 shadow text-[13px] rounded-md"> Upload </button>         
            </div>
        </div>
        
    )
}

export default ImagesPreview;