import React from "react";
export function Radio(props: any) {
  const handleRadioChange = (e: any) => {
    props.setCurrentRadioValue(e.target.value);
  };

  return (
    <>
      <div>
        <input
          id="science"
          name="Science"
          type="radio"
          value="science"
          onChange={handleRadioChange}
          checked={props.currentRadioValue === "science"}
        />
        <label htmlFor="science">Learn Science</label>
      </div>
      <div>
        <input
          id="math"
          name="math"
          type="radio"
          value="math"
          onChange={handleRadioChange}
          checked={props.currentRadioValue === "math"}
        />
        <label htmlFor="math">Learn Mathematics</label>
      </div>
    </>
  );
}
