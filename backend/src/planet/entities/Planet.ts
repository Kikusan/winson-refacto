interface Planet {
    id: number,
    name: string,
    isHabitable: boolean,
    description?: string,
    image: Image
}

interface Image {
    path: string,
    name: string
}
export default Planet;
