import { Button, Upload } from "antd"
import type { EventFormStepProps } from "."

function Media({currentStep, setCurrentStep, eventData, setEventData, selectedMediaFiles, setSelectedMediaFiles} : EventFormStepProps) {
  const removeMedia = (index: number) => {
    const existingMedia = [...selectedMediaFiles];
    const newMedia = existingMedia.filter((_, i) => i !== index);
    setSelectedMediaFiles(newMedia);
    
  }
  
  const removeUploadedMedia = (index: number) => {
    const existingMedia = [...eventData.media];
    const newMedia = existingMedia.filter((_, i)=> i !== index)
    setEventData({
      ...eventData,
      media: newMedia
    })
  }
  return (
    <div>
   <Upload listType="picture-card" beforeUpload={(file) => {
    setSelectedMediaFiles((prev: any) => [...prev, file])
    return false
   }}
   multiple
   showUploadList={false}>
    <span className="text-gray-500 text-xs">
      Click Here to upload 
    </span>
   </Upload>


   <div className="flex flex-wrap gap-5 mt-5">
   {selectedMediaFiles.map((file: any, index: any) => (
    <div  key={file} className="border p-3 border-solid border-gray-200 flex flex-col gap-2">

      <img  src={URL.createObjectURL(file)} alt={file.name} className="w-40 h-40 object-cover" />
      <span className="underline text-sm text-center cursor-pointer" onClick={() => removeMedia(index)}>
        Remove
      </span>
    </div>
   ))}

   </div>

   <div className="flex flex-wrap gap-5 mt-5">
   {eventData?.media?.map((url: any, index: any) => (
    <div  key={url} className="border p-3 border-solid border-gray-200 flex flex-col gap-2">

      <img  src={url} alt="Media" className="w-40 h-40 object-cover" />
      <span className="underline text-sm text-center cursor-pointer" onClick={() => removeUploadedMedia(index)}>
        Remove
      </span>
    </div>
   ))}

   </div>

       <div className="flex justify-between lg:col-span-3">
        <Button onClick={() => setCurrentStep(currentStep - 1)}>Back</Button>
        <Button  type="primary" onClick={() => setCurrentStep(currentStep + 1)}>Next</Button>
      </div>
   </div>
  )
}

export default Media
