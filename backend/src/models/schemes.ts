import { DataTypes,Model,Optional,Sequelize } from "sequelize";
import { Review } from "./review";

interface SchemeAttributes{
    id?:string,
    title?:string,
    description?:string,
    category?:string,
    eligibility?:string,
    community?:Array<string>,
    documents?:Array<string>,
    benefits?:string,
    Apply?:string,
    state?:string,
    createdBy?:string,
    updatedBy?:string,
}

interface SchemeCreationAttributes extends Optional<SchemeAttributes,"id">{}

export class Scheme extends Model<SchemeAttributes, SchemeCreationAttributes> implements SchemeAttributes{
    declare id:string;
    declare title:string;
    declare description:string;
    declare category:string;
    declare eligibility:string;
    declare community?: Array<string>;
    declare documents?:Array<string>;
    declare benefits?:string;
    declare Apply?:string;
    declare state:string;
    declare createdBy?:string;
    declare updatedBy?:string;
    //timestamps
    declare readonly createdAt:Date;
    declare readonly updatedAt:Date;
    declare readonly Reviews:Review[]

    public static associate(){
        Scheme.hasMany(Review,{foreignKey:"scheme_id",as:"Reviews"})
    }

}
export const SchemeFactory=(sequelize:Sequelize)=>{
    return Scheme.init(
        {
        id:{
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            primaryKey:true,
            allowNull:false
        },
        title:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        description:{
            type:DataTypes.STRING,
            allowNull:false
        },
        category:{
            type:DataTypes.STRING,
            allowNull:false
        },
        eligibility:{
            type:DataTypes.STRING,
            allowNull:false
        
        },
        community:{
            type:DataTypes.ARRAY(DataTypes.STRING),
            allowNull:false,
        },
        documents:{
            type:DataTypes.ARRAY(DataTypes.STRING),
            allowNull:false
        },
        benefits:{
            type:DataTypes.STRING,
            allowNull:false
        },
        Apply:{
            type:DataTypes.STRING,
            allowNull:false
        },
        state:{
            type:DataTypes.STRING,
            allowNull:false
        },
        updatedBy:{
            type:DataTypes.UUID,
            unique:false,
            allowNull:true
        },
        createdBy:{
            type:DataTypes.UUID,
            unique:false,
            allowNull:true
        
        }
    },{
        tableName:"schemes",
        sequelize,
        timestamps:true
    })
}