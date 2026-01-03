export default function ManageBio() {
	return (
		<div className="manageBio dashboardContent">
			<img src="/author.jpg" alt="My photo" />

			<div>
				<h3>Manage your bio and profile picture here.</h3>
				<form action="" className="editBioForm">
					<div className="bioInput bioImgDiv">
						<label htmlFor="bioImgInput">Profile Image URL:</label>
						<input
							type="text"
							id="bioImgInput"
							name="bioImgInput"
						/>
					</div>
					<div className="bioInput bioInfoDiv">
						<label htmlFor="bioInfoInput">Bio Information:</label>
						<textarea
							id="bioImgInput"
							name="bioImgInput"
							rows={15}
						/>
					</div>
				</form>
			</div>
		</div>
	);
}
