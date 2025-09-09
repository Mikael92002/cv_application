import { useState } from "react";
import "./App.css";

function AddSchoolButton() {
  return (
    <>
      <label htmlFor="school">
        School Name:
        <input type="text" name="school" id="school" />
      </label>
      <label htmlFor="major">
        Major:
        <input type="text" name="major" id="major" />
      </label>
      <label htmlFor="study-date">
        Study date:
        <input type="date" name="study-date" id="study-date" />
      </label>
    </>
  );
}

function PracticalExperience(){
  return(
    <>
    <label htmlFor="Company Name">
      Company Name:
      <input type="text" name="company-name" id="company-name" />
    </label>
    <label htmlFor="position">
      Position:
      <input type="text" name="position" id="position" />
    </label>
    <label htmlFor="responsibilities">
      Responsibilities:
      <textarea name="responsibilities" id="responsibilities"></textarea>
    </label>
    <label htmlFor="date-from">
      From:
      <input type="date" name="date-from" id="date-from" />
    </label>
    <label htmlFor="date-to">
      To:
      <input type="date" name="date-to" id="date-to" />
    </label>
    </>
  )
}

function handleSubmit(event) {
  event.preventDefault();
}

function App() {

  // function handleAddSchools(e) {
  //   e.preventDefault();
  //   setSchools((schools) => {
  //     let schoolsCopy = [...schools];
  //     schoolsCopy.push({});
  //     return schoolsCopy;
  //   });
  // }
  // same as above:
  // function handleAddSchool(e) {
  //   e.preventDefault();
  //   setSchools([...schools, {}]);
  // }

  return (
    <>
      <h1>Resume Generator</h1>
      <form action="" method="post" onSubmit={handleSubmit}>
        <div id="all-sections">
          <label htmlFor="name">
            Name:
            <input type="text" name="name" id="name" />
          </label>
          <label htmlFor="email">
            Email:
            <input type="email" name="email" id="email" />
          </label>
          <label htmlFor="number">
            Phone Number:
            <input type="number" name="number" id="number" />
          </label>
          {/* Static info above */}
            <AddSchoolButton/>
            <PracticalExperience></PracticalExperience>
          

          {/* Variable info above, need buttons to add sections */}
        </div>
      </form>
    </>
  );
}

export default App;
