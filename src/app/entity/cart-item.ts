import { Books } from './books';
export class CartItem {
    id!: number;
    name!: string;
    image!: string;
    unitPrice!: number;
    quantity!: number;
    constructor(books: Books) {
        this.id = books.bookId;
        this.name = books.title;
        this.image = books.coverImage;
        this.unitPrice = books.price;
        this.quantity = 1;
    }
}
