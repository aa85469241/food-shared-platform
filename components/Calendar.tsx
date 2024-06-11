'use client';

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

type CalenderProps = {
    value: Date | undefined
    onChange: (value: Date | undefined) => void
}

const Calendar = ({
    value,
    onChange
}: CalenderProps) => {

    return (
        <div>
            <DayPicker
                mode="single"
                selected={value}
                onSelect={onChange}
                fromYear={1900}
                toYear={new Date().getFullYear()}
                captionLayout="dropdown-buttons"
            />
        </div>
    );
}

export default Calendar;