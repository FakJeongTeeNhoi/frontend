import Link from "next/link";
import React from "react";
import HomeIcon from "../Icons/HomeIcon";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <div className="flex flex-row space-x-4 justify-items-center">
        <HomeIcon width={30} height={30} />
        <ol className="flex space-x-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              <Link href={item.href} passHref>
                <span
                  className={`text-2xl font-semibold ${
                    index == 0 ? "text-gray-800" : "text-gray-400"
                  } hover:underline cursor-pointer`}
                >
                  {item.label}
                </span>
              </Link>
              {index < items.length - 1 && <span className="mx-2">/</span>}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
