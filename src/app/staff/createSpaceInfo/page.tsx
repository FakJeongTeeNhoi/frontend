"use client"

import NavbarAdmin from '@/components/Staff/NavbarAdmin/NavbarAdmin';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateSpaceForm() {
	const router = useRouter();

	const [form, setForm] = useState({
		name: '',
		type: 'Co-working Space',
		description: '',
		faculty: 'Engineering',
		building: '',
		floor: '',
		latitude: '',
		longitude: '',
		openHour: '',
		closeHour: '',
		openingDays: [] as string[],
		accessList: [] as string[],
	});

	const types = ['Co-working Space', 'Library', 'Laboratory'];
	const faculties = ['Engineering', 'Art', 'Science'];
	const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleCheckboxChange = (name: 'openingDays' | 'accessList', value: string) => {
		setForm((prev) => ({
			...prev,
			[name]: prev[name].includes(value)
				? prev[name].filter((item) => item !== value)
				: [...prev[name], value],
		}));
	};

	return (
		<>
			<NavbarAdmin
				username="test"
				role="test"
				focus="Space Management"
			/>
			<div className="flex flex-col items-center p-6 bg-blue-50 min-h-screen text-black">
			<h2 className="text-5xl font-bold text-center mb-6">Create Space</h2>
				<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">

					<div className="mb-4">
						<label className="block text-sm font-medium">Name</label>
						<input
							type="text"
							name="name"
							value={form.name}
							onChange={handleInputChange}
							className="mt-1 p-2 w-full border rounded"
						/>
					</div>

					<div className="mb-4">
						<label className="block text-sm font-medium">Type</label>
						<select
							name="type"
							value={form.type}
							onChange={handleSelectChange}
							className="mt-1 p-2 w-full border rounded"
						>
							{types.map((type) => (
								<option key={type} value={type}>{type}</option>
							))}
						</select>
					</div>

					<div className="mb-4">
						<label className="block text-sm font-medium">Description</label>
						<textarea
							name="description"
							value={form.description}
							onChange={handleInputChange}
							className="mt-1 p-2 w-full border rounded"
							rows={3}
						/>
					</div>

					<div className="grid grid-cols-2 gap-4 mb-4">
						<div>
							<label className="block text-sm font-medium">Faculty</label>
							<select
								name="faculty"
								value={form.faculty}
								onChange={handleSelectChange}
								className="mt-1 p-2 w-full border rounded"
							>
								{faculties.map((faculty) => (
									<option key={faculty} value={faculty}>{faculty}</option>
								))}
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium">Building</label>
							<input
								type="text"
								name="building"
								value={form.building}
								onChange={handleInputChange}
								className="mt-1 p-2 w-full border rounded"
							/>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4 mb-4">
						<div>
							<label className="block text-sm font-medium">Floor</label>
							<input
								type="text"
								name="floor"
								value={form.floor}
								onChange={handleInputChange}
								className="mt-1 p-2 w-full border rounded"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium">Google Map Location</label>
							<div className="flex space-x-2">
								<input
									type="text"
									name="latitude"
									value={form.latitude}
									onChange={handleInputChange}
									placeholder="Latitude"
									className="mt-1 p-2 border rounded w-1/2"
								/>
								<input
									type="text"
									name="longitude"
									value={form.longitude}
									onChange={handleInputChange}
									placeholder="Longitude"
									className="mt-1 p-2 border rounded w-1/2"
								/>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4 mb-4">
						<div>
							<label className="block text-sm font-medium">Working Hour</label>
							<div className="flex space-x-2">
								<input
									type="time"
									name="openHour"
									value={form.openHour}
									onChange={handleInputChange}
									className="mt-1 p-2 border rounded w-full"
								/>
								<input
									type="time"
									name="closeHour"
									value={form.closeHour}
									onChange={handleInputChange}
									className="mt-1 p-2 border rounded w-full"
								/>
							</div>
						</div>
						<div>
							<label className="block text-sm font-medium">Opening Days</label>
							<div className="flex flex-wrap gap-2 mt-1">
								{days.map((day) => (
									<button
										key={day}
										type="button"
										onClick={() => handleCheckboxChange('openingDays', day)}
										className={`px-3 py-1 border rounded ${form.openingDays.includes(day) ? 'bg-blue-500 text-white' : 'bg-gray-200'
											}`}
									>
										{day}
									</button>
								))}
							</div>
						</div>
					</div>

					<div className="mb-4">
						<label className="block text-sm font-medium">Faculty Access List</label>
						<div className="flex flex-wrap gap-2 mt-1">
							{faculties.map((faculty) => (
								<button
									key={faculty}
									type="button"
									onClick={() => handleCheckboxChange('accessList', faculty)}
									className={`px-3 py-1 border rounded ${form.accessList.includes(faculty) ? 'bg-blue-500 text-white' : 'bg-gray-200'
										}`}
								>
									{faculty}
								</button>
							))}
						</div>
					</div>

					<div className="flex justify-between mt-6">
						<button
							type="button"
							className="px-4 py-2 border rounded bg-gray-300 hover:bg-gray-400"
							onClick={() => window.history.back()}
						>
							Cancel
						</button>
						<Link
							className="px-4 py-2 border rounded bg-gray-300 hover:bg-gray-400"
							href={{
								pathname: '/staff/createSpaceStaff',
								query: form,
							}}
						>
							Next
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}
