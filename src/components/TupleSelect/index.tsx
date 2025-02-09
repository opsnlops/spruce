import { useState } from "react";
import styled from "@emotion/styled";
import IconButton from "@leafygreen-ui/icon-button";
import { palette } from "@leafygreen-ui/palette";
import { Select, Option } from "@leafygreen-ui/select";
import { Label } from "@leafygreen-ui/typography";
import Icon from "components/Icon";
import IconTooltip from "components/IconTooltip";
import TextInput from "components/TextInputWithGlyph";
import { size } from "constants/tokens";

const { yellow } = palette;
type option = {
  value: string;
  displayName: string;
  placeHolderText: string;
};

interface TupleSelectProps {
  options: option[];
  onSubmit?: ({ category, value }: { category: string; value: string }) => void;
  validator?: (value: string) => boolean;
  validatorErrorMessage?: string;
  label?: React.ReactNode;
}
const TupleSelect: React.VFC<TupleSelectProps> = ({
  options,
  onSubmit = () => {},
  validator = () => true,
  validatorErrorMessage = "Invalid Input",
  label,
}) => {
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState(options[0].value);
  const isValid = validator(input);

  const handleOnSubmit = () => {
    if (isValid) {
      onSubmit({ category: selected, value: input });
      setInput("");
    }
  };

  const handleOnChange = (value: string) => {
    setInput(value);
  };
  const selectedOption = options.find((o) => o.value === selected);

  return (
    <Container>
      <Label htmlFor="filter-input">
        <LabelContainer>{label}</LabelContainer>
      </Label>
      <InputGroup>
        <GroupedSelect
          value={selected}
          onChange={(v) => setSelected(v)}
          data-cy="tuple-select-dropdown"
          aria-labelledby="Tuple Select"
          allowDeselect={false}
        >
          {options.map((o) => (
            <Option
              key={o.value}
              value={o.value}
              data-cy={`tuple-select-option-${o.value}`}
            >
              {o.displayName}
            </Option>
          ))}
        </GroupedSelect>
        <GroupedTextInput
          id="filter-input"
          aria-label={selectedOption.displayName}
          data-cy="tuple-select-input"
          value={input}
          type="search"
          onChange={(e) => handleOnChange(e.target.value)}
          placeholder={selectedOption.placeHolderText}
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) =>
            e.key === "Enter" && handleOnSubmit()
          }
          icon={
            isValid ? (
              <IconButton
                onClick={handleOnSubmit}
                aria-label="Select plus button"
              >
                <Icon glyph="Plus" data-cy="tuple-select-button" />
              </IconButton>
            ) : (
              <IconTooltip
                glyph="Warning"
                data-cy="tuple-select-warning"
                fill={yellow.base}
              >
                {validatorErrorMessage}
              </IconTooltip>
            )
          }
        />
      </InputGroup>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-top: ${size.xxs};
`;

const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

// @ts-expect-error
const GroupedSelect = styled(Select)`
  width: 30%;
  /* overwrite lg borders https://jira.mongodb.org/browse/PD-1995 */
  button {
    margin-top: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: 0;
  }
`;

const GroupedTextInput = styled(TextInput)`
  /* overwrite lg borders https://jira.mongodb.org/browse/PD-1995 */
  div input {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }
`;

export default TupleSelect;
