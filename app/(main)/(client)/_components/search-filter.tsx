'use client';

import { useCallback, useState, useTransition } from "react";
import qs from "query-string";
import { ListTodoIcon, RefreshCcw, SlidersHorizontalIcon } from "lucide-react";
import { cities } from "@/lib/taiwan-cities";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

type SearchFilterProps = {
    id: string | undefined
}

const SearchFilter = ({ id }: SearchFilterProps) => {
    const router = useRouter();
    const params = useSearchParams();
    const countryParam = params.get('country') ?? "";
    const minPriceParam = Number(params.get('minPrice')) ?? 0;
    const maxPriceParam = Number(params.get('maxPrice')) ?? 0;
    const favoriteParam = params.get('favorite') ? true : false;

    const [isPending, startTransition] = useTransition();
    const [country, setCountry] = useState<string>(countryParam);
    const [minPrice, setMinPrice] = useState<number>(minPriceParam);
    const [maxPrice, setMaxPrice] = useState<number>(maxPriceParam);
    const [isFavorite, setIsFavorite] = useState<boolean>(favoriteParam);

    const onSubmit = useCallback(() => {
        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updateQuery = {
            ...currentQuery,
            country: country ? country : null,
            minPrice: minPrice === 0 ? null : minPrice,
            maxPrice: maxPrice === 0 ? null : maxPrice,
            favorite: isFavorite ? id : null
        }

        const url = qs.stringifyUrl({
            url: "/",
            query: updateQuery
        }, { skipNull: true })

        startTransition(() => {
            router.push(url);
        })

    }, [
        params,
        country,
        minPrice,
        maxPrice,
        router,
        id,
        isFavorite
    ])

    const onCleanFilter = useCallback(() => {
        setCountry("");
        setMinPrice(0);
        setMaxPrice(0);
        setIsFavorite(false);

        if (params) {
            startTransition(() => {
                router.push("/")
            })
        }
    }, [params, router])

    return (
        <div className="w-full h-9 flex items-center gap-x-2 mt-2">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="space-x-2">
                        <Badge>{params.size}</Badge>
                        <div className="font-semibold tracking-wide">
                            Filter
                        </div>
                        <SlidersHorizontalIcon size={18} />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <div className="grid gap-4">
                        <div className="w-full">
                            <h4 className="font-bold text-lg">Filtering</h4>
                            <p className="text-sm text-muted-foreground">
                                Set the query to filter values out.
                            </p>
                        </div>
                        <div className="grid gap-2">
                            <div className="w-full grid grid-cols-3 items-center">
                                <Label className="font-bold">Country:</Label>
                                <Select
                                    value={country}
                                    onValueChange={setCountry}
                                >
                                    <SelectTrigger className="col-span-2">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="h-48">
                                        {cities.map(c => (
                                            <SelectItem
                                                key={c.code}
                                                value={c.name}
                                            >
                                                <p className="font-semibold">
                                                    {c.name}
                                                </p>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="w-full grid grid-cols-3 items-center">
                                <Label className="font-bold">
                                    Price.Range:
                                </Label>
                                <div className="col-span-2 flex items-center gap-1 flex-nowrap font-semibold">
                                    <Input
                                        type="number"
                                        required
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(parseInt(e.target.value))}
                                    />
                                    <div>~</div>
                                    <Input
                                        type="number"
                                        required
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                                    />
                                </div>
                            </div>
                            <div className="w-full flex gap-x-3 border rounded-sm p-2 mt-2">
                                <Checkbox
                                    checked={isFavorite}
                                    onCheckedChange={() => {
                                        setIsFavorite(current => !current)
                                    }}
                                />
                                <div className="flex flex-col gap-y-1">
                                    <Label className="font-bold">
                                        Whether {"it's"} favorite or not?
                                    </Label>
                                    <p className="text-xs font-semibold text-primary/70">If {"it's"} checked, list will only show your favorite maps.</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-end gap-x-2 mt-2">
                            <Button
                                size="sm"
                                variant="outline"
                                disabled={isPending}
                                className="bg-transparent space-x-1 font-semibold"
                                onClick={onCleanFilter}
                            >
                                <p>Clear</p>
                                <RefreshCcw size={15} />
                            </Button>
                            <Button
                                size="sm"
                                disabled={isPending}
                                className="space-x-1 font-semibold"
                                onClick={onSubmit}
                            >
                                <p>Submit</p>
                                <ListTodoIcon size={15} />
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default SearchFilter;