export interface Course {
	id: number;	
	title: string;
	instructor:string;
	address: string;
	city: string;
	state: string;
	zip: string;
	semesters: any[];
	categories: any[];
	availability: string;
}