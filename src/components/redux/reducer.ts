import { Action } from "./Action";
import { ActionType } from "./ActionType";
import { AppState } from "./AppState";

const initialState = new AppState(); // מצב התחלתי

export default function reducer(
    oldAppState: AppState = initialState, // הוספת ערך ברירת מחדל
    action: Action
): AppState {
    const newAppState = { ...oldAppState };

    switch (action.type) {

        case ActionType.updateUserLogin:
            if (action.payload.userType) {
                newAppState.userLogin.userType = action.payload.userType;
            }
            if (action.payload.companyId) {
                newAppState.userLogin.companyId = action.payload.companyId;
            }
            if (action.payload.userId) {
                newAppState.userLogin.userId = action.payload.userId;
            }
            if (action.payload.token) {
                newAppState.userLogin.token = action.payload.token;
            }
            break;

        case ActionType.Logout:
            return new AppState();
            break;


        case ActionType.UpdateCuponsView:
            newAppState.coupons = action.payload;
            break;

        case ActionType.UpdateAllUsers:
            newAppState.users = action.payload;
            break;

        case ActionType.DeleteUser:
            // מסנן את המשתמש שנמחק מהרשימה
            return {
                ...oldAppState,
                users: oldAppState.users.filter(user => user.id !== action.payload),
            };

        case ActionType.UpdateAllPurchase:
            newAppState.purchases = action.payload;
            break;

        case ActionType.DeletePurchase:
            return {
                ...oldAppState,
                purchases: oldAppState.purchases.filter(purchase => purchase.id !== action.payload),
            };


        case ActionType.CreateCoupon:
            newAppState.coupons = [...oldAppState.coupons, action.payload];
            break;

        case ActionType.GetCoupon:
            newAppState.coupons = action.payload;
            break;

        case ActionType.GetCoupons:
            newAppState.coupons = action.payload;
            break;

        case ActionType.UpdateCoupon:
            newAppState.coupons = oldAppState.coupons.map((coupon) =>
                coupon.id === action.payload.id
                    ? { ...coupon, ...action.payload }
                    : coupon
            );
            break;

        case ActionType.DeleteCoupon:
            newAppState.coupons = oldAppState.coupons.filter(
                (coupon) => coupon.id !== action.payload.id
            );
            break;

        case ActionType.CreatePurchase:
            newAppState.purchases = [...oldAppState.purchases, action.payload];
            break;

        case ActionType.GetPurchase:
            newAppState.purchases = action.payload;
            break;

        case ActionType.DeletePurchase:
            newAppState.purchases = oldAppState.purchases.filter(
                (purchase) => purchase.id !== action.payload.id
            );
            break;

        case ActionType.GetPurchases:
            newAppState.purchases = action.payload;
            break;

        case ActionType.GetCategories:
            newAppState.categories = action.payload;
            break;


    }

    return newAppState;
}
