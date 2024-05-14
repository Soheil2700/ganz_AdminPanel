import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Upload01 } from "@untitled-ui/icons-react";
import { useController } from "react-hook-form";

interface Props {
  id: string;
  label: string;
  control: any;
  name: string;
  error: any;
  required: boolean;
  customOnChange: any;
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

const UploadButton = ({ id, label, name, control, error, required, disabled, customOnChange = () => {}, ...restProps }: Props) => {
  const { field } = useController({
    name,
    control,
    rules: { required },
  });
  return (
    <Button
      className="items-center"
      component="label"
      role={undefined}
      variant="outlined"
      tabIndex={-1}
      startIcon={<Upload01 />}
      disabled={disabled}
    >
      {label}
      <VisuallyHiddenInput
        type="file"
        onChange={(e) => {
          customOnChange(e.target.files);
          field.onChange(e);
        }} // send value to hook form
        onBlur={field.onBlur} // notify when input is touched/blur
        value={field.value || ""} // input value
        name={field.name} // send down the input name
      />
    </Button>
  );
};

export default UploadButton;
