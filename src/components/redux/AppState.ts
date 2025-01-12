import { ICoupon } from "../models/ICoupon";
import { IPurchase } from "../models/IPurchase";
import { ICategory } from "../models/ICategory";
import { IUserLgin } from "../models/IUserLogin";
import { IUser } from "../models/IUser";

export class AppState {
    public coupons: ICoupon[] = [];
    public purchases: IPurchase[] = [];
    public categories: ICategory[] = [];
    public users:IUser[] = [];
    public userLogin:IUserLgin ={
        userId: 0,
        companyId: 0,
        userType: "",
        token: ""
    };
}
