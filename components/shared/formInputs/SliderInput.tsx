import { useController } from "react-hook-form";
import { FormControl, FormHelperText, Typography } from "@mui/material";
import Slider from "@mui/material/Slider";

interface Props {
  control: any;
  name: string;
  error: any;
  required: boolean;
  label: string;
  options: any[];
  optionKey: string;
  optionLabel: string;
  onChange: any;
  multiple: boolean;
  disabled: boolean;
  restProps: any;
}

function valuetext(value: number) {
  return `${value}°C`;
}

const SliderInput = ({ label, control, name, error, required = false, disabled }: Props) => {
  const { field } = useController({
    name,
    control,
    rules: { required },
  });
  return (
    <>
      <Typography gutterBottom>{label}</Typography>
      <Slider
        aria-label="Temperature"
        defaultValue={50}
        getAriaValueText={valuetext}
        shiftStep={30}
        step={10}
        marks
        min={10}
        max={100}
        valueLabelDisplay="on"
        name={field.name}
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        disabled={disabled}
      />
      <FormHelperText>{error?.type === "required" && "این فیلد اجباری است!"}</FormHelperText>
    </>
  );
};

export default SliderInput;
