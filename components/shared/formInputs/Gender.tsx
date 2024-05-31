import { Box, FormHelperText, InputLabel, Typography } from "@mui/material";
import Image from "next/image";
import male from "@/assets/images/aghaiii.png";
import female from "@/assets/images/khanomiii.png";
import { useController } from "react-hook-form";

interface Props {
  control: any;
  name: string;
  error: any;
  required?: boolean;
  onChange?: any;
  disabled?: boolean;
  restProps: any;
  setValue: any;
  label: string;
}

const Gender = ({ name, control, required, setValue, error, label }: Props) => {
  const { field } = useController({
    name,
    control,
    rules: { required },
  });
  return (
    <div className="flex flex-col gap-2">
      <InputLabel id="demo-simple-select-label">
        {label}
        {required && <span className="!text-red-600">*</span>}
      </InputLabel>
      <Box sx={{ display: "flex", gap: "16px" }}>
        <div
          className={`flex flex-col justify-center items-center py-2 px-5 rounded-xl gap-1 cursor-pointer border border-[#E2E3E4] transition-all ${
            field.value === "FEMALE" && "!bg-[#DFDEFC] !border-[#0E0CA1]"
          }`}
          onClick={() => setValue(name, "FEMALE")}
          onBlur={field.onBlur}
        >
          <Image className="object-cover" alt="female" src={female} width={104} height={104} />
          <Typography className={`text-xs font-medium ${field.value === "FEMALE" && "text-[#0E0CA1]"}`}>خانم</Typography>
        </div>
        <div
          className={`flex flex-col justify-center items-center py-2 px-5 rounded-xl gap-1 cursor-pointer border border-[#E2E3E4] transition-all ${
            field.value === "MALE" && "!bg-[#DFDEFC] !border-[#0E0CA1]"
          }`}
          onClick={() => setValue(name, "MALE")}
          onBlur={field.onBlur}
        >
          <Image className="object-cover" alt="male" src={male} width={104} height={104} />
          <Typography className={`text-xs font-medium ${field.value === "MALE" && "text-[#0E0CA1]"}`}>آقا</Typography>
        </div>
      </Box>
      <FormHelperText className="!text-red-600">{error?.type === "required" && "این فیلد اجباری است!"}</FormHelperText>
    </div>
  );
};

export default Gender;
