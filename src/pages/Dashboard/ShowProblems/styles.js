import styled from 'styled-components/native';

export const TitleContainer = styled.View`
  align-items: center;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

export const ListProblems = styled.FlatList`
  margin-top: 16px;
`;

export const ProblemContainer = styled.View`
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #ccc;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 20px;
  margin-bottom: 16px;
`;

export const Message = styled.Text`
  color: #999;
  font-size: 16px;
`;

export const Date = styled.Text`
  color: #c1c1c1;
  font-size: 12px;
`;
