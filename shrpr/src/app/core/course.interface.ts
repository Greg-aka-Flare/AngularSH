export interface Course {
	id?: number;
	institution_id?: number;	
	group_id?: any;
	instructor: any;
	institution?: any;
	title: string;
	description: string;
	semesters: any[];
	categories: any[];
	tags?: any[];
	ratings?: null | number;
}