export interface Course {
	id?: number;	
	group_id: number;
	instructor_id?: number;
	instructor?: any;
	title: string;
	description: string;
	addresses: any[];
	semesters: any[];
	categories: any[];
}