import React from "react";
// Customizable Area Start
import { TextField, TextFieldProps } from "@material-ui/core";
import Cleave from "cleave.js/react";
import { Props as CleaveProps } from "cleave.js/react/props";

interface CleaveInputProps extends CleaveProps {
  inputRef?: (ref: React.RefObject<HTMLInputElement>) => void;
}

const CleaveInput: React.FC<CleaveInputProps> = ({ inputRef, ...rest }) => {
  return <Cleave {...rest} htmlRef={(ref) => inputRef && inputRef(ref)} />;
};

type MaskedInputProps = CleaveProps & TextFieldProps;

const MaskedInput: React.FC<MaskedInputProps> = ({ options, ...rest }) => {
  return (
    <TextField
      InputProps={{
        // @ts-ignore
        inputComponent: CleaveInput,
        inputProps: {
          options,
          "data-testid": rest.name,
        },
      }}
      {...rest}
    />
  );
};

export default MaskedInput;
// Customizable Area Start
