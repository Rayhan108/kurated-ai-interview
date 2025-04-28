import MyButton from "@/components/shared/common/my-button";
import MySpacer from "@/components/shared/common/my-spacer";
import {
  useEditStoryMutation,
  useGetSpecificSavedStoryQuery,
  useSaveStoryMutation,
} from "@/redux/feature/storybank/storybank-api";
import {
  Button,
  Checkbox,
  Form,
  Input,
  message,
  Modal,
  Progress,
  Typography,
} from "antd";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { PiClockClockwiseBold } from "react-icons/pi";
import Image from "next/image";
import { AllImages } from "@/assets/AllImages";
import { IoIosCheckboxOutline } from "react-icons/io";
import { IoCheckmarkDone } from "react-icons/io5";
import { TbArrowBack } from "react-icons/tb";
import { useRouter } from "next/navigation";

interface IExperience {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}
export const ExperienceModal = ({ data, savedItem, refetch, handleClose }) => {
  const id = data?._id;
  // console.log("data from experience 15", savedItem);
  const [isEditing, setIsEditing] = useState(false);
  const [editedExperience, setEditedExperience] = useState<IExperience>();
  const [currentEmployee, setCurrentEmployee] = useState(false);
  const [isProceesModalOpen, setIsProceesModalOpen] = useState(false);
  const [isUploadMoapOpen, setIsUploadMoaPOpen] = useState(false);
  const [saveStory] = useSaveStoryMutation();
  const { data: specificSavedStory } = useGetSpecificSavedStoryQuery(id);

  const specificSavedStoryData = specificSavedStory?.data?.response?.[0];
  // console.log(
  //   "specificSavedStoryData",
  //   specificSavedStoryData?.story_text?.trim().split("**")
  // );
  // console.log("topic_id:",specificSavedStoryData?.topic_id)
  // console.log("topic_id:",specificSavedStoryData)

  const [editStory] = useEditStoryMutation();

  const [form] = Form.useForm();
  const rawStoryArray =
    specificSavedStoryData?.story_text?.trim().split(/\*\*|\n(?=\w+:)/) || [];

  let storyObject: Partial<
    Record<"headline" | "event" | "action" | "result" | "significance", string>
  > = {};
  for (let i = 0; i < rawStoryArray.length; i++) {
    const key = rawStoryArray[i].trim().replace(":", "");
    const value = rawStoryArray[i + 1]?.trim();
    if (
      ["Headline", "Event", "Action", "Result", "Significance"].includes(key)
    ) {
      storyObject[key.toLowerCase()] = value;
    }
  }

  useEffect(() => {
    if (!specificSavedStoryData?.story_text) return;

    const lines = specificSavedStoryData.story_text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    // console.log("lines", lines);
    const storyMap = {
      developmenttopic: "",
      Headline: "",
      event: "",
      action: "",
      result: "",
      significance: "",
    };

    let currentKey = "";

    lines.forEach((line) => {
      const lowerLine = line.toLowerCase();
      if (
        [
          "Headline:",
          "event:",
          "action:",
          "result:",
          "significance:",
          "development topic:",
        ].includes(lowerLine)
      ) {
        currentKey = lowerLine.replace(":", "").replace(" ", "").toLowerCase();
      } else if (currentKey) {
        storyMap[currentKey] += line + " ";
      }
    });

    // const data = {
    //   developmentTopic:
    //     lines
    //       .find((line) => line.toLowerCase().includes("development topic:"))
    //       ?.replace("development topic:", "")
    //       .trim() || "",
    //   topic:
    //     lines
    //       .find((line) => line.toLowerCase().includes("topic:"))
    //       ?.replace("topic:", "")
    //       .trim() || "",
    //   headline:
    //     lines
    //       .find((line) => line.toLowerCase().includes("headline:"))
    //       ?.replace("headline:", "")
    //       .trim() || "",
    //   event:
    //     lines
    //       .find((line) => line.toLowerCase().includes("event:"))
    //       ?.replace("event:", "")
    //       .trim() || "",
    //   action:
    //     lines
    //       .find((line) => line.toLowerCase().includes("action:"))
    //       ?.replace("action:", "")
    //       .trim() || "",
    //   result:
    //     lines
    //       .find((line) => line.toLowerCase().includes("result:"))
    //       ?.replace("result:", "")
    //       .trim() || "",
    //   significance:
    //     lines
    //       .find((line) => line.toLowerCase().includes("significance:"))
    //       ?.replace("significance:", "")
    //       .trim() || "",
    // };
    // console.log("data", data);

    form.setFieldsValue({
      developmentTopic:
        lines
          .find((line) => line.toLowerCase().includes("development topic:"))
          ?.replace("development topic:", "")
          .trim() || "",
      topic:
        lines
          .find((line) => line.toLowerCase().includes("topic:"))
          ?.replace("topic:", "")
          .trim() || "",
      headline:
        lines
          .find((line) => line.toLowerCase().includes("headline:"))
          ?.replace("headline:", "")
          .trim() || "",
      event:
        lines
          .find((line) => line.toLowerCase().includes("event:"))
          ?.replace("event:", "")
          .trim() || "",
      action:
        lines
          .find((line) => line.toLowerCase().includes("action:"))
          ?.replace("action:", "")
          .trim() || "",
      result:
        lines
          .find((line) => line.toLowerCase().includes("result:"))
          ?.replace("result:", "")
          .trim() || "",
      significance:
        lines
          .find((line) => line.toLowerCase().includes("significance:"))
          ?.replace("significance:", "")
          .trim() || "",
    });
  }, [form, specificSavedStoryData]);

  const storyTextArray =
    specificSavedStoryData?.story_text?.split("**Headline:**");
  const storyHeading = storyTextArray?.[1]?.split("**")?.[0]?.trim();

  const storyText = specificSavedStoryData?.story_text;



  // const onFinish = async (values) => {
  //   console.log("values", values);
  //   try {
  //     const updatedStoryData = {
  //       experience: {
  //         id: data?._id,
  //         title: values.title,
  //         date_start: values.startDate,
  //         date_end: values.endDate,
  //         description: values.description,
  //         company: values.company,
  //         type: data?.experience_info?.type,
  //       },

  //       stories: [
  //         {
  //           current: [
  //             {
  //               storyText: data.story_text,
  //               topic_id: data?.topic_id,
  //             },
  //           ],
  //           removed: [],
  //         },
  //       ],
  //       topic_relevancies: [
  //         {
  //           topic_id: data?.role_topic_relevancy?.[0]?.topic_id,
  //           relevancy: data?.role_topic_relevancy?.[0]?.relevancy,
  //         },
  //       ],
  //     };

  //     // const response = await saveStory(updatedStoryData).unwrap();
  //     const response = await saveStory(updatedStoryData).unwrap();
  //     console.log("Response:", response);

  //     message.success("Story updated successfully");
  //     refetch();
  //     setIsEditing(false);
  //   } catch (error) {
  //     console.error("Failed to update story:", error);
  //     message.error(error?.data?.message || "Failed to update story");
  //   }
  // };
  const onFinish = async (values) => {
    const storyTextString = `
  ### ${values.headline}
  
  **Event:** ${values.event}
  
  **Action:** ${values.action}
  
  **Result:** ${values.result}
  
  **Significance:** ${values.significance}
  `;

    const data = {
      storyHeading: values.headline,
      storyText: storyTextString.trim(), // <-- now it's a single string
      topicId: specificSavedStoryData?.topic_id,
      storyId: specificSavedStoryData?._id,
    };

    console.log("data:", data); // now storyText will be a string
    await editStory(data).unwrap();
    refetch();
    message.success("Story Updated Successfully");
  };

  // const onFinish = async (values) => {
  //   const data = {
  //     storyHeading: values.headline,
  //     storyText: values,
  //     topicId: specificSavedStoryData?.topic_id,
  //     storyId: specificSavedStoryData?._id,
  //   };
  //   console.log("data:", data);
  //   await editStory(data).unwrap();
  //   refetch()
  //   message.success("Story Updated Successfully");
  // };

  // const handleEditStory = async () => {
  //   const data = {
  //     storyHeading: storyHeading,
  //     storyText: storyText,
  //     topicId: specificSavedStoryData?.topic_id,
  //     storyId: specificSavedStoryData?._id,
  //   };
  //   console.log("data:", data);
  //   await editStory(data).unwrap();
  //   message.success("Story Updated Successfully")
  // };

  const hnadleDelete = async () => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "This story will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmResult.isConfirmed) {
      try {
        const data = {
          experience: {
            id: savedItem?._id,
          },
          stories: [
            {
              removed: [id],
            },
          ],
        };

        const response = await saveStory(data).unwrap();
        message.success("Story deleted successfully");
        refetch();
        handleClose();
      } catch (error) {
        message.error(error?.data?.message || "Failed to delete story");
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };

  const handleSubmit = () => {
    handleClose();
  };

  const showProcessModal = () => {
    setIsProceesModalOpen(true);
  };
  const handleCloseProcessModal = () => {
    setIsProceesModalOpen(false);
  };
  const showUploadMoaModal = () => {
    setIsUploadMoaPOpen(true);
  };
  const handleCloseUploadMoaModal = () => {
    setIsUploadMoaPOpen(false);
  };

  const handleBack = () => {
    handleCloseProcessModal();
  };
  const router = useRouter();
  const handleGoToMyInterviewMatrix = () => {
    handleCloseUploadMoaModal();
    handleCloseProcessModal();
    router.push("/storybank/matrix");
  };

  const handleYes = () => {
    handleCloseUploadMoaModal();
    handleCloseProcessModal();
    router.push("/storybank/matrix?modal=true&step=1");
  };

  const sections = data?.story_text?.split("**").filter(Boolean);
  const ownershipPercentage = data?.role_topic_relevancy?.[0]?.relevancy;
  // console.log("ownershipPercentage from experience 120", ownershipPercentage);

  // edit story:

  return (
    <div>
      {!isEditing && (
        <div className="flex flex-col h-[calc(100vh-40px)] md:h-[calc(100vh-100px)] ">
          <div className="flex-1 overflow-y-auto place-content-center py-10">
            <p className="font-semibold text-base absolute top-0 bg-white w-full left-0 py-4 px-6 rounded-lg z-20">
              {savedItem?.type === "EXTRACTED"
                ? "Experience from your Resume"
                : "Experience from Personal Story"}
            </p>

            <div className="px-0 md:px-5 mb-5">
              {sections?.map((section, index) => (
                <p key={index} className="mb-4">
                  {section?.trim()}
                </p>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                className="px-4 py-1 border border-black border-rounded-md my-3 mx-5 flex items-center gap-2 rounded-md"
                onClick={() => {
                  setIsEditing(true);
                  // form.setFieldsValue({});
                }}
              >
                <FiEdit />
                Edit
              </button>
            </div>
            <div className="px-0 md:px-5">
              <div className="space-y-4">
                <div>
                  <div
                    className={`border rounded-md p-4 hover:cursor-pointer  
                           `}
                  >
                    <div className="space-y-2">
                      <p className="font-bold">
                        Your title{" "}
                        <span className="font-normal text-gray-500">
                          {savedItem?.title || "Title not found"}
                        </span>
                      </p>
                      <p className="font-bold">
                        Company{" "}
                        <span className="font-normal text-gray-500">
                          {savedItem.company}
                        </span>
                      </p>
                      <p className="font-bold">
                        Dates of Employment{" "}
                        <span className="font-normal text-gray-500">
                          {savedItem.date_start} - {savedItem.date_end}
                        </span>
                      </p>
                      <div className="md:flex gap-4">
                        <p className="font-bold">Description</p>
                        <p>{savedItem.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* <div className="text-right">
                    <Button
                      type="text"
                      className="px-1"
                      onClick={() => {
                        setIsEditing(true);
                        // setEditedExperience({
                        //   title: data.title,
                        //   company: data.company,
                        //   startDate: data.dates_of_employment.split("-")[0],
                        //   endDate: data.dates_of_employment.split("-")[1],
                        //   description: data.responsibilities.toString(),
                        // });
                      }}
                    >
                      Edit
                    </Button>
                  </div> */}
                </div>
              </div>

              <MySpacer className="h-10" />
              <div className="grid grid-cols-2 md:grid-cols-3 items-center">
                <div className="col-span-1">
                  <Checkbox
                    // name={key}
                    // onChange={handleCheckboxChange}
                    // checked={selectedRelevance.includes(key)}
                    checked
                    className="font-bold font-mulish checked:bg-red-100"
                  >
                    Topic 1
                  </Checkbox>
                </div>
                <div className="colspan-1 md:col-span-2">
                  <Progress
                    percent={ownershipPercentage}
                    status="normal"
                    strokeColor={"#EAB030"}
                    // strokeColor={
                    //   relevance[key] < 80
                    //     ? relevance[key] < 50
                    //       ? "red"
                    //       : "#EAB030"
                    //     : "green"
                    // }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="border-t py-3 w-full bg-white">
            <div className="flex justify-between gap-1">
              <MyButton
                onClick={hnadleDelete}
                // onClick={() => {
                //   setIsEditing(false);
                //   setEditedExperience(null);
                // }}
                variant="ghost"
                className="text-red-500 hover:text-red-500 border border-red-500 flex items-center gap-2"
              >
                <FaRegTrashAlt />
                Delete story
              </MyButton>
              <Form.Item label={null} className="m-0">
                <MyButton
                  onClick={handleSubmit}
                  // onClick={() => {
                  //   // setIsEditing(false);
                  // }}
                  variant="outline"
                  startIcon={<Save />}
                  className="border-black "
                >
                  Save Story
                </MyButton>
              </Form.Item>
            </div>
          </div>
        </div>
      )}

      {isEditing && (
        <Form
          name="edit-story"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={{
            developmentTopic: specificSavedStoryData?.development_topic || "",
            topic: specificSavedStoryData?.topic_name || "",
            headline: storyObject?.headline,
            event: storyObject?.event,
            action: storyObject?.action,
            result: storyObject?.result,
            significance: storyObject?.significance,
          }}
          className="font-mulish"
        >
          <div className="flex flex-col h-[calc(100vh-40px)] md:h-[calc(100vh-100px)]">
            <div className="flex-1 overflow-y-auto py-10">
              <p className="font-semibold text-base absolute top-0 bg-white w-full left-0 py-4 px-6 rounded-lg z-20">
                Edit Story
              </p>
              <div className="space-y-2 px-2 border border-neutral-800 rounded-md p-10 mt-5">
                <div>
                  <Typography.Title level={5} className="font-mulish">
                    Predictive Topic
                  </Typography.Title>
                  <Form.Item
                    name="topic"
                    initialValue={specificSavedStoryData?.development_topic}
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Please input predictive topic",
                    //   },
                    // ]}
                    className="m-0"
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div>
                  <Typography.Title level={5} className="font-mulish">
                    Headline:
                  </Typography.Title>
                  <Form.Item
                    name="headline"
                    initialValue={storyObject?.headline}
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Please input your headline",
                    //   },
                    // ]}
                    className="m-0"
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div>
                  <Typography.Title level={5} className="font-mulish">
                    Event:
                  </Typography.Title>
                  <Form.Item
                    name="event"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Please input your Event",
                    //   },
                    // ]}
                    className="m-0"
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div>
                  <Typography.Title level={5} className="font-mulish">
                    Action:
                  </Typography.Title>
                  <Form.Item
                    name="action"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Please input your Action",
                    //   },
                    // ]}
                    className="m-0"
                  >
                    <Input.TextArea rows={2} />
                  </Form.Item>
                </div>
                <div>
                  <Typography.Title level={5} className="font-mulish">
                    Result:
                  </Typography.Title>
                  <Form.Item name="result" className="m-0">
                    <Input.TextArea rows={2} />
                  </Form.Item>
                </div>
                <div>
                  <Typography.Title level={5} className="font-mulish">
                    Significance::
                  </Typography.Title>
                  <Form.Item name="significance" className="m-0">
                    <Input.TextArea rows={4} />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div className="border-t py-3 w-full bg-white">
              <div className="flex justify-between gap-1">
                <MyButton
                  onClick={() => {
                    setIsEditing(false);
                    setEditedExperience(null);
                  }}
                  variant="ghost"
                  className="text-red-500 hover:text-red-500 border border-red-500 rounded-md"
                >
                  Discard
                </MyButton>
                <Form.Item label={null} className="m-0">
                  <div>
                    <MyButton
                      onClick={showProcessModal}
                      variant="outline"
                      className="border-black"
                    >
                      <PiClockClockwiseBold />
                      Update Story
                    </MyButton>
                  </div>
                </Form.Item>
              </div>
            </div>
          </div>
        </Form>
      )}

      {/* process modal */}
      <Modal
        open={isProceesModalOpen}
        onClose={handleCloseProcessModal}
        onCancel={handleCloseProcessModal}
        footer={null}
        width={800}
      >
        <div className="flex flex-col">
          <div className="flex-1py-10">
            <h1 className="text-xl font-semibold text-center my-10">
              Your story will be updated
            </h1>
            <p className="text-center my-10">
              You've made changes to the existing story. Please review the
              entire story before saving your changes.
            </p>
            <div className="flex flex-col justify-center items-center my-12">
              <Image
                src={AllImages.frame}
                alt="success"
                height={200}
                width={200}
              ></Image>
              <p className="pt-12">Do you want to proceed?</p>
            </div>
            <div className="flex gap-2 mt-10 justify-between items-center">
              <button
                onClick={handleBack}
                className="border border-black py-2 px-4 rounded flex justify-center items-center gap-2"
              >
                <TbArrowBack />
                Back
              </button>
              <button
                onClick={showUploadMoaModal}
                className="border border-green-500 text-green-500 py-2 px-10 rounded"
              >
                <div
                  // onClick={handleEditStory}
                  className=" flex justify-center items-center gap-2"
                >
                  <IoCheckmarkDone />
                  Yes
                </div>
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* FInish Modal */}
      <Modal
        open={isUploadMoapOpen}
        onClose={handleCloseUploadMoaModal}
        onCancel={handleCloseUploadMoaModal}
        footer={null}
        width={800}
      >
        <div className="flex flex-col">
          <div className="flex-1py-10">
            <h1 className="text-xl font-semibold text-center my-10">
              Your story has been successfully updated !
            </h1>
            <div className="flex flex-col justify-center items-center my-16">
              <Image
                src={AllImages.check}
                alt="success"
                height={100}
                width={100}
              ></Image>
              <p className="pt-12">Do you want to create more stories?</p>
              <div className="flex gap-2 mt-10 justify-center items-center">
                <button
                  onClick={handleGoToMyInterviewMatrix}
                  className="border border-black py-2 px-4 rounded flex justify-center items-center gap-2"
                >
                  <IoIosCheckboxOutline />
                  No, go to my Interview Matrix
                </button>
                <button
                  onClick={handleYes}
                  className="border border-green-500 text-green-500 py-2 px-10 rounded flex justify-center items-center gap-2"
                >
                  <IoCheckmarkDone />
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
