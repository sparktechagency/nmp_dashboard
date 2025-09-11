/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { DatePicker } from "antd";
import { Controller } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";

type TProps = {
    label: string;
    name: string;
    control: any;
    placeholder?: string;
    disabled?: boolean;
};

const CustomDateTimePicker = ({
    label,
    name,
    control,
    placeholder = "Select",
    disabled = false
}: TProps) => {

    return (
        <>
            <div>
                <label
                    htmlFor={name}
                    className="block text-md font-medium text-gray-700 mb-1"
                >
                    {label}
                </label>
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { value, onChange, ...rest }, fieldState: { error } }) => (
                        <>
                            <DatePicker
                                showTime
                                {...rest}
                                value={value ? dayjs(value) : null}
                                placeholder={placeholder}
                                style={{ width: "100%",}} 
                                className="custom-select-padding"
                                disabled={disabled}
                                onChange={(date: Dayjs | null) => {
                                    onChange(date ? date.format("YYYY-MM-DDTHH:mm:ss") : null);
                                }}
                            />
                            {error && (
                                <p className="text-red-600 text-sm mt-1">{error.message}</p>
                            )}
                        </>
                    )}
                />
            </div>
        </>
    );
};

export default CustomDateTimePicker;
