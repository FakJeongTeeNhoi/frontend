import UserIcon from "@/components/Common/Icons/UserIcon";

export function CreateNewStaffButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="w-fit flex flex-row space-x-2 justify-items-center items-center bg-blue-400 hover:bg-blue-500 text-white text-lg font-semibold py-2 px-4 rounded"
      onClick={onClick}
    >
      <UserIcon width={30} height={30} />
      <div>Create New Staff</div>
    </button>
  );
}