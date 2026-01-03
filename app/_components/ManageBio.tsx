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

	function handleBioSubmit(event: React.FormEvent) {
		event.preventDefault();
		// Handle bio submission logic here
		console.log('Bio submitted:', bioInput);
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
							id="bioImgInput"
							name="bioImgInput"
							rows={15}
							value={bioInput.bioInfoInput}
							onChange={handleBioChange}
						/>
					</div>
					<div className="editBioBtns">
						<button type="submit">Edit Bio</button>
						<button onClick={resetBioInput}>Cancel</button>
					</div>
				</form>
			</div>
		</div>
	);
}
