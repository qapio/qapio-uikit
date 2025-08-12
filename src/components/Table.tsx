import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {isObservable} from "rxjs";

export function Table2({className, caption, headers, labels, data, valueMap, customColumn: CustomColumn, freezeFirstColumn = false}) {


    if (isObservable(data)) {
        return;
    }
    labels = labels || {};


    if (!data || data.length == 0) {
        console.log("NOT DONE")

        return null;


    }
    if (!headers || headers.length == 0) {
        headers = Object.keys(data[0])
    }
    console.log(data, "DBØØD", headers);

    const showEdit = !!CustomColumn;

    return (
            <Table>
                {caption && <TableCaption>{caption}</TableCaption>}
                <TableHeader className={"sticky top-0 bg-muted dark:bg-zinc-900"}>
                    <TableRow>
                        {(headers).map((t, idx) => {
                            console.log("DH", t)
                            return <TableHead
                                key={idx}
                                className={
                                    freezeFirstColumn && idx === 0
                                        ? "sticky left-0 bg-muted dark:bg-zinc-900"
                                        : ""
                                }
                            >
                                {labels[t] ?? t}
                            </TableHead>
                        })}
                        {showEdit && <TableHead></TableHead>}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((data, idx) => (

                        <TableRow key={idx}>
                            {headers.map((t, idx) => {

                                const m = valueMap && valueMap[t] ? valueMap[t] : ((t) => typeof t == "object" ? JSON.stringify(t) : t);


                                return  <TableCell
                                    key={idx}
                                    className={
                                        freezeFirstColumn && idx === 0
                                            ? "sticky left-0 bg-background dark:bg-zinc-900"
                                            : ""
                                    }                                >
                                    {m(data[t])}
                                </TableCell>
                            })}
                            {showEdit && (
                                <TableCell>
                                    <CustomColumn row={data} index={idx} />
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

    )
}