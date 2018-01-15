export interface User {
	id: number;
	name: string;	
	email: string;
	google_id?: string;
	facebook_id?: string;
	linkedin_id?: string;
	dob: string;
	status: string;
	verified: number;
	roles: string[];
	institution?: any;
	instructor?: any;
	student?: any;
}