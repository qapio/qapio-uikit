import * as React from "react";
import {DatePicker} from "./DatePicker";

export const DualDatePicker = ({from, to, onChange, fromLabel, toLabel}) => {

    const [fromDate, setFromDate] = React.useState(from);
    const [toDate, setToDate] = React.useState(to);

    React.useEffect(() => {
        if (fromDate && toDate) {
            onChange({from: fromDate, to: toDate})
        }
    }, [fromDate, toDate])
    return (
        <div className={"flex flex-col sm:flex-row gap-4"}>
            <DatePicker
                label={fromLabel}
                defaultDate={from}
                onSelect={(t) => {
                    setFromDate(t)
                }}
            />
            <DatePicker
                label={toLabel}
                defaultDate={to}
                onSelect={(t) => {
                    setToDate(t)
                }}
            />
        </div>
    )
}