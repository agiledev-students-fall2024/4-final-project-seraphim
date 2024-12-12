import React from "react";

function InputField({
  imgSrc = "",
  inputfieldName,
  inputType = "text",
  handleChange,
  inputValue,
  name
}) {

  return (
      <div className="flex flex-col gap-1 w-full p-1.5">
        <label className="text-md text-ebony-700 font-bold">
          {inputfieldName}
        </label>
        {inputfieldName === "Description" ? (
          <textarea
            className="h-48 bg-[#fff] rounded-md px-2 py-1 text-md text-ebony w-full border border-[#ccaaaa] mt-0"
            type={inputType}
            id={inputfieldName}
            onChange={handleChange}
            value={inputValue}
            name={name} 
          ></textarea>
        ): (
          <input
          className="bg-[#fff] rounded-md px-2 py-1 text-md text-ebony w-full border border-[#ccaaaa]"
          type={inputType}
          id={inputfieldName}
          onChange={handleChange}
          value={inputValue}
          name={name} 
        />
        )}
        {/* </div> */}
      </div>
  );
}

export default InputField;
