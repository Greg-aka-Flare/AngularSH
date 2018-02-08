export interface Rating {
	id?: number;
	rating: number | string;
	title: string;
	comment: string;
	user?: {
		id: number;
		name: string;
		email: string;
		profile_img: string;
	}
}