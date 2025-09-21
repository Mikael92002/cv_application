import { useState } from "react";
import "./App.css";

function AddSchoolButton({ handleFunction, disabled }) {
  return (
    <>
      <label htmlFor="school">
        School Name:
        <input
          disabled={disabled}
          type="text"
          name="school"
          id="school"
          onChange={(event) => handleFunction(event, "schoolName")}
        />
      </label>
      <label htmlFor="major">
        Major:
        <input
          disabled={disabled}
          type="text"
          name="major"
          id="major"
          onChange={(event) => handleFunction(event, "major")}
        />
      </label>
      <label htmlFor="study-date">
        Study date:
        <input
          disabled={disabled}
          type="date"
          name="study-date"
          id="study-date"
          onChange={(event) => handleFunction(event, "studyDate")}
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

function LiveResume({ resumeComponents }) {
  return (
    <>
      <h1>{resumeComponents.name}</h1>
      <div>{resumeComponents.email}</div>
      <div>{resumeComponents.number}</div>
      <div>{resumeComponents.schoolName}</div>
      <div>{resumeComponents.major}</div>
      <div>{resumeComponents.studyDate}</div>
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
  const [liveResume, setLiveResume] = useState({});

  // edit button show state is true
  const [editButton, setEditButton] = useState(false);
  const [submitButton, setSubmitButton] = useState(true);

  function handleTyping(event, inputType) {
    const newObject = { ...resumeComponents, [inputType]: event.target.value };
    setResumeComponents(newObject);
  }

  // only available when edit is false:
  function handleLiveResume(event) {
    event.preventDefault();

    setEditButton(true);
    setSubmitButton(false);

    setLiveResume(resumeComponents);
  }

  // only available when submit is false:
  function handleEdit(event) {
    event.preventDefault();

    setEditButton(false);
    setSubmitButton(true);
  }

  return (
    <>
      <h1>Resume Generator</h1>
      <div id="flex-container">
        <div id="container-1">
          <form action="" method="post" onSubmit={handleSubmit}>
            <label htmlFor="name">
              Name:
              <input
                disabled={editButton}
                type="text"
                value={decideValue({
                  resumeComponents: resumeComponents,
                  componentName: "name",
                })}
                name="name"
                id="name"
                maxLength="40"
                onChange={(event) => handleTyping(event, "name")}
              />
            </label>
            <label htmlFor="email">
              Email:
              <input
                disabled={editButton}
                type="email"
                name="email"
                id="email"
                maxLength="256"
                value={decideValue({
                  resumeComponents: resumeComponents,
                  componentName: "email",
                })}
                onChange={(event) => handleTyping(event, "email")}
              />
            </label>
            <label htmlFor="number">
              Phone Number:
              <input
                disabled={editButton}
                type="tel"
                name="number"
                id="number"
                maxLength="10"
                pattern="[0-9]{10}"
                value={decideValue({
                  resumeComponents: resumeComponents,
                  componentName: "number",
                })}
                onChange={(event) => handleTyping(event, "number")}
              />
            </label>
            {/* Static info above */}

            <AddSchoolButton
              handleFunction={handleTyping}
              disabled={editButton}
            />
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
          <LiveResume resumeComponents={liveResume}></LiveResume>
        </div>
      </div>
    </>
  );
}

export default App;
