interface ResendEmailModalProps {
  onClick: () => void;
}

export default function ResendEmailModal({ onClick }: ResendEmailModalProps) {
  return (
    <div className="mx-auto flex flex-col border border-[#DFE4EA] rounded-lg bg-white w-fit h-fit px-8 py-5 gap-11 text-center">
      <div className="gap-1">
        <h1 className="text-gray-800 font-semibold text-2xl">
          Haven’t receive an email yet ?
        </h1>
        <label className="text-[#8899A8]">
          Click here to request a new verification email
        </label>
      </div>
      <button
        className="mx-auto text-white bg-blue-400 hover:bg-[#60A5FA] font-medium rounded-md h-12 p-2.5 min-w-fit"
        onClick={onClick}
      >
        Resend Verification Email
      </button>
    </div>
  );
}
