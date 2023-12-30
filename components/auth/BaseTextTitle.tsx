import { TextProps, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
interface TitleProps {
  fontSize?: number;
  color?: string;
}
export type BaseTextTitleProps = TextProps & TitleProps & { onPress?: () => any };
const defaultProps: BaseTextTitleProps = {
  fontSize: 14
};
function BaseTextTitle(props: BaseTextTitleProps) {
  const { onPress } = props;
  return (
    <TouchableOpacity style={props.style} activeOpacity={0.6} onPress={onPress ?? (() => {})}>
      <Title onPress={props.onPress} fontSize={props.fontSize} color={props.color}>
        {props.children}
      </Title>
    </TouchableOpacity>
  );
}
BaseTextTitle.defaultProps = defaultProps;
const Title = styled.Text<BaseTextTitleProps>`
  font-weight: bold;
  font-size: ${props => props.fontSize}px;
  text-align: center;
  ${props => (props.color ? `color: ${props.color}` : '')};
`;
export default BaseTextTitle;
