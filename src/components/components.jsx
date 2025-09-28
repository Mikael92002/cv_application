
export function ContactInfo({ handleFunction, disabled, resumeComponents }) {
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

export function SchoolSection({
  disabled,
  handleSchoolArray,
  currSchool,
  removeButton,
  removeFunction
}) {
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
      {removeButton && <button onClick = {()=>{removeFunction(currSchool.id)}}>Remove School Experience</button>}
    </>
  );
}

export function PracticalExperience({
  handleCompanyArray,
  disabled,
  currCompany,
  removeButton,
  removeFunction,
}) {
  function allChanges(field, value) {
    const updatedObject = {
      ...currCompany,
      [field]: value,
    };

    handleCompanyArray(updatedObject);
  }
  return (
    <>
      <label htmlFor="company-name">
        Company Name:
        <input
          disabled={disabled}
          type="text"
          name="company-name"
          id="company-name"
          value={currCompany.companyName}
          onChange={(event) => allChanges("companyName", event.target.value)}
        />
      </label>
      <label htmlFor="position">
        Position:
        <input
          disabled={disabled}
          type="text"
          name="position"
          id="position"
          value={currCompany.position}
          onChange={(event) => allChanges("position", event.target.value)}
        />
      </label>
      <label htmlFor="responsibilities">
        Responsibilities:
        <textarea
          disabled={disabled}
          name="responsibilities"
          id="responsibilities"
          value={currCompany.responsibilities}
          onChange={(event) =>
            allChanges("responsibilities", event.target.value)
          }
        ></textarea>
      </label>
      <label htmlFor="date-from">
        From:
        <input
          disabled={disabled}
          type="date"
          name="date-from"
          id="date-from"
          value={currCompany.from}
          onChange={(event) => allChanges("from", event.target.value)}
        />
      </label>
      <label htmlFor="date-to">
        To:
        <input
          disabled={disabled}
          type="date"
          name="date-to"
          id="date-to"
          value={currCompany.to}
          onChange={(event) => allChanges("to", event.target.value)}
        />
      </label>
      {removeButton && (
        <button
          onClick={() => {
            removeFunction(currCompany.id);
          }}
        >
          Remove Work Experience
        </button>
      )}
    </>
  );
}

function decideValue({ resumeComponents, componentName }) {
  if (resumeComponents[componentName] === undefined) {
    return "";
  } else return resumeComponents[componentName];
}