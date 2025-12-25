import {Model,Optional,DataTypes,Sequelize} from "sequelize"
import { PrimaryKey, Unique } from "sequelize-typescript";
import { User } from "./user";
import { Scheme } from "./schemes";


interface reviewAttributes {
  id:string,
  user_id:string,
  scheme_id:string,
  ratings:number,
  comments?:string
  createdAt?:Date,
  updatedAt?:Date
}

interface reviewCreationAttributes extends Optional<reviewAttributes,"id">{}

export class Review extends Model<reviewAttributes,reviewCreationAttributes> implements reviewAttributes{
  declare id:string;
  declare user_id: string;
  declare scheme_id: string;
  declare ratings: number;
  declare comments?: string;
  declare readonly createdAt:Date;
  declare readonly updatedAt:Date;
  declare readonly user?:User;
  declare readonly scheme?:Scheme;

  public static associate(){
    Review.belongsTo(User,{foreignKey:"user_id",as:"user"})
    Review.belongsTo(Scheme,{foreignKey:"scheme_id",as:"scheme"})
  }

}
export const ReviewFactory =(sequelize:Sequelize)=>{
  return Review.init({
      id:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey:true,
      allowNull:false
     },
     user_id:{
       type:DataTypes.UUID,
       allowNull:false
     },
     scheme_id:{
       type:DataTypes.UUID,
       allowNull:false
     },
     ratings:{
       type:DataTypes.INTEGER,
       allowNull:false,
       validate:{min:1,max:2}
     },
     comments:{
       type:DataTypes.TEXT
     },
    },
    {
      sequelize,
      tableName:"reviews",
      indexes:[
        {
        unique:true,
        fields:["user_id","scheme_id"],
        }
      ]
    }
  )
}