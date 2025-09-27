import { useState } from "react";
import "./App.css";

function ContactInfo({ handleFunction, disabled, resumeComponents }) {
  return (
    <>
      <label htmlFor="name">
        Name:
        <input
          disabled={disabled}
          type="text"
          value={decideValue({
            resumeComponents: resumeComponents,
            componentName: "name",
          })}
          name="name"
          id="name"
          maxLength="40"
          onChange={(event) => handleFunction(event, "name")}
        />
      </label>
      <label htmlFor="email">
        Email:
        <input
          disabled={disabled}
          type="email"
          name="email"
          id="email"
          maxLength="256"
          value={decideValue({
            resumeComponents: resumeComponents,
            componentName: "email",
          })}
          onChange={(event) => handleFunction(event, "email")}
        />
      </label>
      <label htmlFor="number">
        Phone Number:
        <input
          disabled={disabled}
          type="tel"
          name="number"
          id="number"
          maxLength="10"
          pattern="[0-9]{10}"
          value={decideValue({
            resumeComponents: resumeComponents,
            componentName: "number",
          })}
          onChange={(event) => handleFunction(event, "number")}
        />
      </label>
    </>
  );
}

function SchoolSection({ disabled, handleSchoolArray, currSchool }) {
  function allChanges(field, value) {
    const updatedSchool = {
      ...currSchool,
      [field]: value,
    };
    handleSchoolArray(updatedSchool);
  }

  return (
    <>
      <label>
        School Name:
        <input
          disabled={disabled}
          type="text"
          name="school"
          className="school"
          value={currSchool.schoolName}
          onChange={(event) => allChanges("schoolName", event.target.value)}
        />
      </label>
      <label>
        Major:
        <input
          disabled={disabled}
          type="text"
          name="major"
          className="major"
          value={currSchool.major}
          onChange={(event) => allChanges("major", event.target.value)}
        />
      </label>
      <label>
        Study date:
        <input
          disabled={disabled}
          type="date"
          name="study-date"
          className="study-date"
          onChange={(event) => allChanges("studyDate", event.target.value)}
        />
      </label>
    </>
  );
}

function PracticalExperience({ handleFunction, disabled }) {
  return (
    <>
      <label htmlFor="company-name">
        Company Name:
        <input
          disabled={disabled}
          type="text"
          name="company-name"
          id="company-name"
          onChange={(event) => handleFunction(event, "companyName")}
        />
      </label>
      <label htmlFor="position">
        Position:
        <input
          disabled={disabled}
          type="text"
          name="position"
          id="position"
          onChange={(event) => handleFunction(event, "position")}
        />
      </label>
      <label htmlFor="responsibilities">
        Responsibilities:
        <textarea
          disabled={disabled}
          name="responsibilities"
          id="responsibilities"
          onChange={(event) => handleFunction(event, "responsibilities")}
        ></textarea>
      </label>
      <label htmlFor="date-from">
        From:
        <input
          disabled={disabled}
          type="date"
          name="date-from"
          id="date-from"
          onChange={(event) => handleFunction(event, "from")}
        />
      </label>
      <label htmlFor="date-to">
        To:
        <input
          disabled={disabled}
          type="date"
          name="date-to"
          id="date-to"
          onChange={(event) => handleFunction(event, "to")}
        />
      </label>
    </>
  );
}

function LiveResume({ components }) {
  const resumeComponents = components[0];
  const schoolArray = components[1];
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
      <h3>{resumeComponents.companyName}</h3>
      <div>{resumeComponents.position}</div>
      <div>{resumeComponents.responsibilities}</div>
      <div>{resumeComponents.from}</div>
      <div>{resumeComponents.to}</div>
    </>
  );
}

function handleSubmit(event) {
  event.preventDefault();
}

function decideValue({ resumeComponents, componentName }) {
  if (resumeComponents[componentName] === undefined) {
    return "";
  } else return resumeComponents[componentName];
}

function App() {
  const [resumeComponents, setResumeComponents] = useState({});

  const [editButton, setEditButton] = useState(false);
  const [submitButton, setSubmitButton] = useState(true);

  const [schoolArray, setSchoolArray] = useState([
    { id: crypto.randomUUID(), schoolName: "", major: "", studyDate: "" },
  ]);
  const [liveResume, setLiveResume] = useState([resumeComponents, schoolArray]);

  function handleTyping(event, inputType) {
    const newObject = { ...resumeComponents, [inputType]: event.target.value };
    setResumeComponents(newObject);
  }

  // only available when edit is false:
  function handleLiveResume(event) {
    event.preventDefault();

    setEditButton(true);
    setSubmitButton(false);

    setLiveResume([resumeComponents, schoolArray]);
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
                ></SchoolSection>
              );
            })}
            <button
              onClick={() => {
                if (schoolArray.length < 2) {
                  setSchoolArray((prevSchools) => {
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
              }}
            >
              Add School Experience
            </button>
            <PracticalExperience
              handleFunction={handleTyping}
              disabled={editButton}
            ></PracticalExperience>
            {editButton && (
              <button onClick={(event) => handleEdit(event)}>Edit</button>
            )}
            {submitButton && (
              <button onClick={(event) => handleLiveResume(event)}>
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
