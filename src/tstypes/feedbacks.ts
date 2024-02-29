export interface IFeedbacks {
    id?: string;
    fullName: string | null;
    imageSrc: string | null;
    message: string | null;
    rating: number;
    createdAt: string;
    key?: string
}
