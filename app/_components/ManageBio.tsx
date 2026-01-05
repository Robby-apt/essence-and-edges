'use client';
import { useState, ChangeEvent } from 'react';

export default function ManageBio() {
	const [bioInput, setBioInput] = useState({
		bioImgInput: '',
		bioInfoInput: '',
	});

	function handleBioChange(
		event: ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) {
		let { name, value } = event.target;
		setBioInput((prev) => ({ ...prev, [name]: value }));
	}

	async function handleBioSubmit(event: React.FormEvent) {
		event.preventDefault();

		const res = await fetch('/api/bio', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(bioInput),
		});

		const data = await res.json();
		if (res.ok) alert(data.message);
		else alert('Error: ' + data.error);
	}

	function resetBioInput() {
		setBioInput({
			bioImgInput: '',
			bioInfoInput: '',
		});
	}

	return (
		<div className="manageBio dashboardContent">
			<img src="/author.jpg" alt="My photo" />

			<div>
				<h3>Manage your bio and profile picture here.</h3>
				<form className="editBioForm" onSubmit={handleBioSubmit}>
					<div className="bioInput bioImgDiv">
						<label htmlFor="bioImgInput">Profile Image URL:</label>
						<input
							type="text"
							id="bioImgInput"
							name="bioImgInput"
							value={bioInput.bioImgInput}
							onChange={handleBioChange}
						/>
					</div>
					<div className="bioInput bioInfoDiv">
						<label htmlFor="bioInfoInput">Bio Information:</label>
						<textarea
							id="bioInfoInput"
							name="bioInfoInput"
							rows={15}
							value={bioInput.bioInfoInput}
							onChange={handleBioChange}
						/>
					</div>
					<div className="editBioBtns">
						<button type="submit">Edit Bio</button>
						<button type="reset" onClick={resetBioInput}>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
