export interface Course {
	id?: number;	
	group_id: number;
	instructor: any;
	title: string;
	description: string;
	semesters: any[];
	categories: any[];
}