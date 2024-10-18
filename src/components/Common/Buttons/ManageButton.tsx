import SettingIcon from "../Icons/SettingIcon";

export default function ManageButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="w-fit flex flex-row space-x-2 justify-items-center items-center bg-gray-400 hover:bg-gray-500 text-white text-lg font-semibold py-2 px-4 rounded"
      onClick={onClick}
    >
      <SettingIcon width={30} height={30} />
      <div>Manage</div>
    </button>
  );
}
