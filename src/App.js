import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import enter from "../src/enter.png";

const FormPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showFieldModal, setShowFieldModal] = useState(false);
  const [steps, setSteps] = useState([
    {
      id: 0,
      title: "Welcome to our form",
      description: "This is a description of the form",
      type: "welcome",
      uploadedPhoto: null, // Store image for each step
    },
    {
      id: 1,
      title: "Thank You!",
      description: "You have completed the form",
      type: "end",
      uploadedPhoto: null, // Store image for each step
    },
  ]);

  const [isChecked, setIsChecked] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleStepClick = (stepId) => {
    setCurrentStep(stepId);
    setDrawerOpen(true);
  };

  const handleUpdateStep = (field, value) => {
    const updatedSteps = [...steps];
    updatedSteps[currentStep] = {
      ...updatedSteps[currentStep],
      [field]: value,
    };
    setSteps(updatedSteps);
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleUpdateStep("uploadedPhoto", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoRemove = () => {
    handleUpdateStep("uploadedPhoto", null);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleSave = () => {
    console.log("Form saved:", steps);
  };

  const handlePublish = () => {
    console.log("Form published:", steps);
  };

  const handleCancel = (stepId) => {
    const updatedSteps = steps.filter((step) => step.id !== stepId);
    setSteps(updatedSteps);
    console.log("Changes canceled for step:", stepId);
    if (currentStep >= updatedSteps.length) {
      setCurrentStep(updatedSteps.length - 1);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      <div className="w-[25rem] h-[100vh] bg-white px-5 pt-4 flex flex-col relative">
        <h2 className="text-lg font-semibold mb-4">Steps</h2>
        <p className="text-[12px] text-gray-500 mb-6">
          The steps users will take to complete the form
        </p>
        <ul className="flex-grow">
          {steps.map((step) => (
            <li
              key={step.id}
              className={`px-3 py-3 mb-2 rounded cursor-pointer border text-[12px] hover:bg-gray-100 ${
                currentStep === step.id ? "bg-gray-200" : "bg-white"
              } flex justify-between items-center`}
              onClick={() => handleStepClick(step.id)}
            >
              <span>{step.title}</span>
              <button
                className="text-gray-400 hover:text-gray-300"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCancel(step.id);
                }}
              >
                x
              </button>
            </li>
          ))}
          <button
            className="mt-3 bg-white text-black text-[11px] py-2 px-2 w-[5rem] font-semibold border border-gray-300 rounded-lg hover:bg-gray-100"
            onClick={() => setShowFieldModal(true)}
          >
            + Add field
          </button>
        </ul>

        <div className="mt-auto flex flex-row mb-2">
          <button
            className="bg-black text-white text-[12px] font-semibold py-2 px-3 rounded-lg hover:bg-gray-700 w-full m-2"
            onClick={handleSave}
          >
            Save & Publish
          </button>
          <button
            className="bg-white text-red-500 text-[12px] font-semibold py-2 px-3 rounded-lg hover:bg-red-100 w-full m-2"
            onClick={handlePublish}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="w-full py-2 pr-2 flex justify-between">
        <div className="relative flex justify-start items-center pl-[15rem] h-full overflow-x-hidden transition duration-200 border shadow-xl rounded-2xl border-zinc-200 overflow-y-hidden w-full">
          <div className="flex w-full">
            <div className="flex-1 p-4">
              {steps[currentStep]?.type === "welcome" && (
                <div>
                  <input
                    type="text"
                    className="text-4xl font-bold w-full bg-transparent focus:outline-none"
                    value={steps[currentStep].title}
                    onChange={(e) => handleUpdateStep("title", e.target.value)}
                  />
                  <textarea
                    className="text-lg mt-4 w-full bg-transparent focus:outline-none resize-none"
                    value={steps[currentStep].description}
                    onChange={(e) =>
                      handleUpdateStep("description", e.target.value)
                    }
                  />
                  <div className="flex flex-row items-center">
                    <button className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition">
                      Start
                    </button>
                    <div className="ml-4 flex items-center text-sm">
                      Press
                      <span className="ml-1 font-semibold text-sm items-baseline">
                        Enter <img src={enter} className="w-4 ml-1 inline" />
                      </span>
                    </div>
                  </div>
                </div>
              )}
              {steps[currentStep]?.type === "end" && (
                <div>
                  <input
                    type="text"
                    className="text-4xl font-bold w-full bg-transparent focus:outline-none"
                    value={steps[currentStep].title}
                    onChange={(e) => handleUpdateStep("title", e.target.value)}
                  />
                  <textarea
                    className="text-lg mt-4 w-full bg-transparent focus:outline-none resize-none"
                    value={steps[currentStep].description}
                    onChange={(e) =>
                      handleUpdateStep("description", e.target.value)
                    }
                  />
                </div>
              )}
              {steps[currentStep]?.type === "shortText" && (
                <div>
                  <input
                    type="text"
                    className="text-2xl font-bold w-full bg-transparent focus:outline-none"
                    placeholder="Add question title"
                    value={steps[currentStep].title}
                    onChange={(e) => handleUpdateStep("title", e.target.value)}
                  />
                  <textarea
                    className="text-lg mt-4 w-full bg-transparent focus:outline-none resize-none"
                    placeholder="Add question description (optional)"
                    value={steps[currentStep].description}
                    onChange={(e) =>
                      handleUpdateStep("description", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    className="mt-4 w-full bg-transparent focus:outline-none"
                    placeholder="Type here..."
                    onChange={(e) => {
                      console.log("User input:", e.target.value);
                    }}
                  />
                  <hr className="border-1 border-gray-300 mt-1" />
                </div>
              )}
              {steps[currentStep]?.type === "email" && (
                <div>
                  <input
                    type="text"
                    className="text-2xl font-bold w-full bg-transparent focus:outline-none"
                    placeholder="Email Title"
                    value={steps[currentStep].title}
                    onChange={(e) => handleUpdateStep("title", e.target.value)}
                  />
                  <textarea
                    className="text-lg mt-4 w-full bg-transparent focus:outline-none resize-none"
                    placeholder="Email Description (optional)"
                    value={steps[currentStep].description}
                    onChange={(e) =>
                      handleUpdateStep("description", e.target.value)
                    }
                  />
                  <input
                    type="email"
                    className="mt-4 text-lg w-full bg-transparent focus:outline-none"
                    placeholder="Enter your email"
                    onChange={(e) => {
                      handleUpdateStep("email", e.target.value);
                      validateEmail(e.target.value);
                    }}
                  />
                  <hr className="border-gray-300 mt-1" />
                  {emailError && (
                    <p className="text-red-500 text-sm mt-2">{emailError}</p>
                  )}
                </div>
              )}
            </div>
            <div className="flex-1 p-4 flex justify-center items-center">
              {steps[currentStep]?.uploadedPhoto && (
                <img
                  src={steps[currentStep].uploadedPhoto}
                  alt="Uploaded"
                  className="w-full h-auto max-w-xs object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 w-[19rem] h-full bg-white p-6 transform transition-transform duration-300 ease-in-out ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h3 className="text-lg font-semibold">Settings</h3>
        <div className="mt-4">
          <h2 className="p-1 text-sm font-semibold">Title</h2>
          <input
            type="text"
            placeholder="Title"
            className="px-3 py-3 mb-4 w-full mt-2 rounded cursor-pointer border text-[12px]"
            value={steps[currentStep]?.title || ""}
            onChange={(e) => handleUpdateStep("title", e.target.value)}
          />
          <h2>Description</h2>
          <textarea
            placeholder="Description"
            className="px-3 py-3 mb-2 w-full mt-2 rounded cursor-pointer border text-[12px]"
            value={steps[currentStep]?.description || ""}
            onChange={(e) => handleUpdateStep("description", e.target.value)}
          />
          <div className="flex flex-row justify-between mt-2">
            <label className="block text-gray-600">Required</label>
            <FormControlLabel
              control={
                <Switch
                  checked={isChecked}
                  onChange={handleChange}
                  name="switch"
                  color="primary"
                  sx={{
                    width: 45,
                    height: 35,
                    "& .MuiSwitch-thumb": {
                      width: 15,
                      height: 15,
                    },
                    "& .MuiSwitch-track": {
                      borderRadius: 12,
                    },
                  }}
                />
              }
            />
          </div>
          <div className="mt-4">
            <input type="file" onChange={handlePhotoUpload} className="mb-4" />
            {steps[currentStep]?.uploadedPhoto && (
              <div>
                <img
                  src={steps[currentStep].uploadedPhoto}
                  alt="Uploaded"
                  className="w-32 h-32 object-cover mb-2"
                />
                <button
                  onClick={handlePhotoRemove}
                  className="mt-2 text-red-500"
                >
                  Remove Photo
                </button>
              </div>
            )}
          </div>
          <div className="mt-auto flex flex-row mb-2">
            <button
              className="bg-black text-white text-[12px] font-semibold py-2 px-3 rounded-lg hover:bg-gray-700 w-full ml-2 mr-2 mt-10 "
              onClick={() => setDrawerOpen(false)}
            >
              Save
            </button>
            <button
              className="bg-white text-red-500 text-[12px] font-semibold py-2 px-3 rounded-lg hover:bg-red-100 w-full mr-2 mt-10"
              onClick={() => setDrawerOpen(false)}
            >
              Discard
            </button>
          </div>
        </div>
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={() => setDrawerOpen(false)}
        >
          X
        </button>
      </div>

      {showFieldModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg relative w-1/3">
            <h2 className="text-2xl font-bold mb-6 text-center">Add Field</h2>
            <div className="grid grid-cols-2 gap-6">
              <button
                className="bg-gray-100 p-6 rounded-lg text-center cursor-pointer hover:bg-gray-200 transition duration-150"
                onClick={() => {
                  const newStepId = steps.length;
                  setSteps([
                    ...steps,
                    {
                      id: newStepId,
                      title: "Short Text",
                      type: "shortText",
                      description: "",
                      uploadedPhoto: null, // Initialize photo for new step
                    },
                  ]);
                  setShowFieldModal(false);
                  setCurrentStep(newStepId);
                  setDrawerOpen(true);
                }}
              >
                Short Text
              </button>
              <button
                className="bg-gray-100 p-6 rounded-lg text-center cursor-pointer hover:bg-gray-200 transition duration-150"
                onClick={() => {
                  const newStepId = steps.length;
                  setSteps([
                    ...steps,
                    {
                      id: newStepId,
                      title: "Email",
                      type: "email",
                      description: "",
                      uploadedPhoto: null, // Initialize photo for new step
                    },
                  ]);
                  setShowFieldModal(false);
                  setCurrentStep(newStepId);
                  setDrawerOpen(true);
                }}
              >
                Email
              </button>
            </div>

            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition duration-150"
              onClick={() => setShowFieldModal(false)}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormPage;
