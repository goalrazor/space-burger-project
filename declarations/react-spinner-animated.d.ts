declare module 'react-spinner-animated';

interface IHalfMalfProps {
    text: string
    bgColor: string
    center: boolean
    width: string
    height: string
}

declare function HalfMalf(props: IHalfMalfProps): HTMLDivElement
