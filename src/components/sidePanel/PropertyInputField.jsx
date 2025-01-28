
function PropertyInputField({ label, type, value, onChange = () => {}, disable }) {
  const inputBg = disable ? " bg-gray-950" : " bg-gray-800";
  return (
    <div className="flex border-t-1 border-neutral-700 pt-1 mt-1 items-center h-7">
      <label className="flex-auto basis-1/3">{label}:</label>
      <input
        className={"flex-auto basis-2/3  rounded-sm pl-1.5 h-full max-w-2/3" + inputBg}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disable}
      />
    </div>
  );
}

export default PropertyInputField;