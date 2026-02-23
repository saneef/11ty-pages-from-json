import { readFile, readdir } from "node:fs/promises";
import path from "path";

export default async function () {
	const basePath = "./src";
	const allFiles = await readdir(basePath);

	const jsonFiles = allFiles.filter((file) => path.extname(file) === ".json");

	const possums = await Promise.all(
		jsonFiles.map(async (file) => {
			const filePath = path.join(basePath, file);

			const content = await readFile(filePath);

			return JSON.parse(content);
		}),
	);

	return {
		possums,
	};
}
