type User = {
    firstName: string,
    lastName: string,
    name: String,
    email: string,
    city: {name: string, id: number},
    phone: string
};

export default User