import { useAtom } from 'jotai';
import React from 'react';
import { categoryStrAtom } from 'stores/map';
import styled from 'styled-components';

const categories = ['압구정', '선정릉', '강남', '철산'];

function Category() {
  const [selectedCategory, setSelectedCategory] = useAtom(categoryStrAtom);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <CategWrapper>
      {categories.map((category, index) => (
        <CategBox key={index} onClick={() => handleCategoryClick(category)}>
          {category}
        </CategBox>
      ))}
    </CategWrapper>
  );
}

export const CategWrapper = styled.div`
  border: 1px solid black;
  height: 3rem;
  margin-top: 2rem;
  cursor: pointer;
  display: flex;
`;

export const CategBox = styled.div`
  border: 1px solid red;
  width: 5rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover{
    background-color: blue;
  }
`;

export default Category;