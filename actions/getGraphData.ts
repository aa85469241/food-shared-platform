export type GraphDataProps = {
    name: string,
    total: number
}

export const getGraphData = (values: any[]) => {
    const graphData: GraphDataProps[] = [
        { name: 'Jan', total: 0 },
        { name: 'Fab', total: 0 },
        { name: 'Mar', total: 0 },
        { name: 'Apr', total: 0 },
        { name: 'May', total: 0 },
        { name: 'Jun', total: 0 },
        { name: 'Jul', total: 0 },
        { name: 'Aug', total: 0 },
        { name: 'Sep', total: 0 },
        { name: 'Oct', total: 0 },
        { name: 'Nov', total: 0 },
        { name: 'Dec', total: 0 },
    ]

    for (const value of values) {
        const month = new Date(value.createdAt).getMonth();

        graphData[month].total = graphData[month].total + 1
    }

    return graphData;
}