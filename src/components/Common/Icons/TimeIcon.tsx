export default function TimeIcon({width, height, color} : {width: number, height: number, color?:string}) {
  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox="0 0 31 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.5 2.5C22.4037 2.5 28 8.09625 28 15C28 21.9037 22.4037 27.5 15.5 27.5C8.59625 27.5 3 21.9037 3 15C3 8.09625 8.59625 2.5 15.5 2.5ZM15.5 7.5C15.1685 7.5 14.8505 7.6317 14.6161 7.86612C14.3817 8.10054 14.25 8.41848 14.25 8.75V15C14.2501 15.3315 14.3818 15.6494 14.6163 15.8837L18.3663 19.6337C18.602 19.8614 18.9178 19.9874 19.2455 19.9846C19.5732 19.9817 19.8868 19.8503 20.1185 19.6185C20.3503 19.3868 20.4817 19.0732 20.4846 18.7455C20.4874 18.4178 20.3614 18.102 20.1337 17.8663L16.75 14.4825V8.75C16.75 8.41848 16.6183 8.10054 16.3839 7.86612C16.1495 7.6317 15.8315 7.5 15.5 7.5Z"
          fill={color ? color :"white"}
        />
      </svg>
    </>
  );
}