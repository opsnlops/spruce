import { CSSProperties } from "react";
import styled from "@emotion/styled";
import { palette } from "@leafygreen-ui/palette";
import { Body } from "@leafygreen-ui/typography";
import { size } from "constants/tokens";
import { useDateFormat } from "hooks";

const { gray } = palette;
interface DateSeparatorProps {
  style: CSSProperties;
  date: Date;
}

export const DateSeparator: React.VFC<DateSeparatorProps> = ({
  style,
  date,
}) => {
  const getDateCopy = useDateFormat();
  return (
    <Container style={style}>
      <DateWrapper>{getDateCopy(date, { dateOnly: true })}</DateWrapper>
      <Line />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding-right: ${size.l};
  display: flex;
  align-items: center;
`;

const DateWrapper = styled(Body)`
  white-space: nowrap;
  padding-right: ${size.m};
  text-transform: uppercase;
  color: ${gray.dark2};
`;

const Line = styled.div`
  margin-top: 2px;
  height: 1px;
  background: linear-gradient(to right, transparent 50%, white 50%),
    linear-gradient(to right, ${gray.light1}, ${gray.light1});
  background-size: ${size.s} 2px, 100% 2px;
  width: 100%;
`;
