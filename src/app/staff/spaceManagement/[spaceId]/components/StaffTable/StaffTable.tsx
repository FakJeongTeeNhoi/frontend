import { AddOverlay, AddOverlayProps } from "./AddStaffModal";
import { useEffect, useState } from "react";
import { Staff, StaffAccount } from "@/api/user";
import AddButton from "@/components/Common/Buttons/AddButton";
import ColorButton from "@/components/Common/Buttons/ColorButton";
import Table from "@/components/Common/Table/Table";

export default function StaffTable({
  existingStaffs,
}: {
  existingStaffs: StaffAccount[];
}) {
  const [staffs, setStaffs] = useState<StaffAccount[]>([]);
  const [staffsList, setStaffsList] = useState<number[]>([]);

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        setStaffs(existingStaffs);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStaffs();
  }, []);

  // Modal
  const [isAddVisible, setAddVisible] = useState(false);

  // add participant modal
  const AddProps: AddOverlayProps = {
    id: "add-staff",
    onClose: () => setAddVisible(false),
    onConfirm: async (user) => {
      try {
        if (user) {
          setStaffs((prevStaffs) => {
            const staffExists = prevStaffs.some(
              (staff) => staff.ID === user.ID
            );

            if (!staffExists) {
              // Add new staff if they do not exist
              return [
                ...prevStaffs,
                {
                  ID: user.ID,
                  CreatedAt: user.CreatedAt,
                  UpdatedAt: user.UpdatedAt,
                  DeletedAt: user.DeletedAt,
                  email: user.email,
                  password: user.password,
                  name: user.name,
                  faculty: user.faculty,
                  type: user.type,
                  is_verify: user.is_verify,
                },
              ];
            } else {
              console.log("User already added");
              return prevStaffs;
            }
          });

          setStaffsList((prevList) => {
            if (!prevList.includes(user.ID)) {
              return [...prevList, user.ID];
            }
            return prevList;
          });
        }
        console.log(staffs);
        console.log(staffsList);
        setAddVisible(false);
      } catch (error) {
        console.error(error);
      }
    },
  };

  const Remove = (staffId: number) => {
    console.log(`Remove staffId: ${staffId}`);
  };

  const header = ["", "NAME", "DEPARTMENT", "ROLE", ""];
  const rows = (staffs: StaffAccount[]) => {
    return staffs.map((data, index) => (
      <tr key={index} className="border-b border-gray-300">
        <td className="px-4 py-2 text-center font-semibold text-gray-800">
          #{index + 1}
        </td>
        <td className="px-4 py-2 text-center">
          <div className="flex flex-col space-y-2 justify-items-center items-start">
            <div className="font-semibold text-gray-800">{data.name}</div>
            <div className="font-normal text-gray-500">{data.email}</div>
          </div>
        </td>
        <td className="px-4 py-2 text-center text-gray-500">{data.faculty}</td>
        <td className="px-4 py-2 text-center text-gray-500">{data.type}</td>

        <td className="px-6 py-2 text-end">
          <ColorButton
            color="red-400"
            label="Remove"
            onClick={() => {
              Remove(data.ID);
            }}
          />
        </td>
      </tr>
    ));
  };

  return (
    <div className="space-y-6">
      <AddOverlay isVisible={isAddVisible} addProps={AddProps} />
      <AddButton
        heading="List of Staff"
        label="Add Staff"
        onClick={() => setAddVisible(true)}
      />
      <Table headers={header} rows={rows(staffs)} />
    </div>
  );
}
