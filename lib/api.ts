export class ApiError extends Error {
	constructor(url: string, public status: number) {
		super(`'${url}' returned ${status}`);
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ApiError);
		}
		this.name = 'ApiError';
	}
}

export async function fetchJson(url: string): Promise<any> {
	const res = await fetch(url);
	if (!res.ok) throw new ApiError(url, res.status);
	return res.json();
}