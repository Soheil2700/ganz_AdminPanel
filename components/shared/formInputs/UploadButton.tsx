import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Trash01, Upload01 } from "@untitled-ui/icons-react";
import { useController } from "react-hook-form";
import { FormHelperText } from "@mui/material";

interface Props {
  id: string;
  label: string;
  control: any;
  name: string;
  error: any;
  required: boolean;
  onChange: any;
  disabled: boolean;
  restProps: any;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const UploadButton = ({ id, label, name, control, error, required, disabled, onChange = () => {}, ...restProps }: Props) => {
  const { field } = useController({
    name,
    control,
    rules: { required },
  });

  return (
    <>
      <Button
        className="items-center"
        component="label"
        role={undefined}
        variant="outlined"
        tabIndex={-1}
        startIcon={<Upload01 />}
        endIcon={
          field.value && (
            <Trash01
              onClick={(e) => {
                e.preventDefault();
                onChange("");
                field.onChange("");
              }}
            />
          )
        }
        disabled={disabled}
        fullWidth
      >
        {field.value?.split("\\").pop() || label}
        {required && <span className="!text-red-600">*</span>}
        <VisuallyHiddenInput
          type="file"
          onChange={(e) => {
            onChange(e.target.files);
            field.onChange(e);
          }} // send value to hook form
          onBlur={field.onBlur} // notify when input is touched/blur
          value={field.value || ""} // input value
          name={field.name} // send down the input name
        />
      </Button>
      <FormHelperText className="!text-red-600">{error?.type === "required" && "این فیلد اجباری است!"}</FormHelperText>
    </>
  );
};

export default UploadButton;
