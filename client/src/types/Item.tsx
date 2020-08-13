import User from './User'

type Item = {
    _id: string,
    title: string,
    details: string,
    category: string,
    images: Array<String>,
    price: number,
    time: number,
    views: number,
    seller: User,
    editable: boolean
}

export default Item