export interface Course {
	id: number;	
	institution_id: number;
	instructor: any;
	title: string;
	description: string;
	rating?: any;
	group: any;
	institution: any;
	categories: any[];
	tags: any[];
	semesters: any[];
	ratings: any[];
}