import General from "./General"
import LocationDate from "./LocationDate"
import Tickets from "./Tickets"
import Media from "./Media"
import { Form, Steps, message} from "antd"
import { useState } from "react"
import { uploadFileAndReturnUrl } from "../../../../../../api/storageService"
import { createEvent, updateEvent } from "../../../../../../api/eventsService"
import { useNavigate, useParams } from "react-router-dom"

export interface EventFormStepProps {
    eventData: any;
    setEventData: any;
    setCurrentStep: any;
    currentStep: any;
    selectedMediaFiles? :any;
    setSelectedMediaFiles? :any;
    loading? :boolean;
    onFinish? :any;
}
function EventForm( {initialData={}, type="create"} : {initialData?: any, type?: "create" | "edit"}) {
    const [currentStep, setCurrentStep] = useState(0);
    const [eventData, setEventData] = useState<any>(initialData);
    const [selectedMediaFiles, setSelectedMediaFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const params: any= useParams();
    const navigate = useNavigate();

    
    const onFinish = async () => {
        try {
            setLoading(true);
            const [...urls] = await Promise.all(selectedMediaFiles.map((file: any) => uploadFileAndReturnUrl(file)));
            eventData.media = [...eventData?.media || [], ...urls]
            if(type === "edit") {
                await updateEvent(params.id, eventData)
                message.success("Event updated successfully")
            }
            else {
                await createEvent(eventData);
                message.success("Event created successfully");
            }
            navigate("/admin/events")
        } catch (error: any) {
            message.error(error.message)
            
        }
        finally {
            setLoading(false);
        }
    }

    const commonProps = {
        eventData,
        setEventData,
        setCurrentStep,
        currentStep,
        selectedMediaFiles,
        setSelectedMediaFiles,
        loading,
        onFinish,
    }
    const stepsData = [
        {
            name: "General",
            component: <General  {...commonProps}/>
        },
        {
            name: "Location & Date",
            component: <LocationDate  {...commonProps}/>
        },
         {
            name: "Media",
            component: <Media {...commonProps}/>
        },
        {
            name: "Tickets",
            component: <Tickets {...commonProps}/>
        },
       

    ]

   
  return (
    <Form layout="vertical">
        <Steps current={currentStep} onChange={(step) => setCurrentStep(step)}> {stepsData.map((step, index) => (<Steps.Step key={index}  disabled={index > currentStep} title={step.name} />))} </Steps>
     
        <div className="mt-5">    {stepsData[currentStep].component}</div>
    </Form>
  )
}

export default EventForm
