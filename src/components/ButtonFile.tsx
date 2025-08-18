import React, {
  FunctionComponent,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { IconButton, styled, SvgIconTypeMap } from "@mui/material";
import AttachmentTwoToneIcon from "@mui/icons-material/AttachmentTwoTone";
import { OverridableComponent } from "@mui/material/OverridableComponent";

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
type ButtonFileProps = {
  values?: File[];
  onChange?: (file: File) => void;
  onChangeMultiple?: (files: File[]) => void;
  multiple?: boolean;
  Icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  accept?: string;
  disabled?: boolean;
  renderButton?: ReactNode;
};

/**
 * ButtonFile component
 * @param {Function} onChange - callback function
 * @param {Function} onChangeMultiple - callback function
 * @param {boolean} multiple - multiple files
 * @param {ReactNode} Icon - icon component
 * @param {string} accept - file accept type
 * @param {boolean} disabled - disabled
 * @param {File[]} values - file values
 * @param {ReactNode} renderButton - render button
 * @returns {ReactNode} ButtonFile
 */
const ButtonFile: FunctionComponent<ButtonFileProps> = ({
  values,
  onChange,
  onChangeMultiple,
  Icon,
  accept = ".png, .jpg, .jpeg, .pdf, .doc, .docx, .xls, xlsx, .ppt, .pptx, .txt",
  disabled = false,
  renderButton,
}): ReactNode => {
  const [file, setFile] = useState<readonly string[]>([]);
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;
    const files = Array.from(event.target.files);

    if (!files.length) return;
    if (onChangeMultiple) onChangeMultiple(files);
    else if (onChange) onChange(files[0]);
  };

  useEffect(() => {
    if (values?.length) setFile([]);
  }, [values]);

  return (
    <IconButton aria-label="attachment" component="label">
      {renderButton ? (
        renderButton
      ) : Icon ? (
        <Icon />
      ) : (
        <AttachmentTwoToneIcon style={{ fontSize: "1.25rem" }} />
      )}
      <VisuallyHiddenInput
        disabled={disabled}
        type="file"
        accept={accept}
        multiple={Boolean(onChangeMultiple)}
        value={file}
        onChange={handleFileChange}
      />
    </IconButton>
  );
};

export default ButtonFile;
