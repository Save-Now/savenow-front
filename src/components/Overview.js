import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  gap: 32px;
  padding: 20px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Section = styled.div`
  flex: 1;
`;

const Label = styled.div`
  color: #666;
  font-size: 14px;
  margin-bottom: 4px;
`;

const Value = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;
`;

const Category = styled.span`
  font-size: 28px;
  font-weight: 700;
  color: #000;
`;

const Amount = styled.span`
  font-size: 28px;
  font-weight: 700;
  color: #000;
`;

const Currency = styled.span`
  font-size: 20px;
  font-weight: 400;
  color: #000;
`;

const Overview = ({ data }) => {
  const { mostUsedCategory, monthlyIncome, monthlyExpense } = data;

  return (
    <Container>
      {/* 가장 많이 사용된 카테고리 */}
      <Section>
        <Label>가장 많이 사용된 카테고리</Label>
        <Value>
          <Category>{mostUsedCategory}</Category>
        </Value>
      </Section>

      {/* 이번달 수입 */}
      <Section>
        <Label>이번달 수입</Label>
        <Value>
          <Amount>{Number(monthlyIncome).toLocaleString()}</Amount>
          <Currency>원</Currency>
        </Value>
      </Section>

      {/* 이번달 지출 */}
      <Section>
        <Label>이번달 지출</Label>
        <Value>
          <Amount>{Number(monthlyExpense).toLocaleString()}</Amount>
          <Currency>원</Currency>
        </Value>
      </Section>
    </Container>
  );
};

export default Overview;
