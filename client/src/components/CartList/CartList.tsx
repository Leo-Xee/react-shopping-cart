import { useQuery } from "react-query";
import { useRouter } from "next/router";

import * as S from "./style";
import cartService from "@/services/cartService";
import CartItem from "./CartItem";
import Checkbox from "../common/Checkbox/Checkbox";
import Spinner from "../common/Spinner";
import ErrorBanner from "../common/ErrorBanner";
import useCalcCartList from "@/hooks/useCalcCartList";
import useCartListMutation from "@/hooks/apis/cart/useCartListMutation";
import Indicator from "../Indicator";
import Button from "../common/Button";
import Title from "../common/Title/Title";

function CartList() {
  const router = useRouter();
  const { isLoading, isError, data } = useQuery("/carts", cartService.getCarts);
  const { updateSelectedAll, deleteSelectedCarts } = useCartListMutation();

  const { totalPrice, totalCount, isEmpty, isSelectedAll, selectedCartIdList } = useCalcCartList(
    data ?? [],
  );

  return (
    <>
      <Title title="장바구니" />
      {isLoading ? (
        <Spinner message="로딩 중..." />
      ) : isError ? (
        <ErrorBanner />
      ) : (
        <S.Container>
          <S.ListContainer>
            <S.CheckController>
              <Checkbox
                id="select"
                onChange={() => updateSelectedAll(isSelectedAll)}
                checked={isSelectedAll}
                disabled={isEmpty}
                label={isSelectedAll ? "전체 해제" : "전체 선택"}
              />
              <Button
                buttonName="상품 삭제"
                colorType="default"
                size="default"
                onClick={() => deleteSelectedCarts(selectedCartIdList)}
                disabled={totalCount === 0}
              />
            </S.CheckController>
            <S.ListHeader>든든배송 상품 ({data?.length}개)</S.ListHeader>
            <ul>
              {data && data.map((cartItem) => <CartItem key={cartItem.id} cartItem={cartItem} />)}
            </ul>
          </S.ListContainer>
          <S.IndicatorWrapper>
            <Indicator
              title="결제예상금액"
              itemName="총 결제예상금액"
              itemPrice={totalPrice}
              buttonName={`주문하기(${totalCount}개)`}
              onClick={() => router.push("/order")}
            />
          </S.IndicatorWrapper>
        </S.Container>
      )}
    </>
  );
}

export default CartList;
