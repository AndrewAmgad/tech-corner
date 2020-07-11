import User from "./user"

type Item = {
    _id: string,
    title: string,
    details: string,
    category: string,
    images: Array<String>,
    price: number,
    time: number,
    views: number,
    seller: User
}

export default Item