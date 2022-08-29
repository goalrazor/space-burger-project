export type TCard = {
    readonly _id: string;
    readonly name: string;
    readonly type: string;
    readonly proteins: number;
    readonly fat: number;
    readonly carbohydrates: number;
    readonly calories: number;
    readonly price: number;
    readonly image: string;
    readonly image_mobile: string;
    readonly image_large: string;
    ingredientCount: number;
    readonly uuid?: string
};

export type TBackgroundLocation = {
    readonly background: Location
}

export type TOrder = {
    readonly number: number,
    readonly createdAt: string,
    readonly name: string,
    readonly ingredients: ReadonlyArray<string>,
    readonly updatedAt?: string,
    readonly status?: string,
    readonly _id?: string
}
