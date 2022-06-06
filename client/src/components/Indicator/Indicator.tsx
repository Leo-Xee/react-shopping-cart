import { MouseEventHandler } from "react";
import { filterPrice } from "@/shared/utils/filter";

import Button from "../common/Button";
import * as S from "./style";

type IndicatorProps = {
  title: string;
  itemName: string;
  itemPrice: number;
  buttonName: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

function Indicator({ title, itemName, itemPrice, buttonName, onClick }: IndicatorProps) {
  return (
    <S.Container>
      <S.ResultTitle>{title}</S.ResultTitle>
      <S.ResultContainer>
        <S.ResultInfo>
          <span>{itemName}</span>
          <span>{filterPrice(itemPrice)}원</span>
        </S.ResultInfo>
        <Button
          buttonName={buttonName}
          onClick={onClick}
          colorType="primary"
          size="full"
          disabled={Number(itemPrice) === 0}
        />
      </S.ResultContainer>
    </S.Container>
  );
}

export default Indicator;
