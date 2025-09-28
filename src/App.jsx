import { useState } from "react";
import "./App.css";
import {PracticalExperience, SchoolSection, ContactInfo} from "./components/components"


function LiveResume({ components }) {
  const resumeComponents = components[0];
  const schoolArray = components[1];
  const companyArray = components[2];
  return (
    <>
      <h1>{resumeComponents.name}</h1>
      <div>{resumeComponents.email}</div>
      <div>{resumeComponents.number}</div>
      {schoolArray.map((school) => {
        return (
          <div key={school.id}>
            <div>{school.schoolName}</div>
            <div>{school.major}</div>
            <div>{school.studyDate}</div>
          </div>
        );
      })}
      {companyArray.map((company) => {
        return (
          <div key={company.id}>
            <h3>{company.companyName}</h3>
            <div>{company.position}</div>
            <div>{company.responsibilities}</div>
            <div>{company.from}</div>
            <div>{company.to}</div>
          </div>
        );
      })}
    </>
  );
}

function addButton(objectType, setFunction) {
  if (objectType === "company") {
    setFunction((prevCompanies) => {
      const newArr = [
        ...prevCompanies,
        {
          id: crypto.randomUUID(),
          companyName: "",
          position: "",
          responsibilities: "",
          from: "",
          to: "",
        },
      ];

      return newArr;
    });
  } else if (objectType === "school") {
    setFunction((prevSchools) => {
      const newSchoolArr = [
        ...prevSchools,
        {
          id: crypto.randomUUID(),
          schoolName: "",
          major: "",
          studyDate: "",
        },
      ];

      return newSchoolArr;
    });
  }
}

function handleSubmit(event) {
  event.preventDefault();
}

function App() {
  const [resumeComponents, setResumeComponents] = useState({});

  const [editButton, setEditButton] = useState(false);
  const [submitButton, setSubmitButton] = useState(true);

  const [schoolArray, setSchoolArray] = useState([
    { id: crypto.randomUUID(), schoolName: "", major: "", studyDate: "" },
  ]);
  const [companyArray, setCompanyArray] = useState([
    {
      id: crypto.randomUUID(),
      companyName: "",
      position: "",
      responsibilities: "",
      from: "",
      to: "",
    },
  ]);
  const [liveResume, setLiveResume] = useState([
    resumeComponents,
    schoolArray,
    companyArray,
  ]);

  function handleTyping(event, inputType) {
    const newObject = { ...resumeComponents, [inputType]: event.target.value };
    setResumeComponents(newObject);
  }

  // only available when edit is false:
  function handleLiveResume(event) {
    event.preventDefault();

    setEditButton(true);
    setSubmitButton(false);

    setLiveResume([resumeComponents, schoolArray, companyArray]);
  }

  // only available when submit is false:
  function handleEdit(event) {
    event.preventDefault();

    setEditButton(false);
    setSubmitButton(true);
  }

  function handleSchoolArray(newSchoolObject) {
    setSchoolArray((prevSchools) => {
      return prevSchools.map((school) => {
        if (school.id === newSchoolObject.id) {
          return newSchoolObject;
        }
        return school;
      });
    });
  }

  function removeFromSchoolArray(id) {
    setSchoolArray((prevSchools) => {
      return prevSchools.filter((school) => {
        return school.id !== id;
      });
    });
  }

  function handleCompanyArray(newCompanyObject) {
    setCompanyArray((prevCompanies) => {
      return prevCompanies.map((company) => {
        return company.id === newCompanyObject.id ? newCompanyObject : company;
      });
    });
  }

  function removeFromCompanyArray(id) {
    setCompanyArray((prevCompanies) => {
      return prevCompanies.filter((company) => {
        return company.id !== id;
      });
    });
  }

  return (
    <>
      <h1>Resume Generator</h1>
      <div id="flex-container">
        <div id="container-1">
          <form action="" method="post" onSubmit={handleSubmit}>
            <ContactInfo
              handleFunction={handleTyping}
              disabled={editButton}
              resumeComponents={resumeComponents}
            ></ContactInfo>
            {/* Static info above */}
            {schoolArray.map((school) => {
              return (
                <SchoolSection
                  disabled={editButton}
                  currSchool={school}
                  handleSchoolArray={handleSchoolArray}
                  key={school.id}
                  removeButton={schoolArray.length >= 2}
                  removeFunction={removeFromSchoolArray}
                ></SchoolSection>
              );
            })}
            {schoolArray.length < 2 && (
              <button onClick={() => addButton("school", setSchoolArray)}>
                Add School Experience
              </button>
            )}
            {companyArray.map((company) => {
              return (
                <PracticalExperience
                  disabled={editButton}
                  handleCompanyArray={handleCompanyArray}
                  currCompany={company}
                  key={company.id}
                  removeButton={companyArray.length >= 2}
                  removeFunction={removeFromCompanyArray}
                ></PracticalExperience>
              );
            })}
            {companyArray.length < 2 && (
              <button onClick={() => addButton("company", setCompanyArray)}>
                Add work experience
              </button>
            )}
            {editButton && (
              <button
                style={{ display: "block" }}
                onClick={(event) => handleEdit(event)}
              >
                Edit
              </button>
            )}
            {submitButton && (
              <button
                style={{ display: "block" }}
                onClick={(event) => handleLiveResume(event)}
              >
                Submit
              </button>
            )}
            {/* Variable info above */}
          </form>
        </div>
        <div id="container-2">
          <LiveResume components={liveResume}></LiveResume>
        </div>
      </div>
    </>
  );
}

export default App;
