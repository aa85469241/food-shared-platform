'use client';

import { useEffect, useState } from "react";
import { getGraphData } from "@/actions/getGraphData";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type OverviewCardProps = {
    description: string
    data: object[]
    color: string
    amount: number
    icon?: React.ReactElement
}

const OverviewCard = ({
    description,
    data,
    color,
    amount,
    icon
}: OverviewCardProps) => {
    const [mounted, setMounted] = useState(false);
    const graphData = getGraphData(data);
    const thisMonth = new Date().getMonth();

    useEffect(() => {
        setMounted(true);
    }, [])

    if (!mounted) {
        return null;
    }

    return (
        <Card className="w-full flex flex-col justify-between">
            <CardHeader className="pt-3 pb-2 px-3">
                <CardTitle className="flex items-center justify-between">
                    <p className="flex items-center gap-x-1 font-bold text-3xl">
                        {amount}
                        <span className="text-sm">{"("} {graphData[thisMonth].total} in this month {")"}</span>
                    </p>
                    {icon}
                </CardTitle>
                <CardDescription className="text-xs font-semibold tracking-wide">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent className="relative w-full h-32">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                    className="absolute inset-0 px-2"
                >
                    <AreaChart
                        width={500}
                        height={400}
                        data={graphData}
                        margin={{
                            top: 10,
                            right: 10,
                            left: 10,
                            bottom: 10,
                        }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            className="opacity-60"
                        />
                        <XAxis
                            name="name"
                            dataKey="name"
                            className="text-sm font-semibold"
                            hide
                        />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="total"
                            stroke={color}
                            fill={color}
                            dot={{
                                stroke: color,
                                fill: "#ffffff",
                                r: 5,
                            }}
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

export default OverviewCard;