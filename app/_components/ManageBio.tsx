'use client';
import { useState, ChangeEvent, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function ManageBio() {
	const [bioText, setBioText] = useState('');
	const [currentImgUrl, setCurrentImgUrl] = useState<string | null>(null);
	const [newImgFile, setNewImgFile] = useState<File | null>(null);

	useEffect(() => {
		async function loadBio() {
			const { data } = await supabase
				.from('bio')
				.select('bio_img, bio_text')
				.single();
			if (data) {
				setBioText(data.bio_text || '');
				setCurrentImgUrl(data.bio_img);
			}
		}
		loadBio();
	}, []);

	function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0] || null;
		setNewImgFile(file);
	}

	function handleTextChange(e: ChangeEvent<HTMLTextAreaElement>) {
		setBioText(e.target.value);
	}

	async function handleBioSubmit(e: React.FormEvent) {
		e.preventDefault();

		let imageUrl = currentImgUrl;

		if (newImgFile) {
			const filePath = `bio/${Date.now()}-${newImgFile.name}`;

			const { data, error } = await supabase.storage
				.from('images')
				.upload(filePath, newImgFile, { upsert: true });

			if (error) return alert(error.message);

			const { data: urlData } = supabase.storage
				.from('images')
				.getPublicUrl(data.path);

			imageUrl = urlData.publicUrl;
		}

		const res = await fetch('/api/bio', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				bio_img: imageUrl,
				bio_text: bioText,
			}),
		});

		if (res.ok) alert('Bio updated');
		else alert('Error saving bio');
	}

	function resetBio() {
		setNewImgFile(null);
	}

	const previewSrc = newImgFile
		? URL.createObjectURL(newImgFile)
		: currentImgUrl || '/author.jpg';

	return (
		<div className="manageBio dashboardContent">
			<img src={previewSrc} alt="My photo" />

			<div>
				<h3>Manage your bio and profile picture here.</h3>

				<form className="editBioForm" onSubmit={handleBioSubmit}>
					<div className="bioInput bioImgDiv">
						<label>Profile Image:</label>
						<input
							type="file"
							accept="image/*"
							onChange={handleFileChange}
						/>
					</div>

					<div className="bioInput bioInfoDiv">
						<label>Bio Information:</label>
						<textarea
							rows={15}
							value={bioText}
							onChange={handleTextChange}
						/>
					</div>

					<div className="editBioBtns">
						<button type="submit">Edit Bio</button>
						<button type="reset" onClick={resetBio}>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
