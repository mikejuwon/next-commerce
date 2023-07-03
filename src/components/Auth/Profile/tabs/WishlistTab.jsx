import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import apiRequest from "../../../../../utils/apiRequest";
import auth from "../../../../../utils/auth";
import settings from "../../../../../utils/settings";
import { fetchWishlist } from "../../../../store/wishlistData";
import languageModel from "../../../../../utils/languageModel";

export default function WishlistTab({ className }) {
  const dispatch = useDispatch();
  const { wishlistData } = useSelector((state) => state.wishlistData);
  const wishlists = wishlistData && wishlistData.wishlists;
  const [langCntnt, setLangCntnt] = useState(null);
  useEffect(() => {
    setLangCntnt(languageModel());
  }, []);
  const clearList = () => {
    if (auth()) {
      apiRequest
        .clearWishlist({
          token: auth().access_token,
        })
        .then(() => {
          toast.success(langCntnt && langCntnt.Clear_wishlist);
          dispatch(fetchWishlist());
        });
    }
    return false;
  };
  const [mainProduct, setMainProducts] = useState(null);
  useEffect(() => {
    if (wishlists) {
      setMainProducts(
        wishlists &&
          wishlists.data.map((item) => {
            return {
              ...item,
              totalPrice: item.product.price,
            };
          })
      );
    } else {
      setMainProducts(null);
    }
  }, [wishlists]);

  const removeToWishlist = (id) => {
    if (auth()) {
      apiRequest.removeToWishlist({ id: id, token: auth().access_token });
      dispatch(fetchWishlist());
    } else {
      return false;
    }
  };
  const { currency_icon } = settings();
  return (
    <>
      <div className={`w-full ${className || ""}`}>
        <div className="relative w-full overflow-x-auto rounded border border-qpurplelow">
          <table className="w-full text-sm text-left text-qgray dark:text-gray-400">
            <tbody>
              {/* table heading */}
              <tr className="text-[13px] font-medium text-qblack bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase">
                <td className="py-4 pl-10 block whitespace-nowrap">
                  {langCntnt && langCntnt.Product}
                </td>

                <td className="py-4 whitespace-nowrap text-center">
                  {langCntnt && langCntnt.Price}
                </td>

                <td className="py-4 whitespace-nowrap text-center block">
                  {langCntnt && langCntnt.Action}
                </td>
              </tr>
              {/*table heading end*/}
              {mainProduct &&
                mainProduct.map((item) => (
                  <tr
                    key={item.id}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="pl-10  py-4  w-[380px] ">
                      <div className="flex space-x-6 items-center">
                        <div className="w-[80px] h-[80px] rounded overflow-hidden flex justify-center items-center border border-qpurplelow relative">
                          <Image
                            layout="fill"
                            src={`${
                              process.env.NEXT_PUBLIC_BASE_URL +
                              item.product.thumb_image
                            }`}
                            alt="product"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1 flex flex-col">
                          <Link
                            href={{
                              pathname: "/single-product",
                              query: { slug: item.product.slug },
                            }}
                          >
                            <p className="font-medium text-[15px] text-qblack hover:text-qpurple cursor-pointer">
                              {item.product.name}
                            </p>
                          </Link>
                        </div>
                      </div>
                    </td>

                    <td className="text-center py-4 px-2">
                      <div className="flex space-x-1 items-center justify-center">
                        <span
                          suppressHydrationWarning
                          className="text-[16px] font-medium text-qblack"
                        >
                          {currency_icon
                            ? currency_icon + item.product.price
                            : item.product.price}
                        </span>
                      </div>
                    </td>
                    <td className="text-right py-4">
                      <div className="flex space-x-1 items-center justify-center">
                        <span
                          className="cursor-pointer text-qgray hover:text-qred"
                          onClick={() => removeToWishlist(item.id)}
                        >
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                            className="fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.7 0.3C9.3 -0.1 8.7 -0.1 8.3 0.3L5 3.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.1 0.7 -0.1 1.3 0.3 1.7L3.6 5L0.3 8.3C-0.1 8.7 -0.1 9.3 0.3 9.7C0.7 10.1 1.3 10.1 1.7 9.7L5 6.4L8.3 9.7C8.7 10.1 9.3 10.1 9.7 9.7C10.1 9.3 10.1 8.7 9.7 8.3L6.4 5L9.7 1.7C10.1 1.3 10.1 0.7 9.7 0.3Z" />
                          </svg>
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {mainProduct && mainProduct.length > 0 && (
        <div className="w-full mt-[30px] flex sm:justify-end justify-start">
          <div className="sm:flex sm:space-x-[30px] items-center">
            <button onClick={clearList} type="button">
              <div className="w-full text-sm font-semibold text-qred mb-5 sm:mb-0">
                {langCntnt && langCntnt.Clean_Wishlist}
              </div>
            </button>
            <Link href="/cart">
              <div className="w-[180px] h-[50px]">
                <div className="green-btn flex justify-center rounded">
                  <span className="w-full text-white text-sm font-semibold text-center">
                    {langCntnt && langCntnt.View_Cards}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
