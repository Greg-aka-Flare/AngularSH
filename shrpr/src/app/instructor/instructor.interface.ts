export interface Instructor {
	id: number;	
	user_id: number;
	phone: string;
	details: string;
	name: string;
	email: string;
	dob:string;
	status: string;
	verified: number;
	referred_by: string;
	addresses: any[];
}