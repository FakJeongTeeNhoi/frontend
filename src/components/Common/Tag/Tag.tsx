export default function Tag({
  label,
  color,
}: {
  label: string;
  color: string;
}) {
  return (
    <>
      <span
        className={`inline-flex items-center rounded-full ${color} px-2 py-1 font-semibold text-white`}
      >
        {label}
      </span>
    </>
  );
}
