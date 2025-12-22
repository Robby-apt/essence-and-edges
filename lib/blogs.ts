import fs from 'fs/promises';
import path from 'path';

export type Category = string; // replace with a union if you have fixed names
export type Blog = {
	id: string;
	title: string;
	date: string;
	readMoreLink?: string;
	img?: string;
	category: Category;
	content?: string;
};

const DATA_PATH = path.join(process.cwd(), 'data', 'blogs.json');

async function readAll(): Promise<Blog[]> {
	try {
		const raw = await fs.readFile(DATA_PATH, 'utf8');
		return JSON.parse(raw || '[]') as Blog[];
	} catch (e) {
		// if file missing, create it
		await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
		await fs.writeFile(DATA_PATH, '[]');
		return [];
	}
}

async function writeAll(items: Blog[]) {
	await fs.writeFile(DATA_PATH, JSON.stringify(items, null, 2), 'utf8');
}

export async function getAllBlogs() {
	return readAll();
}

export async function getBlogById(id: string) {
	const items = await readAll();
	return items.find((b) => b.id === id) ?? null;
}

export async function getBlogsByCategory(category: string) {
	const items = await readAll();
	return items.filter((b) => b.category === category);
}

export async function createBlog(blog: Omit<Blog, 'id'>) {
	const items = await readAll();
	const id = Date.now().toString();
	const newItem: Blog = { id, ...blog };
	items.unshift(newItem);
	await writeAll(items);
	return newItem;
}

export async function updateBlog(id: string, patch: Partial<Blog>) {
	const items = await readAll();
	const idx = items.findIndex((b) => b.id === id);
	if (idx === -1) return null;
	items[idx] = { ...items[idx], ...patch };
	await writeAll(items);
	return items[idx];
}

export async function deleteBlog(id: string) {
	const items = await readAll();
	const filtered = items.filter((b) => b.id !== id);
	await writeAll(filtered);
	return true;
}
