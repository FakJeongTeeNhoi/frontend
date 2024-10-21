export default function DownloadIcon({width, height, color} : {width: number, height: number, color?:string}) {
  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox="0 0 30 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.7375 11.75H18.75V5.5C18.75 4.8125 18.1875 4.25 17.5 4.25H12.5C11.8125 4.25 11.25 4.8125 11.25 5.5V11.75H9.2625C8.15 11.75 7.5875 13.1 8.375 13.8875L14.1125 19.625C14.6 20.1125 15.3875 20.1125 15.875 19.625L21.6125 13.8875C22.4 13.1 21.85 11.75 20.7375 11.75ZM6.25 24.25C6.25 24.9375 6.8125 25.5 7.5 25.5H22.5C23.1875 25.5 23.75 24.9375 23.75 24.25C23.75 23.5625 23.1875 23 22.5 23H7.5C6.8125 23 6.25 23.5625 6.25 24.25Z"
          fill={color ? color :"white"}
        />
      </svg>
    </>
  );
}
