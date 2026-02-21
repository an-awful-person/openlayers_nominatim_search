export type DjangoListModel<T> = {
    count: number,
    next:string,
    previous:string,
    results: T[]
}