export interface Instructor {
	id: number;	
	user_id: number;
	phone: string;
	details: string;
	name: string;
	email: string;
	dob:string;
	profile_img: string;
	status: string;
	verified: number;
	referred_by: string;
	rating:number;
	ratings:any[];
	addresses: Address[];
}
export interface Address {
    type: string;
	streetAddress: string;
	city: string;
	state: string;
	zip: string;
	country: string;
}